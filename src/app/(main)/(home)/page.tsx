'use client';
import { Button } from '@/components/ui/button';
import { logout } from '../../(auth)/sign-out.action';

export default function Home() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Button onClick={async () => logout()}>Log out</Button>
        </div>
    );
}
