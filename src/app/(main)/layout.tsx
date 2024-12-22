import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import SessionProvider from '../../providers/session-provider';

const AppLayout = async ({ children }: { children: ReactNode }) => {
    const session = await validateRequest();

    if (!session.user) redirect('/sign-in');

    return <SessionProvider value={session}>{children}</SessionProvider>;
};

export default AppLayout;
