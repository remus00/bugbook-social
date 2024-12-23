import { PostData } from '@/lib/type';
import { formatRelativeDate } from '@/lib/utils';
import Link from 'next/link';
import { UserAvatar } from '../custom/user-avatar';

interface Props {
    post: PostData;
}

export const Post = ({ post }: Props) => {
    return (
        <article className="space-y-3 rounded-2xl bg-card p-5 shadow-sm">
            <div className="flex flex-wrap gap-3">
                <Link href={`/user/${post.user.username}`}>
                    <UserAvatar avatarUrl={post.user.avatarUrl} />
                </Link>
                <div className="">
                    <Link
                        href={`/user/${post.user.username}`}
                        className="block font-medium hover:underline"
                    >
                        {post.user.displayName}
                    </Link>
                    <Link
                        href={`/posts/${post.id}`}
                        className="block text-sm text-muted-foreground hover:underline"
                    >
                        {formatRelativeDate(post.createdAt)}
                    </Link>
                </div>
            </div>
            <div className="whitespace-pre-line break-words">{post.content}</div>
        </article>
    );
};
