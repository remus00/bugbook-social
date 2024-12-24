import { FollowingFeed } from '@/components/custom/following-feed';
import { ForYouFeed } from '@/components/custom/for-you-feed';
import { TrendsSidebar } from '@/components/custom/trends-sidebar';
import { PostEditor } from '@/components/posts/editor/post-editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
    return (
        <div className="flex w-full min-w-0 gap-5">
            <div className="w-full min-w-0 space-y-5">
                <PostEditor />
                <Tabs defaultValue="for-you">
                    <TabsList>
                        <TabsTrigger value="for-you">For you</TabsTrigger>
                        <TabsTrigger value="following">Following</TabsTrigger>
                    </TabsList>
                    <TabsContent value="for-you">
                        <ForYouFeed />
                    </TabsContent>
                    <TabsContent value="following">
                        <FollowingFeed />
                    </TabsContent>
                </Tabs>
            </div>
            <TrendsSidebar />
        </div>
    );
}
