'use client';

import { logout } from '@/app/(auth)/sign-out.action';
import { cn } from '@/lib/utils';
import { useSession } from '@/providers/session-provider';
import { LogOutIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { UserAvatar } from './user-avatar';

interface Props {
    className?: string;
}

export const UserButton = ({ className }: Props) => {
    const { user, session } = useSession();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn('flex-none rounded-full', className)}>
                    <UserAvatar avatarUrl={user.avatarUrl} size={40} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Logged in as @{user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/users/${user.username}`}>
                    <DropdownMenuItem className="cursor-pointer">
                        <UserIcon className="mr-2 size-4" />
                        Profile
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={async () => logout()}
                    className="cursor-pointer"
                >
                    <LogOutIcon className="mr-2 size-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
