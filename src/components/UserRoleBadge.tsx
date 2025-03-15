
import { cn } from "@/lib/utils";
import { UserRole } from "@/contexts/AuthContext";

interface UserRoleBadgeProps {
  role: UserRole;
  className?: string;
}

const UserRoleBadge = ({ role, className }: UserRoleBadgeProps) => {
  // Different styling based on role
  const styles = {
    admin: "bg-red-100 text-red-800 border-red-200",
    engineer: "bg-purple-100 text-purple-800 border-purple-200",
    support: "bg-blue-100 text-blue-800 border-blue-200",
    viewer: "bg-green-100 text-green-800 border-green-200"
  };

  return (
    <span className={cn(
      "text-xs font-medium px-2 py-1 rounded-full border", 
      styles[role],
      className
    )}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
};

export default UserRoleBadge;
