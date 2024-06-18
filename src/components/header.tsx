import { User } from "lucide-react";
import HeaderLogo from "./header-logo";
import Navigation from "./navigation";
import { Button } from "./ui/button";
import WelcomeMsg from "./welcome-message";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Header = () => {
    return (
        <header className='bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36'>
            <div className="max-w-screen-2xl mx-auto">
                <div className='w-full flex items-center justify-between mb-14'>
                    <div className="flex items-center lg:gap-x-6">
                        <HeaderLogo />
                        <Navigation />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="sm"
                                variant="outline"
                                className="w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition bg-transparent"

                            >
                                <User />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Button variant="ghost" className="m-0 p-0">
                                    Logout
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
                <WelcomeMsg />
            </div>
        </header >
    );
}

export default Header;