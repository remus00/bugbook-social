'use client';
import { useFollowerInfo } from '@/hooks/use-follower-info';
import { FollowerInfo } from '@/lib/type';
import { formatNumber } from '@/lib/utils';

interface Props {
    userId: string;
    initialState: FollowerInfo;
}

export const FollowersCount = ({ userId, initialState }: Props) => {
    const { data } = useFollowerInfo(userId, initialState);

    return (
        <span>
            Followers:{' '}
            <span className="font-semibold">{formatNumber(data.followers)}</span>
        </span>
    );
};
