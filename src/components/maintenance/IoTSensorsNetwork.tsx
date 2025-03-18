
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  fetchIoTSensors,
  fetchSensorReadings,
  getSensorStatusCounts
} from '@/utils/maintenance';
import { IoTSensor, SensorReading } from '@/utils/maintenance/types';
import {
  Activity,
  Battery,
  RefreshCw,
  Search,
  AlertCircle,
  ThermometerSun,
  Zap,
  Vibrate,
  Droplets,
  Wind,
  Gauge
} from 'lucide-react';

const IoTSensorsNetwork = () => {
  const [selectedSensor, setSelectedSensor] = useState<IoTSensor | null>(null);
  const [sensorReadings, setSensorReadings] = useState<SensorReading[]>([]);
  
  const sensors = fetchIoTSensors();
  const statusCounts = getSensorStatusCounts();
  
  const handleSensorSelect = (sensor: IoTSensor) => {
    setSelectedSensor(sensor);
    const readings = fetchSensorReadings(sensor.id);
    setSensorReadings(readings);
  };
  
  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'temperature':
        return <ThermometerSun className="h-4 w-4" />;
      case 'power':
        return <Zap className="h-4 w-4" />;
      case 'vibration':
        return <Vibrate className="h-4 w-4" />;
      case 'humidity':
        return <Droplets className="h-4 w-4" />;
      case 'airflow':
        return <Wind className="h-4 w-4" />;
      case 'pressure':
        return <Gauge className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };
  
  const statusData = [
    { name: 'Normal', value: statusCounts.normal, color: 'hsl(var(--success))' },
    { name: 'Warning', value: statusCounts.warning, color: 'hsl(var(--warning))' },
    { name: 'Critical', value: statusCounts.critical, color: 'hsl(var(--destructive))' }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-medium">IoT Sensor Network</h2>
          <p className="text-muted-foreground">Real-time monitoring and anomaly detection</p>
        </div>
        
        <Button size="sm" variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Sensors
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Sensor Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                    <Activity className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Normal</p>
                    <p className="text-2xl font-bold">{statusCounts.normal}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mr-4">
                    <AlertCircle className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Warning</p>
                    <p className="text-2xl font-bold">{statusCounts.warning}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mr-4">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Critical</p>
                    <p className="text-2xl font-bold">{statusCounts.critical}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 h-[200px] flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} sensors`, 'Count']}
                      contentStyle={{ borderRadius: '4px', border: '1px solid hsl(var(--border))' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {selectedSensor && (
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Sensor Readings: {selectedSensor.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSensor(null)}
                  >
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Current Value</p>
                    <p className="text-xl font-bold">{selectedSensor.lastReading.value} {selectedSensor.lastReading.unit}</p>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Normal Range</p>
                    <p className="text-xl font-bold">
                      {selectedSensor.lastReading.normalRange.min} - {selectedSensor.lastReading.normalRange.max}
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge
                      className={`
                        ${selectedSensor.lastReading.status === 'normal' ? 'bg-green-500/10 text-green-500' : 
                          selectedSensor.lastReading.status === 'warning' ? 'bg-amber-500/10 text-amber-500' : 
                          'bg-destructive/10 text-destructive'}
                      `}
                    >
                      {selectedSensor.lastReading.status}
                    </Badge>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Battery</p>
                    <div className="flex items-center">
                      <Battery className="h-4 w-4 mr-1" />
                      <span className="text-xl font-bold">{selectedSensor.batteryLevel}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={sensorReadings.slice().reverse()}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="timestamp" 
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        }}
                      />
                      <YAxis
                        domain={[
                          Math.floor(selectedSensor.lastReading.normalRange.min * 0.8),
                          Math.ceil(selectedSensor.lastReading.normalRange.max * 1.2)
                        ]}
                      />
                      <Tooltip
                        labelFormatter={(value) => {
                          const date = new Date(value);
                          return date.toLocaleString();
                        }}
                        formatter={(value) => [`${value} ${selectedSensor.lastReading.unit}`, 'Value']}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 8 }}
                      />
                      {/* Draw normal range as semi-transparent rectangle */}
                      <rect
                        x="0%"
                        y={selectedSensor.lastReading.normalRange.min}
                        width="100%"
                        height={selectedSensor.lastReading.normalRange.max - selectedSensor.lastReading.normalRange.min}
                        fill="hsl(var(--primary))"
                        fillOpacity={0.1}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Sensors List</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="warning">Warnings</TabsTrigger>
                  <TabsTrigger value="critical">Critical</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-2">
                  {sensors.map(sensor => (
                    <div
                      key={sensor.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                      onClick={() => handleSensorSelect(sensor)}
                    >
                      <div className="flex items-center">
                        {getSensorIcon(sensor.type)}
                        <div className="ml-3">
                          <p className="text-sm font-medium">{sensor.name}</p>
                          <p className="text-xs text-muted-foreground">{sensor.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge
                          className={`
                            ${sensor.lastReading.status === 'normal' ? 'bg-green-500/10 text-green-500' : 
                              sensor.lastReading.status === 'warning' ? 'bg-amber-500/10 text-amber-500' : 
                              'bg-destructive/10 text-destructive'}
                          `}
                        >
                          {sensor.lastReading.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="warning" className="space-y-2">
                  {sensors.filter(s => s.lastReading.status === 'warning').map(sensor => (
                    <div
                      key={sensor.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                      onClick={() => handleSensorSelect(sensor)}
                    >
                      <div className="flex items-center">
                        {getSensorIcon(sensor.type)}
                        <div className="ml-3">
                          <p className="text-sm font-medium">{sensor.name}</p>
                          <p className="text-xs text-muted-foreground">{sensor.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge
                          className="bg-amber-500/10 text-amber-500"
                        >
                          warning
                        </Badge>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="critical" className="space-y-2">
                  {sensors.filter(s => s.lastReading.status === 'critical').map(sensor => (
                    <div
                      key={sensor.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                      onClick={() => handleSensorSelect(sensor)}
                    >
                      <div className="flex items-center">
                        {getSensorIcon(sensor.type)}
                        <div className="ml-3">
                          <p className="text-sm font-medium">{sensor.name}</p>
                          <p className="text-xs text-muted-foreground">{sensor.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge
                          className="bg-destructive/10 text-destructive"
                        >
                          critical
                        </Badge>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
              
              {sensors.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No sensors found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IoTSensorsNetwork;

