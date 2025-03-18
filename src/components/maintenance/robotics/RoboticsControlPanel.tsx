
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Bluetooth, 
  Play, 
  Pause, 
  RotateCcw, 
  Home, 
  Target, 
  Upload,
  Settings2,
  Wifi,
  BatteryFull,
  AlertTriangle
} from 'lucide-react';

const RoboticsControlPanel = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [speedLevel, setSpeedLevel] = useState([50]);
  const [batteryLevel] = useState(78);
  const [controlMode, setControlMode] = useState('manual');
  
  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };
  
  const togglePause = () => {
    setIsPaused(!isPaused);
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Control Panel: Inspection Drone</CardTitle>
          <Badge className={isConnected ? "bg-green-500" : "bg-red-500"}>
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Wifi className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">Inspection Drone</h3>
                <p className="text-sm text-muted-foreground">
                  Currently in: Server Room 3
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={toggleConnection}>
                <Bluetooth className="h-4 w-4 mr-2" />
                {isConnected ? "Disconnect" : "Connect"}
              </Button>
              <Button variant={isPaused ? "default" : "destructive"} size="sm" onClick={togglePause}>
                {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
                {isPaused ? "Resume" : "Pause"}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border rounded-md p-3 flex items-center justify-between">
              <div className="text-sm">
                <p className="text-muted-foreground">Battery</p>
                <p className="font-medium">{batteryLevel}%</p>
              </div>
              <BatteryFull className={`h-5 w-5 ${
                batteryLevel > 50 ? "text-green-500" : 
                batteryLevel > 20 ? "text-amber-500" : 
                "text-red-500"
              }`} />
            </div>
            
            <div className="border rounded-md p-3 flex items-center justify-between">
              <div className="text-sm">
                <p className="text-muted-foreground">Signal</p>
                <p className="font-medium">Strong</p>
              </div>
              <Wifi className="h-5 w-5 text-green-500" />
            </div>
            
            <div className="border rounded-md p-3 flex items-center justify-between">
              <div className="text-sm">
                <p className="text-muted-foreground">Status</p>
                <p className="font-medium">{isPaused ? "Paused" : "Active"}</p>
              </div>
              {isPaused ? 
                <Pause className="h-5 w-5 text-amber-500" /> : 
                <Play className="h-5 w-5 text-green-500" />
              }
            </div>
            
            <div className="border rounded-md p-3 flex items-center justify-between">
              <div className="text-sm">
                <p className="text-muted-foreground">Mode</p>
                <p className="font-medium capitalize">{controlMode}</p>
              </div>
              <Settings2 className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          
          <div className="space-y-4">
            <Tabs defaultValue="movement" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="movement">Movement</TabsTrigger>
                <TabsTrigger value="camera">Camera</TabsTrigger>
                <TabsTrigger value="sensors">Sensors</TabsTrigger>
              </TabsList>
              
              <TabsContent value="movement" className="space-y-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <p className="text-sm mb-2">Speed Control</p>
                    <Slider
                      value={speedLevel}
                      onValueChange={setSpeedLevel}
                      max={100}
                      step={1}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Min</span>
                      <span>{speedLevel}%</span>
                      <span>Max</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="h-10">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Rotate Left
                  </Button>
                  <Button variant="outline" size="sm" className="h-10">
                    <Home className="h-4 w-4 mr-2" />
                    Return Home
                  </Button>
                  <Button variant="outline" size="sm" className="h-10">
                    <RotateCcw className="h-4 w-4 mr-2 transform rotate-180" />
                    Rotate Right
                  </Button>
                </div>
                
                <div className="flex justify-center mt-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={controlMode === "auto"}
                      onCheckedChange={() => 
                        setControlMode(controlMode === "auto" ? "manual" : "auto")
                      }
                    />
                    <span>Autonomous Mode</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="camera" className="space-y-4">
                <div className="border rounded-md p-4 text-center h-40 flex items-center justify-center bg-secondary/50">
                  <p className="text-muted-foreground">Camera feed would display here</p>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm">
                    Thermal View
                  </Button>
                  <Button variant="outline" size="sm">
                    Standard View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Target className="h-4 w-4 mr-2" />
                    Zoom
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="sensors" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-3">
                    <p className="text-sm font-medium">Temperature Sensor</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xl">24.5°C</p>
                      <Badge className="bg-green-500/10 text-green-500">Normal</Badge>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <p className="text-sm font-medium">Air Quality Sensor</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xl">Good</p>
                      <Badge className="bg-green-500/10 text-green-500">Normal</Badge>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Sensor Data
                </Button>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Stop
              </Button>
              <Button className="flex-1">Save Path</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoboticsControlPanel;
