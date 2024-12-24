'use client';
import { FollowerInfo, UserData } from '@/lib/type';
import { useSession } from '@/providers/session-provider';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { FollowButton } from './follow-button';
import { FollowersCount } from './followers-count';
import { Linkify } from './linkify';
import { UserAvatar } from './user-avatar';

interface Props {
    children: ReactNode;
    user: UserData;
}

export const UserTooltip = ({ children, user }: Props) => {
    const { user: loggedInUser } = useSession();

    const followerState: FollowerInfo = {
        followers: user._count.followers,
        isFollowedByUser: user.followers.some(
            ({ followerId }) => followerId === loggedInUser.id
        ),
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent>
                    <div className="flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:max-w-52">
                        <div className="flex items-center justify-between gap-2">
                            <Link href={`/user/${user.username}`}>
                                <UserAvatar avatarUrl={user.avatarUrl} size={70} />
                            </Link>
                            {loggedInUser.id !== user.id && (
                                <FollowButton
                                    userId={user.id}
                                    initialState={followerState}
                                />
                            )}
                        </div>
                        <div className="">
                            <Link href={`/user/${user.username}`}>
                                <div className="text-lg font-semibold hover:underline">
                                    {user.displayName}
                                </div>
                                <div className="text-muted-foreground">
                                    @{user.username}
                                </div>
                            </Link>
                        </div>
                        {user.bio && (
                            <Linkify>
                                <div className="line-clamp-4 whitespace-pre-line">
                                    {user.bio}
                                </div>
                            </Linkify>
                        )}
                        <FollowersCount userId={user.id} initialState={followerState} />
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
