import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { Button, ButtonProps } from '../ui/button';

interface Props extends ButtonProps {
    loading: boolean;
}

export const LoadingButton = ({ loading, disabled, className, ...props }: Props) => {
    return (
        <Button
            disabled={loading || disabled}
            className={cn('flex items-center gap-2', className)}
            {...props}
        >
            {loading && <Loader2 className="size-5 animate-spin" />}
            {props.children}
        </Button>
    );
};
