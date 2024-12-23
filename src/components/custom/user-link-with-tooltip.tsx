'use client';

import kyInstance from '@/lib/ky';
import { UserData } from '@/lib/type';
import { useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import Link from 'next/link';
import { ReactNode } from 'react';
import { UserTooltip } from './user-tooltip';

interface Props {
    children: ReactNode;
    username: string;
}

export const UserLinkWithTooltip = ({ children, username }: Props) => {
    const { data } = useQuery({
        queryKey: ['user-data', username],
        queryFn: () => kyInstance.get(`/api/users/username/${username}`).json<UserData>(),
        retry(failureCount, error) {
            if (error instanceof HTTPError && error.response.status === 404) {
                return false;
            }
            return failureCount < 3;
        },
        staleTime: Infinity,
    });

    if (!data) {
        return (
            <Link href={`/users/${username}`} className="text-primary hover:underline">
                {children}
            </Link>
        );
    }

    return (
        <UserTooltip user={data}>
            <Link href={`/users/${username}`} className="text-primary hover:underline">
                {children}
            </Link>
        </UserTooltip>
    );
};
