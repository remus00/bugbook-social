import { TrendsSidebar } from '@/components/custom/trends-sidebar';
import { PostEditor } from '@/components/posts/editor/post-editor';
import { Post } from '@/components/posts/post';
import prisma from '@/lib/prisma';
import { postDataInclude } from '@/lib/type';

export default async function Home() {
    const posts = await prisma.post.findMany({
        include: postDataInclude,
        orderBy: { createdAt: 'desc' },
    });
    return (
        <div className="flex w-full min-w-0 gap-5">
            <div className="w-full min-w-0 space-y-5">
                <PostEditor />
                {posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
            <TrendsSidebar />
        </div>
    );
}
