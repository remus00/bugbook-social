import { clsx, type ClassValue } from 'clsx';
import { formatDate, formatDistanceToNowStrict } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatRelativeDate(from: Date) {
    const currentData = new Date();
    if (currentData.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
        return formatDistanceToNowStrict(from, { addSuffix: true });
    } else {
        if (currentData.getFullYear() === from.getFullYear()) {
            return formatDate(from, 'MMM d');
        } else {
            return formatDate(from, 'MMM d, yyy');
        }
    }
}
