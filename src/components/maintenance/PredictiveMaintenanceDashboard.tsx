
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import MaintenanceAlert from './MaintenanceAlert';
import PredictiveMaintenanceOverview from './PredictiveMaintenanceOverview';
import IoTSensorsNetwork from './IoTSensorsNetwork';
import { RoboticsAndIoTAutomation } from './index';
import { BarChart3, ListFilter, Download } from 'lucide-react';

const PredictiveMaintenanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium">AI-Driven Predictive Maintenance</h2>
        <p className="text-muted-foreground">Proactive maintenance alerts based on IoT sensor data</p>
      </div>
      
      <MaintenanceAlert />
      
      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sensors">IoT Sensors</TabsTrigger>
              <TabsTrigger value="robotics">Robotics & Automation</TabsTrigger>
            </TabsList>
            
            <div className="space-x-2">
              <Button variant="outline" size="sm">
                <ListFilter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Reports
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <TabsContent value="overview" className="mt-6">
            <PredictiveMaintenanceOverview />
          </TabsContent>
          
          <TabsContent value="sensors" className="mt-6">
            <IoTSensorsNetwork />
          </TabsContent>
          
          <TabsContent value="robotics" className="mt-6">
            <RoboticsAndIoTAutomation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PredictiveMaintenanceDashboard;
