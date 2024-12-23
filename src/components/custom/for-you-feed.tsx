'use client';

import { PostData } from '@/lib/type';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Post } from '../posts/post';

export const ForYouFeed = () => {
    const query = useQuery<PostData[]>({
        queryKey: ['post-feed', 'for-you'],
        queryFn: async () => {
            const response = await fetch('/api/posts/for-you');

            if (!response.ok) {
                throw new Error(`Reqest failed with status code ${response.status}`);
            }

            return response.json();
        },
    });

    if (query.status === 'pending') return <Loader2 className="mx-auto animate-spin" />;

    if (query.status === 'error')
        return (
            <p className="text-center text-destructive">
                An error occured while loading the post
            </p>
        );

    return (
        <>
            {query.data.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </>
    );
};
