'use client';

import kyInstance from '@/lib/ky';
import { PostData } from '@/lib/type';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Post } from '../posts/post';

export const ForYouFeed = () => {
    const query = useQuery<PostData[]>({
        queryKey: ['post-feed', 'for-you'],
        queryFn: kyInstance.get('/api/posts/for-you').json<PostData[]>,
    });

    if (query.status === 'pending') return <Loader2 className="mx-auto animate-spin" />;

    if (query.status === 'error')
        return (
            <p className="text-center text-destructive">
                An error occured while loading the post
            </p>
        );

    return (
        <div className="space-y-5">
            {query.data.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};
