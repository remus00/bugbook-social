'use client';

import kyInstance from '@/lib/ky';
import { PostsPage } from '@/lib/type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Post } from '../posts/post';
import { PostsSkeleton } from '../posts/posts-skeleton';
import { InfiniteScrollContainer } from './infine-scroll-container';

interface Props {
    userId: string;
}

export const UserPostsFeed = ({ userId }: Props) => {
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
        useInfiniteQuery({
            queryKey: ['post-feed', 'user-posts', userId],
            queryFn: ({ pageParam }) =>
                kyInstance
                    .get(
                        `/api/users/${userId}/posts`,
                        pageParam ? { searchParams: { cursor: pageParam } } : {}
                    )
                    .json<PostsPage>(),
            initialPageParam: null as string | null,
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        });

    const posts = data?.pages.flatMap((page) => page.posts) || [];

    if (status === 'pending') return <PostsSkeleton />;

    if (status === 'success' && !posts.length && !hasNextPage) {
        return (
            <p className="text-center text-muted-foreground">
                This user has&apos;t posted anything yet.
            </p>
        );
    }

    if (status === 'error')
        return (
            <p className="text-center text-destructive">
                An error occured while loading the post
            </p>
        );

    return (
        <InfiniteScrollContainer
            className="space-y-5"
            onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        >
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}

            {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
        </InfiniteScrollContainer>
    );
};