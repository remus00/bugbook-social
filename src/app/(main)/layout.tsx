import { Menubar } from '@/components/custom/menubar';
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

                <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
                    <Menubar className="sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-2 py-5 shadow-sm sm:block lg:px-5 xl:w-80" />{' '}
                    {children}
                </div>
                <Menubar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden" />
            </div>
        </SessionProvider>
    );
};

export default AppLayout;
