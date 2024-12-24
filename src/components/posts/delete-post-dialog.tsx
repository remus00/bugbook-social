import { PostData } from '@/lib/type';
import { LoadingButton } from '../custom/loading-button';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import { useDeletePostMutation } from './mutations';

interface Props {
    post: PostData;
    open: boolean;
    onClose: () => void;
}

export const DeletePostDialog = ({ post, open, onClose }: Props) => {
    const mutation = useDeletePostMutation();

    const handleOpenChange = (open: boolean) => {
        if (!open || !mutation.isPending) {
            onClose();
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete post?</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this post? This action cannot
                            be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={mutation.isPending}
                        >
                            Cancel
                        </Button>

                        <LoadingButton
                            loading={mutation.isPending}
                            onClick={() =>
                                mutation.mutate(post.id, { onSuccess: onClose })
                            }
                            variant="destructive"
                        >
                            Delete
                        </LoadingButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
