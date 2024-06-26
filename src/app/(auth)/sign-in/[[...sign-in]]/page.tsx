// "use client"
import Image from "next/image";
import LoginForm from "./login-form";
import { auth } from "@/auth";

const Page = async () => {
    const session = await auth();

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="h-full flex flex-col items-center justify-center px-4">
                <div className="text-center space-y-4 pt-16">
                    <h1 className="font-bold text-3xl text-[#2E2A47]">
                        Welcome Back!
                    </h1>
                    <p className="text-base text-[#7E8CA0]">
                        Log in or Create account to get back to you dashboard!
                    </p>

                </div>
                <div className=" mt-8">
                    {!session
                        ?
                        <LoginForm />
                        : <p>
                            {JSON.stringify(session)}
                        </p>
                    }


                    {/* <ClerkLoaded>
                        <SignIn path="/sign-in" />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="animate-spin text-muted-foreground" />
                    </ClerkLoading> */}
                </div>
            </div>
            <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center px-4">
                <Image src="/logo.svg" height={100} width={100} alt="logo" />
            </div>
        </div>
    );
}

export default Page;