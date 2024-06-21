import { User } from "lucide-react";
import HeaderLogo from "./header-logo";
import Navigation from "./navigation";
import { Button } from "./ui/button";
import WelcomeMsg from "./welcome-message";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Profile from "./profile";

const Header = () => {

    return (
        <header className='bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36'>
            <div className="max-w-screen-2xl mx-auto">
                <div className='w-full flex items-center justify-between mb-14'>
                    <div className="flex items-center lg:gap-x-6">
                        <HeaderLogo />
                        <Navigation />
                    </div>
                    <Profile />

                </div>
                <WelcomeMsg />
            </div>
        </header >
    );
}

export default Header;