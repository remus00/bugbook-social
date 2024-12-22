'use server';
import { lucia } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { signUpSchema, SignUpValues } from '@/lib/validation';
import { hash } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signUp(credentials: SignUpValues): Promise<{ error: string }> {
    try {
        const { username, email, password } = signUpSchema.parse(credentials);

        const passwordHash = await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        });

        const userId = generateIdFromEntropySize(10);

        const existingUser = await prisma.user.findFirst({
            where: { username: { equals: username, mode: 'insensitive' } },
        });

        if (existingUser) {
            return { error: 'Username is already taken.' };
        }

        const existingEmail = await prisma.user.findFirst({
            where: { email: { equals: email, mode: 'insensitive' } },
        });

        if (existingEmail) {
            return { error: 'Email is already taken.' };
        }

        await prisma.user.create({
            data: {
                id: userId,
                username,
                displayName: username,
                email,
                passwordHash: passwordHash,
            },
        });

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        (await cookies()).set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        return redirect('/');
    } catch (error) {
        if (isRedirectError(error)) throw error;

        console.error(error);
        return { error: 'Something went wrong. Please try again.' };
    }
}
