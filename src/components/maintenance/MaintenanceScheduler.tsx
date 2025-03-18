
import { useState } from 'react';
import { startOfWeek } from 'date-fns';
import { generateMockMaintenanceData, MaintenanceRow } from '@/utils/maintenance';
import MaintenanceAlert from './MaintenanceAlert';
import ScheduleCalendar from './ScheduleCalendar';
import ScheduleHeader from './ScheduleHeader';
import ScheduleTable from './ScheduleTable';
import ScheduleLegend from './ScheduleLegend';

const MaintenanceScheduler = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceRow[]>(() => 
    generateMockMaintenanceData(startOfWeek(new Date()))
  );
  
  const weekStart = startOfWeek(selectedDate);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <ScheduleCalendar 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onRegenerateSchedule={setMaintenanceData}
        />
        
        <div className="flex-1">
          <ScheduleHeader weekStart={weekStart} />
          
          <MaintenanceAlert />
          
          <ScheduleTable 
            weekStart={weekStart}
            maintenanceData={maintenanceData}
          />
          
          <ScheduleLegend />
        </div>
      </div>
    </div>
  );
};

export default MaintenanceScheduler;
