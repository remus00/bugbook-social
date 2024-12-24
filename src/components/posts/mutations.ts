import { useToast } from '@/hooks/use-toast';
import { PostsPage } from '@/lib/type';
import {
    InfiniteData,
    QueryFilters,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { deletePost } from './actions';

export function useDeletePostMutation() {
    const { toast } = useToast();

    const queryClient = useQueryClient();

    const router = useRouter();
    const path = usePathname();

    const mutation = useMutation({
        mutationFn: deletePost,
        onSuccess: async (deletedPost) => {
            const queryFilter = {
                queryKey: ['post-feed'],
            } satisfies QueryFilters;

            await queryClient.cancelQueries(queryFilter);

            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
                queryFilter,
                (oldData) => {
                    if (!oldData) return;

                    return {
                        pageParams: oldData.pageParams,
                        pages: oldData.pages.map((page) => ({
                            nextCursor: page.nextCursor,
                            posts: page.posts.filter(
                                (post) => post.id !== deletedPost.id
                            ),
                        })),
                    };
                }
            );

            toast({
                description: 'Post deleted',
            });

            if (path === `/posts/${deletedPost.id}`) {
                router.push(`/users/${deletedPost.user.username}`);
            }
        },
        onError(error) {
            console.error(error);
            toast({
                variant: 'destructive',
                description: 'Failed to delete post. Please try again.',
            });
        },
    });

    return mutation;
}
