
import { useState } from 'react';
import { MetricsCards } from './MetricsCards';
import { PerformanceCharts } from './PerformanceCharts';
import { IncidentTypeChart } from './IncidentTypeChart';
import { IncidentList } from './IncidentList';

const IncidentDashboard = () => {
  const [timeRange, setTimeRange] = useState('day');

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium">Operations Dashboard</h2>
          <p className="text-muted-foreground">Real-time monitoring and incident management</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">Export</Button>
          <Button size="sm">Refresh Data</Button>
        </div>
      </div>
      
      <MetricsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PerformanceCharts timeRange={timeRange} setTimeRange={setTimeRange} />
        <IncidentTypeChart />
      </div>
      
      <div className="mt-6">
        <IncidentList />
      </div>
    </div>
  );
};

export default IncidentDashboard;

import { Button } from '@/components/ui/button';
