import * as z from 'zod';

const requireString = z.string().trim().min(1, { message: 'Rquired' });

export const signUpSchema = z.object({
    email: requireString.email('Invalid email address'),
    username: requireString.regex(
        /^[a-zA-Z0-9_-]+$/,
        'Only letters, numbers, underscores, and hyphens are allowed'
    ),
    password: requireString.min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
    username: requireString,
    password: requireString,
});

export const createPostSchema = z.object({
    content: requireString,
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
