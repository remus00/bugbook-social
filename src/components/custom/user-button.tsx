'use client';

import { logout } from '@/app/(auth)/sign-out.action';
import { cn } from '@/lib/utils';
import { useSession } from '@/providers/session-provider';
import { useQueryClient } from '@tanstack/react-query';
import {
    CheckIcon,
    LogOutIcon,
    Monitor,
    MoonIcon,
    SunIcon,
    UserIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { UserAvatar } from './user-avatar';

interface Props {
    className?: string;
}

export const UserButton = ({ className }: Props) => {
    const { user } = useSession();

    const { theme, setTheme } = useTheme();

    const queryClient = useQueryClient();

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
                <Link href={`/user/${user.username}`}>
                    <DropdownMenuItem className="cursor-pointer">
                        <UserIcon className="mr-2 size-4" />
                        Profile
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Monitor className="mr-2 size-4" />
                        Theme
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="w-[200px]">
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => setTheme('system')}
                            >
                                <Monitor className="mr-2 size-4" />
                                System default{' '}
                                {theme === 'system' && (
                                    <CheckIcon className="ms-auto size-4" />
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => setTheme('light')}
                            >
                                <SunIcon className="mr-2 size-4" />
                                Light{' '}
                                {theme === 'light' && (
                                    <CheckIcon className="ms-auto size-4" />
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => setTheme('dark')}
                            >
                                <MoonIcon className="mr-2 size-4" />
                                Dark{' '}
                                {theme === 'dark' && (
                                    <CheckIcon className="ms-auto size-4" />
                                )}
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={async () => {
                        queryClient.clear();
                        logout();
                    }}
                    className="cursor-pointer"
                >
                    <LogOutIcon className="mr-2 size-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
