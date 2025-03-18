
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  BarChart3,
  RefreshCw,
  Signal,
  Wifi,
  Bluetooth,
  Network,
  Settings2
} from 'lucide-react';

// Mock data for IoT devices status
const iotDevicesStatus = {
  total: 124,
  online: 118,
  offline: 3,
  maintenance: 3,
  byType: {
    temperature: 42,
    humidity: 28,
    power: 24,
    motion: 16,
    proximity: 14
  },
  byConnection: {
    wifi: 76,
    bluetooth: 28,
    zigbee: 15,
    lora: 5
  }
};

// Mock data for connectivity history
const connectivityHistory = [
  { time: '00:00', connected: 120, total: 124 },
  { time: '03:00', connected: 122, total: 124 },
  { time: '06:00', connected: 123, total: 124 },
  { time: '09:00', connected: 118, total: 124 },
  { time: '12:00', connected: 116, total: 124 },
  { time: '15:00', connected: 119, total: 124 },
  { time: '18:00', connected: 121, total: 124 },
  { time: '21:00', connected: 118, total: 124 }
];

// Mock data for device type distribution
const deviceTypeData = [
  { name: 'Temperature', value: iotDevicesStatus.byType.temperature, color: '#0ea5e9' },
  { name: 'Humidity', value: iotDevicesStatus.byType.humidity, color: '#22c55e' },
  { name: 'Power', value: iotDevicesStatus.byType.power, color: '#eab308' },
  { name: 'Motion', value: iotDevicesStatus.byType.motion, color: '#ec4899' },
  { name: 'Proximity', value: iotDevicesStatus.byType.proximity, color: '#8b5cf6' }
];

const IoTStatusOverview = () => {
  const onlinePercentage = Math.round((iotDevicesStatus.online / iotDevicesStatus.total) * 100);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>IoT Network Status</CardTitle>
          <Badge variant="outline">
            <Signal className="h-4 w-4 mr-1" />
            {iotDevicesStatus.online} of {iotDevicesStatus.total} Devices Online
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Network Connectivity</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Devices Online</span>
                    <span className="font-medium">{onlinePercentage}%</span>
                  </div>
                  <Progress value={onlinePercentage} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Online</p>
                      <Badge className="bg-green-500">{iotDevicesStatus.online}</Badge>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Offline</p>
                      <Badge variant="outline" className="text-red-500">{iotDevicesStatus.offline}</Badge>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Maintenance</p>
                      <Badge variant="outline" className="text-amber-500">{iotDevicesStatus.maintenance}</Badge>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <Badge variant="outline">{iotDevicesStatus.total}</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-xs font-medium text-muted-foreground">CONNECTION TYPES</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Wifi className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">WiFi</span>
                      </div>
                      <span className="text-sm">{iotDevicesStatus.byConnection.wifi} devices</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bluetooth className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">Bluetooth</span>
                      </div>
                      <span className="text-sm">{iotDevicesStatus.byConnection.bluetooth} devices</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Network className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-sm">Zigbee</span>
                      </div>
                      <span className="text-sm">{iotDevicesStatus.byConnection.zigbee} devices</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Signal className="h-4 w-4 mr-2 text-purple-500" />
                        <span className="text-sm">LoRa</span>
                      </div>
                      <span className="text-sm">{iotDevicesStatus.byConnection.lora} devices</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">24-Hour Connectivity</h3>
                <RefreshCw className="h-4 w-4 text-muted-foreground cursor-pointer" />
              </div>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={connectivityHistory}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[100, 'dataMax']} />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'connected' ? `${value} devices online` : `${value} total devices`,
                        name === 'connected' ? 'Connected' : 'Total'
                      ]}
                    />
                    <Area 
                      type="monotone"
                      dataKey="total" 
                      stackId="1"
                      stroke="#8884d8" 
                      fill="hsl(var(--muted))" 
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="connected" 
                      stackId="2" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Device Type Distribution</h3>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {deviceTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value} sensors`, 'Count']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-4 mt-2">
                  {deviceTypeData.map((entry) => (
                    <div key={entry.name} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-1" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-xs">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <Badge className="bg-green-500">{iotDevicesStatus.online}</Badge>
                <span className="text-sm text-muted-foreground">active sensors</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <Settings2 className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IoTStatusOverview;
