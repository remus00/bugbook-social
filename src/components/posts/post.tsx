'use client';
import { PostData } from '@/lib/type';
import { formatRelativeDate } from '@/lib/utils';
import { useSession } from '@/providers/session-provider';
import Link from 'next/link';
import { Linkify } from '../custom/linkify';
import { UserAvatar } from '../custom/user-avatar';
import { UserTooltip } from '../custom/user-tooltip';
import { PostCTAButton } from './post-cta-button';

interface Props {
    post: PostData;
}

export const Post = ({ post }: Props) => {
    const { user } = useSession();

    return (
        <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
            <div className="flex justify-between gap-3">
                <div className="flex flex-wrap gap-3">
                    <UserTooltip user={post.user}>
                        <Link href={`/user/${post.user.username}`}>
                            <UserAvatar avatarUrl={post.user.avatarUrl} />
                        </Link>
                    </UserTooltip>
                    <div className="">
                        <UserTooltip user={post.user}>
                            <Link
                                href={`/user/${post.user.username}`}
                                className="block font-medium hover:underline"
                            >
                                {post.user.displayName}
                            </Link>
                        </UserTooltip>
                        <Link
                            href={`/posts/${post.id}`}
                            className="block text-sm text-muted-foreground hover:underline"
                        >
                            {formatRelativeDate(post.createdAt)}
                        </Link>
                    </div>
                </div>

                {post.user.id === user.id && (
                    <PostCTAButton
                        post={post}
                        className="opacity-0 transition-opacity group-hover/post:opacity-100"
                    />
                )}
            </div>
            <Linkify>
                <div className="whitespace-pre-line break-words">{post.content}</div>
            </Linkify>
        </article>
    );
};
