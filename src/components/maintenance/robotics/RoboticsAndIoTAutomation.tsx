
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  RoboticsList,
  RoboticsControlPanel,
  AutomationWorkflows,
  IoTStatusOverview
} from './index';
import {
  Settings2,
  Bluetooth,
  Server,
  BrainCircuit,
  RefreshCw,
  Download
} from 'lucide-react';

const RoboticsAndIoTAutomation = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium">Robotics & IoT Automation</h2>
        <p className="text-muted-foreground">
          Manage autonomous robots and IoT devices for data center maintenance tasks
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 bg-primary/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Server className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Robotic Units</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
          <div className="mt-2">
            <Badge className="bg-green-500">4 Active</Badge>
            <Badge className="ml-2 bg-amber-500">1 Charging</Badge>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 bg-blue-500/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Bluetooth className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">IoT Devices</p>
              <p className="text-2xl font-bold">124</p>
            </div>
          </div>
          <div className="mt-2">
            <Badge className="bg-green-500">118 Online</Badge>
            <Badge className="ml-2 bg-destructive">6 Offline</Badge>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 bg-purple-500/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <BrainCircuit className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Automation Workflows</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>
          <div className="mt-2">
            <Badge className="bg-green-500">3 Active</Badge>
            <Badge className="ml-2 bg-amber-500">1 Paused</Badge>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="robotics">Robotics</TabsTrigger>
              <TabsTrigger value="iot">IoT Network</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
            </TabsList>
            
            <div className="space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Settings2 className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RoboticsList />
              <IoTStatusOverview />
            </div>
            <AutomationWorkflows />
          </TabsContent>
          
          <TabsContent value="robotics" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RoboticsList />
              <RoboticsControlPanel />
            </div>
          </TabsContent>
          
          <TabsContent value="iot" className="mt-6 space-y-6">
            <IoTStatusOverview />
          </TabsContent>
          
          <TabsContent value="automation" className="mt-6 space-y-6">
            <AutomationWorkflows />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoboticsAndIoTAutomation;
