import { Navbar } from '@/components/custom/navbar';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import SessionProvider from '../../providers/session-provider';

const AppLayout = async ({ children }: { children: ReactNode }) => {
    const session = await validateRequest();

    if (!session.user) redirect('/sign-in');

    return (
        <SessionProvider value={session}>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="mx-auto max-w-7xl p-5">{children}</div>
            </div>
        </SessionProvider>
    );
};

export default AppLayout;
