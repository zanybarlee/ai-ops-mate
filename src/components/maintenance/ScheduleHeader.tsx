
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Settings } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import MaintenanceFilters from './MaintenanceFilters';

interface ScheduleHeaderProps {
  weekStart: Date;
}

const ScheduleHeader = ({ weekStart }: ScheduleHeaderProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">
          Week of {format(weekStart, 'MMMM d, yyyy')}
        </h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              toast({
                title: "Settings",
                description: "Maintenance scheduling settings will be implemented in the next phase.",
              });
            }}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      
      {showFilters && <MaintenanceFilters />}
    </>
  );
};

export default ScheduleHeader;
