'use client';
import { useFollowerInfo } from '@/hooks/use-follower-info';
import { useToast } from '@/hooks/use-toast';
import kyInstance from '@/lib/ky';
import { FollowerInfo } from '@/lib/type';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';

interface Props {
    userId: string;
    initialState: FollowerInfo;
}

export const FollowButton = ({ userId, initialState }: Props) => {
    const { toast } = useToast();
    const { data } = useFollowerInfo(userId, initialState);

    const queryClient = useQueryClient();
    const queryKey: QueryKey = ['follower-info', userId];

    const { mutate } = useMutation({
        mutationFn: () =>
            data.isFollowedByUser
                ? kyInstance.delete(`/api/users/${userId}/followers`)
                : kyInstance.post(`/api/users/${userId}/followers`),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });

            const prevState = queryClient.getQueryData<FollowerInfo>(queryKey);

            queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
                followers:
                    (prevState?.followers || 0) + (prevState?.isFollowedByUser ? -1 : 1),
                isFollowedByUser: !prevState?.isFollowedByUser,
            }));

            return { prevState };
        },
        onError(error, variables, context) {
            queryClient.setQueryData(queryKey, context?.prevState);
            console.error(error);
            toast({
                variant: 'destructive',
                description: 'Something went wrong. Please try again.',
            });
        },
    });

    return (
        <Button
            variant={data.isFollowedByUser ? 'secondary' : 'default'}
            onClick={() => mutate()}
        >
            {data.isFollowedByUser ? 'Unfollow' : 'Follow'}
        </Button>
    );
};
