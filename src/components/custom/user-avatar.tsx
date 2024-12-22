import placeholder from '@/assets/avatar-placeholder.png';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
    avatarUrl: string | null | undefined;
    size?: number;
    className?: string;
}

export const UserAvatar = ({ avatarUrl, size, className }: Props) => {
    return (
        <Image
            src={avatarUrl ?? placeholder}
            alt="User avatar image"
            width={size ?? 48}
            height={size ?? 48}
            className={cn(
                'aspect-square h-fit flex-none rounded-full bg-secondary object-cover object-center',
                className
            )}
        />
    );
};
