
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { RefreshCw, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { format, startOfWeek } from 'date-fns';
import { generateMockMaintenanceData } from '@/utils/maintenanceUtils';

interface ScheduleCalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  onRegenerateSchedule: (data: any) => void;
}

const ScheduleCalendar = ({ 
  selectedDate, 
  setSelectedDate, 
  onRegenerateSchedule 
}: ScheduleCalendarProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const regenerateSchedule = () => {
    setIsGenerating(true);
    
    // Simulate API call to generate schedule
    setTimeout(() => {
      const newData = generateMockMaintenanceData(startOfWeek(selectedDate));
      onRegenerateSchedule(newData);
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

  return (
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
  );
};

export default ScheduleCalendar;
