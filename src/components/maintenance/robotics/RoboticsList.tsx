
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings2, Battery, Bluetooth, Wifi, Server } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

// Mock data for robotic units
const roboticUnits = [
  {
    id: 'robot-001',
    name: 'Inspection Drone',
    type: 'aerial',
    status: 'active',
    battery: 78,
    location: 'Server Room 3',
    lastMaintenance: '2023-11-15',
    capabilities: ['thermal imaging', 'visual inspection', 'air quality sensing'],
    connectionStatus: 'connected'
  },
  {
    id: 'robot-002',
    name: 'Cable Management Bot',
    type: 'ground',
    status: 'charging',
    battery: 32,
    location: 'Maintenance Bay',
    lastMaintenance: '2023-12-01',
    capabilities: ['cable routing', 'inventory scanning', 'label printing'],
    connectionStatus: 'connected'
  },
  {
    id: 'robot-003',
    name: 'Cleaning Robot',
    type: 'ground',
    status: 'scheduled',
    battery: 100,
    location: 'Storage Area',
    lastMaintenance: '2024-01-12',
    capabilities: ['dust removal', 'static control', 'floor cleaning'],
    connectionStatus: 'disconnected'
  },
  {
    id: 'robot-004',
    name: 'Hardware Replacement Assistant',
    type: 'stationary',
    status: 'maintenance',
    battery: 45,
    location: 'Repair Workshop',
    lastMaintenance: '2024-01-30',
    capabilities: ['component detection', 'precision handling', 'tool switching'],
    connectionStatus: 'connected'
  },
  {
    id: 'robot-005',
    name: 'HVAC Inspection Robot',
    type: 'aerial',
    status: 'active',
    battery: 62,
    location: 'Cooling Zone B',
    lastMaintenance: '2023-12-18',
    capabilities: ['duct inspection', 'airflow measurement', 'filter assessment'],
    connectionStatus: 'connected'
  }
];

const RoboticsList = () => {
  const [selectedRobot, setSelectedRobot] = useState<typeof roboticUnits[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'charging':
        return <Badge className="bg-blue-500">Charging</Badge>;
      case 'maintenance':
        return <Badge className="bg-amber-500">Maintenance</Badge>;
      case 'scheduled':
        return <Badge variant="outline">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getConnectionIcon = (status: string) => {
    if (status === 'connected') {
      return <Bluetooth className="h-4 w-4 text-blue-500" />;
    }
    return <Bluetooth className="h-4 w-4 text-gray-400" />;
  };

  const showRobotDetails = (robot: typeof roboticUnits[0]) => {
    setSelectedRobot(robot);
    setDetailsOpen(true);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Robotic Units</CardTitle>
          <Button variant="outline" size="sm">
            <Server className="h-4 w-4 mr-2" /> Add Unit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {roboticUnits.map((robot) => (
            <div 
              key={robot.id} 
              className="border rounded-lg p-4 hover:bg-secondary/50 transition-colors cursor-pointer"
              onClick={() => showRobotDetails(robot)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    {robot.type === 'aerial' ? (
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Wifi className="h-5 w-5 text-blue-500" />
                      </div>
                    ) : robot.type === 'ground' ? (
                      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                        <Server className="h-5 w-5 text-green-500" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <Settings2 className="h-5 w-5 text-purple-500" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{robot.name}</h3>
                      {getConnectionIcon(robot.connectionStatus)}
                    </div>
                    <p className="text-sm text-muted-foreground">{robot.location}</p>
                    <div className="flex space-x-2 mt-2">
                      {getStatusBadge(robot.status)}
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Battery className="h-3 w-3 mr-1" />
                        {robot.battery}%
                      </div>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="ghost">Control</Button>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="sm:max-w-[500px]">
            {selectedRobot && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedRobot.name}</DialogTitle>
                  <DialogDescription>
                    {selectedRobot.type.charAt(0).toUpperCase() + selectedRobot.type.slice(1)} robotic unit details
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <div className="mt-1">{getStatusBadge(selectedRobot.status)}</div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Battery</p>
                      <div className="flex items-center mt-1">
                        <Battery className="h-4 w-4 mr-1" />
                        <div className="w-full bg-secondary rounded-full h-2.5 ml-2">
                          <div 
                            className={`h-2.5 rounded-full ${selectedRobot.battery > 70 ? 'bg-green-500' : selectedRobot.battery > 30 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${selectedRobot.battery}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm">{selectedRobot.battery}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm">{selectedRobot.location}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Capabilities</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedRobot.capabilities.map((capability, index) => (
                        <Badge key={index} variant="outline">{capability}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Last Maintenance</p>
                    <p className="text-sm">{new Date(selectedRobot.lastMaintenance).toLocaleDateString()}</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button>
                  <Button>Control Unit</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RoboticsList;
