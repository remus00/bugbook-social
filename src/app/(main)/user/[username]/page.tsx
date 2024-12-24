import { TrendsSidebar } from '@/components/custom/trends-sidebar';
import { UserPostsFeed } from '@/components/custom/user-posts-feed';
import { UserProfile } from '@/components/custom/user-profile';
import { validateRequest } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getUserDataSelect } from '@/lib/type';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface Props {
    params: { username: string };
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
    const user = await prisma.user.findFirst({
        where: { username: { equals: username, mode: 'insensitive' } },
        select: getUserDataSelect(loggedInUserId),
    });

    if (!user) notFound();

    return user;
});

export async function generateMetadata({
    params: { username },
}: Props): Promise<Metadata> {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) return {};

    const user = await getUser(username, loggedInUser.id);

    return { title: `${user.displayName} (@${user.username})` };
}

const SingleUserPage = async ({ params: { username } }: Props) => {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser)
        return (
            <p className="text-center text-destructive">
                You&apos;re not authorized to view this page
            </p>
        );

    const user = await getUser(username, loggedInUser.id);

    return (
        <div className="flex w-full min-w-0 gap-5">
            <div className="min-h-0 w-full space-y-5">
                <UserProfile user={user} loggedInUserId={loggedInUser.id} />
                <div className="rounded-2xl bg-card p-5 shadow-sm">
                    <h2 className="text-center text-2xl font-bold">
                        {user.displayName}&apos;s posts
                    </h2>
                </div>
                <UserPostsFeed userId={user.id} />
            </div>
            <TrendsSidebar />
        </div>
    );
};

export default SingleUserPage;
