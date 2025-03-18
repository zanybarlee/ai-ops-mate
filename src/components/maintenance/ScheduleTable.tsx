
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { UserCheck, Settings } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { MaintenanceRow } from '@/utils/maintenanceUtils';

interface ScheduleTableProps {
  weekStart: Date;
  maintenanceData: MaintenanceRow[];
}

const ScheduleTable = ({ weekStart, maintenanceData }: ScheduleTableProps) => {
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="bg-card border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">Equipment / Personnel</TableHead>
            {weekDays.map((day) => (
              <TableHead key={format(day, 'yyyy-MM-dd')}>
                <div className="text-center">
                  <div>{format(day, 'EEE')}</div>
                  <div className="text-xs">{format(day, 'MMM d')}</div>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenanceData.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  {row.type === 'equipment' ? (
                    <span className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center mr-2">
                      <Settings className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className="h-6 w-6 rounded bg-secondary/10 flex items-center justify-center mr-2">
                      <UserCheck className="h-3 w-3" />
                    </span>
                  )}
                  {row.name}
                </div>
              </TableCell>
              {row.schedule.map((slot, idx) => (
                <TableCell key={idx} className="text-center">
                  <div 
                    className={`
                      px-2 py-1 text-xs rounded-md ${
                        slot.status === 'scheduled' 
                        ? 'bg-primary/20 text-primary'
                        : slot.status === 'completed' 
                        ? 'bg-green-500/20 text-green-600'
                        : slot.status === 'in-progress'
                        ? 'bg-yellow-500/20 text-yellow-600'
                        : slot.status === 'unscheduled'
                        ? 'bg-secondary/10 text-muted-foreground'
                        : ''
                      }
                    `}
                  >
                    {slot.label}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScheduleTable;
