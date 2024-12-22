import loginImg from '@/assets/login-image.jpg';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SignInForm } from './_components/sign-in-form';

export const metadata: Metadata = {
    title: 'Sign In',
};

const SignInPage = () => {
    return (
        <div className="flex h-screen items-center justify-center p-5">
            <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-xl bg-card shadow-2xl">
                <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
                    <h1 className="text-center text-3xl font-bold">Log in to Bugbook</h1>
                    <div className="space-y-5">
                        <SignInForm />
                        <Link
                            href="/sign-up"
                            className="block text-center hover:underline"
                        >
                            Don&apos; have an account? Sing up here.
                        </Link>
                    </div>
                </div>
                <div className="relative hidden w-1/2 md:block">
                    <Image
                        src={loginImg}
                        alt="Sign Up"
                        fill
                        className="hidden object-cover object-center md:block"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
