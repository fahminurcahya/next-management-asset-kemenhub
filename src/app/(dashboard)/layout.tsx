import Header from "@/components/header"
import { SessionProvider } from "next-auth/react";

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <SessionProvider>
                <Header />
                <main className='px-3 lg:px-14'>
                    {children}
                </main>
            </SessionProvider>
        </>
    );
}

export default Layout;