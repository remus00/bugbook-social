import { FollowerInfo, UserData } from '@/lib/type';
import { formatNumber } from '@/lib/utils';
import { formatDate } from 'date-fns';
import { Button } from '../ui/button';
import { FollowButton } from './follow-button';
import { FollowersCount } from './followers-count';
import { UserAvatar } from './user-avatar';

interface Props {
    user: UserData;
    loggedInUserId: string;
}

export const UserProfile = ({ user, loggedInUserId }: Props) => {
    const followerInfo: FollowerInfo = {
        followers: user._count.followers,
        isFollowedByUser: user.followers.some(
            ({ followerId }) => followerId === loggedInUserId
        ),
    };

    return (
        <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
            <UserAvatar
                avatarUrl={user.avatarUrl}
                size={250}
                className="mx-auto size-full max-h-60 max-w-60 rounded-full"
            />
            <div className="flex flex-wrap gap-3 sm:flex-nowrap">
                <div className="me-auto space-y-3">
                    <div>
                        <h1 className="text-3xl font-bold">{user.displayName}</h1>
                        <div className="text-muted-foreground">@{user.username}</div>
                    </div>
                    <div>Member since {formatDate(user.createdAt, 'MMM d, yyy')}</div>
                    <div className="flex items-center gap-3">
                        <span>
                            Posts:{' '}
                            <span className="font-semibold">
                                {formatNumber(user._count.posts)}
                            </span>
                        </span>
                        <FollowersCount userId={user.id} initialState={followerInfo} />
                    </div>
                </div>
                {user.id === loggedInUserId ? (
                    <Button>Edit profile</Button>
                ) : (
                    <FollowButton userId={user.id} initialState={followerInfo} />
                )}
            </div>

            {user.bio && (
                <>
                    <hr />
                    <div className="overflow-hidden whitespace-pre-line break-words">
                        {user.bio}
                    </div>
                </>
            )}
        </div>
    );
};
