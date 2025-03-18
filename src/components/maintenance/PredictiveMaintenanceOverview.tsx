
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { 
  MetricsCards,
  FailureTimeline,
  AnomalyDetection,
  SensorNetwork
} from './predictive';

const PredictiveMaintenanceOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-medium">AI-Driven Predictive Maintenance</h2>
          <p className="text-muted-foreground">IoT-based proactive equipment monitoring and failure prediction</p>
        </div>
        <Button size="sm" variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Sensors
        </Button>
      </div>
      
      <MetricsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FailureTimeline />
        <AnomalyDetection />
      </div>
      
      <SensorNetwork />
    </div>
  );
};

export default PredictiveMaintenanceOverview;
