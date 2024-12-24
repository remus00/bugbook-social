import { PostData } from '@/lib/type';
import { cn } from '@/lib/utils';
import { MoreHorizontalIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { DeletePostDialog } from './delete-post-dialog';

interface Props {
    post: PostData;
    className?: string;
}

export const PostCTAButton = ({ post, className }: Props) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button size="icon" variant="ghost" className={cn(className)}>
                        <MoreHorizontalIcon className="size-5 text-muted-foreground" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="bottom">
                    <DropdownMenuItem
                        onClick={() => setShowDeleteDialog(true)}
                        className="cursor-pointer"
                    >
                        <span className="flex items-center gap-3 text-destructive">
                            <Trash2 className="size-4 text-destructive" />
                            delete
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeletePostDialog
                post={post}
                open={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
            />
        </>
    );
};
