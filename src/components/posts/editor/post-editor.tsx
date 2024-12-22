'use client';
import { useSession } from '@/providers/session-provider';
import { Placeholder } from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { UserAvatar } from '../../custom/user-avatar';
import { Button } from '../../ui/button';
import { submitPost } from './actions';
import './styles.css';

export const PostEditor = () => {
    const { user } = useSession();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: false,
                italic: false,
            }),
            Placeholder.configure({
                placeholder: "What's on your mind?",
            }),
        ],
    });

    const input =
        editor?.getText({
            blockSeparator: '\n',
        }) || '';

    async function handleSubmit() {
        await submitPost(input);
        editor?.commands.clearContent();
    }

    return (
        <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
            <div className="flex gap-5">
                <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
                <div className="w-full">
                    <EditorContent
                        editor={editor}
                        className="max-h-[20rem] w-full overflow-y-scroll rounded-2xl bg-background px-5 py-3"
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <Button
                    onClick={handleSubmit}
                    disabled={!input.trim()}
                    className="min-w-20"
                >
                    Post
                </Button>
            </div>
        </div>
    );
};
