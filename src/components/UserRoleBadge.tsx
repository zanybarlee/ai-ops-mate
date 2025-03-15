
import { cn } from "@/lib/utils";
import { UserRole, getRoleDisplayName, getRoleIcon } from "@/contexts/AuthContext";

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
    viewer: "bg-green-100 text-green-800 border-green-200",
    technician: "bg-orange-100 text-orange-800 border-orange-200",
    tech_support: "bg-teal-100 text-teal-800 border-teal-200",
    system_admin: "bg-indigo-100 text-indigo-800 border-indigo-200",
    maintenance_manager: "bg-yellow-100 text-yellow-800 border-yellow-200"
  };

  return (
    <span className={cn(
      "text-xs font-medium px-2 py-1 rounded-full border flex items-center gap-1", 
      styles[role],
      className
    )}>
      {getRoleIcon(role)}
      {getRoleDisplayName(role)}
    </span>
  );
};

export default UserRoleBadge;
