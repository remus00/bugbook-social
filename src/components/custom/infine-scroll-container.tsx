import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

interface Props extends React.PropsWithChildren {
    onBottomReached: () => void;
    className?: string;
}

export const InfiniteScrollContainer = ({
    onBottomReached,
    className,
    children,
}: Props) => {
    const { ref } = useInView({
        rootMargin: '200px',
        onChange(inView) {
            if (inView) {
                onBottomReached();
            }
        },
    });

    return (
        <div className={cn(className)}>
            {children}
            <div ref={ref} />
        </div>
    );
};
