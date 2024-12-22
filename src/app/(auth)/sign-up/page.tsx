import signUpImg from '@/assets/signup-image.jpg';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SignUpForm } from './_components/sign-up-form';

export const metadata: Metadata = {
    title: 'Sign Up',
};

const SignUpPage = () => {
    return (
        <div className="flex h-screen items-center justify-center p-5">
            <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-xl bg-card shadow-2xl">
                <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
                    <div className="space-y-1 text-center">
                        <h1 className="text-3xl font-bold">Sing up to Bugbook</h1>
                        <p className="text-muted-foreground">
                            A place where even <i>you</i> can find a friend.
                        </p>
                    </div>
                    <div className="space-y-5">
                        <SignUpForm />
                        <Link
                            href="/sign-in"
                            className="block text-center hover:underline"
                        >
                            Already have an account? Log in here.
                        </Link>
                    </div>
                </div>
                <div className="relative hidden w-1/2 md:block">
                    <Image
                        src={signUpImg}
                        alt="Sign Up"
                        fill
                        className="hidden object-cover object-center md:block"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
