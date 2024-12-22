import { cn } from '@/lib/utils';
import { BellIcon, BookmarkIcon, HomeIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface Props {
    className?: string;
}

export const Menubar = ({ className }: Props) => {
    return (
        <div className={cn(className)}>
            <Button
                title="home"
                variant="ghost"
                className="flex items-center justify-start gap-3"
                asChild
            >
                <Link href="/">
                    <HomeIcon />
                    <span className="hidden lg:inline">Home</span>
                </Link>
            </Button>

            <Button
                title="notifications"
                variant="ghost"
                className="flex items-center justify-start gap-3"
                asChild
            >
                <Link href="/notifications">
                    <BellIcon />
                    <span className="hidden lg:inline">Notifications</span>
                </Link>
            </Button>

            <Button
                title="messages"
                variant="ghost"
                className="flex items-center justify-start gap-3"
                asChild
            >
                <Link href="/messages">
                    <MailIcon />
                    <span className="hidden lg:inline">Messages</span>
                </Link>
            </Button>

            <Button
                title="bookmarks"
                variant="ghost"
                className="flex items-center justify-start gap-3"
                asChild
            >
                <Link href="/bookmarks">
                    <BookmarkIcon />
                    <span className="hidden lg:inline">Bookmarks</span>
                </Link>
            </Button>
        </div>
    );
};
