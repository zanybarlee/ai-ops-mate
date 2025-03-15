
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  delay?: number;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  className,
  delay = 0
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card p-6 group hover:translate-y-[-8px] transition-all duration-500 opacity-0 animate-fade-in",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-foreground/70 text-balance">{description}</p>
    </div>
  );
};

export default FeatureCard;
