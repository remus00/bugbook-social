import { ForYouFeed } from '@/components/custom/for-you-feed';
import { TrendsSidebar } from '@/components/custom/trends-sidebar';
import { PostEditor } from '@/components/posts/editor/post-editor';

export default function Home() {
    return (
        <div className="flex w-full min-w-0 gap-5">
            <div className="w-full min-w-0 space-y-5">
                <PostEditor />
                <ForYouFeed />
            </div>
            <TrendsSidebar />
        </div>
    );
}
