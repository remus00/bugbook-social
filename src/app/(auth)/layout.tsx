import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Fragment, ReactNode } from 'react';

const AuthLayout = async ({ children }: { children: ReactNode }) => {
    const { user } = await validateRequest();

    if (user) redirect('/');

    return <Fragment>{children}</Fragment>;
};

export default AuthLayout;
