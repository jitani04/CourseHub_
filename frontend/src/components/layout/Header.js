import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Users,
  Search,
  MessageSquare,
  Bell,
  ChevronDown,
  Menu,
  BookOpen,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '../ui/DropdownMenu';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/Avatar';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../ui/Sheet';
import { Separator } from '../ui/Separator';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-10 bg-white transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left Side: we can add more here but enough for now */}
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">CourseHub</h1>
          </Link>
          <nav className="hidden md:flex space-x-1">
            <Button
              variant="ghost"
              className="text-green-600 hover:bg-green-100 transition-colors duration-200"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button
              variant="ghost"
              className="text-green-600 hover:bg-green-100 transition-colors duration-200"
            >
              <Users className="mr-2 h-4 w-4" />
              Groups
            </Button>
          </nav>
        </div>
        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search Forums"
              className="pl-10 w-64 rounded-full bg-gray-100 border-transparent focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex text-green-600 hover:bg-green-100 transition-colors duration-200"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex text-green-600 hover:bg-green-100 transition-colors duration-200"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="p-1 hidden sm:flex items-center space-x-2 text-green-600 hover:bg-green-100 transition-colors duration-200"
              >
                <Avatar className="h-8 w-8 transition-transform duration-200 hover:scale-110">
                  {/* we'll use real data once ethan is done with profile */}
                  {/* <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Elias Woldie"
                  /> */}
                  <AvatarFallback>EW</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Elias Woldie</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-green-600 hover:bg-green-100 transition-colors duration-200"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-white"
            >
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Link to="/dashboard" className="flex items-center space-x-2">
                    <BookOpen className="h-6 w-6 text-green-600" />
                    <span className="text-xl font-bold text-green-800">
                      CourseHub
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex items-center space-x-3 px-4 py-3 rounded-lg bg-green-50">
                <Avatar className="h-10 w-10">
                  {/* <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Elias Woldie"
                  /> */}
                  <AvatarFallback>EW</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Elias Woldie
                  </p>
                  <p className="text-xs text-gray-500">elias@gmail.com</p>
                </div>
              </div>
              <div className="mt-6 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search CourseHub"
                  className="pl-10 w-full rounded-full bg-gray-100 border-transparent focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <nav className="mt-6 flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="justify-start text-green-600 hover:bg-green-100 transition-colors duration-200"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Home
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-green-600 hover:bg-green-100 transition-colors duration-200"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Groups
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-green-600 hover:bg-green-100 transition-colors duration-200"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Messages
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-green-600 hover:bg-green-100 transition-colors duration-200"
                >
                  <Bell className="mr-2 h-5 w-5" />
                  Notifications
                </Button>
              </nav>
              <Separator className="my-4" />
              <nav className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="justify-start text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                >
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Help Center
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-red-600 hover:bg-red-100 transition-colors duration-200"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign Out
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
