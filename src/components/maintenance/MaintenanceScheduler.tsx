
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Download, 
  RefreshCw, 
  AlertCircle, 
  Calendar as CalendarIcon,
  Filter,
  UserCheck,
  Settings
} from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import MaintenanceAlert from './MaintenanceAlert';
import MaintenanceFilters from './MaintenanceFilters';
import { generateMockMaintenanceData } from '@/utils/maintenanceUtils';

const MaintenanceScheduler = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [maintenanceData, setMaintenanceData] = useState(() => 
    generateMockMaintenanceData(startOfWeek(new Date()))
  );
  const { toast } = useToast();
  
  const regenerateSchedule = () => {
    setIsGenerating(true);
    
    // Simulate API call to generate schedule
    setTimeout(() => {
      setMaintenanceData(generateMockMaintenanceData(startOfWeek(selectedDate)));
      setIsGenerating(false);
      
      toast({
        title: "Schedule Generated",
        description: `Maintenance schedule for week of ${format(startOfWeek(selectedDate), 'MMM d, yyyy')} has been updated.`,
      });
    }, 1500);
  };
  
  const exportSchedule = () => {
    // In a real application, this would generate a CSV or PDF
    toast({
      title: "Schedule Exported",
      description: "The maintenance schedule has been exported and is ready for download.",
    });
  };
  
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-64 glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Select Week</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
            />
            <div className="mt-4 space-y-2">
              <Button 
                className="w-full" 
                onClick={regenerateSchedule}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Generate Schedule
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={exportSchedule}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex-1">
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
          
          <MaintenanceAlert />
          
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
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              <span className="inline-block h-3 w-3 rounded-full bg-primary/20 mr-1"></span>
              Scheduled
              <span className="inline-block h-3 w-3 rounded-full bg-green-500/20 ml-3 mr-1"></span>
              Completed
              <span className="inline-block h-3 w-3 rounded-full bg-yellow-500/20 ml-3 mr-1"></span>
              In Progress
              <span className="inline-block h-3 w-3 rounded-full bg-secondary/10 ml-3 mr-1"></span>
              Unscheduled
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceScheduler;
