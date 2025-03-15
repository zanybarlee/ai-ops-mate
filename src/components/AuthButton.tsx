
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth, UserData, UserAvatar } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, User } from 'lucide-react';
import UserRoleBadge from './UserRoleBadge';

const AuthButton = () => {
  const { user, isAuthenticated, login, logout, availableUsers } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isAuthenticated ? (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 px-2 h-9"
            >
              <UserAvatar user={user!} />
              <span className="hidden md:inline-block text-sm font-medium">
                {user?.name}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col gap-1">
              <div>{user?.name}</div>
              <div className="text-xs text-muted-foreground">{user?.email}</div>
              <UserRoleBadge role={user!.role} className="mt-1 self-start" />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="flex gap-2">
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Choose a role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableUsers.map((mockUser: UserData) => (
              <DropdownMenuItem
                key={mockUser.id}
                onClick={() => {
                  login(mockUser.id);
                }}
                className="cursor-pointer flex items-center gap-2"
              >
                <UserAvatar user={mockUser} />
                <div className="flex flex-col">
                  <span className="text-sm">{mockUser.name}</span>
                  <UserRoleBadge role={mockUser.role} className="mt-1 self-start" />
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default AuthButton;
