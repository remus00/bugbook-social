'use server';

import { validateRequest } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getPostDataInclude } from '@/lib/type';
import { createPostSchema } from '@/lib/validation';

export async function submitPost(input: string) {
    const { user } = await validateRequest();

    if (!user) throw Error('Unauthorized');

    const { content } = createPostSchema.parse({ content: input });

    const newPost = await prisma.post.create({
        data: {
            content,
            userId: user.id,
        },
        include: getPostDataInclude(user.id),
    });

    return newPost;
}
