
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, BarChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight, Activity, Thermometer, Database, Cpu, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for the dashboard
const performanceData = [
  { name: '00:00', value: 65 },
  { name: '02:00', value: 60 },
  { name: '04:00', value: 67 },
  { name: '06:00', value: 70 },
  { name: '08:00', value: 75 },
  { name: '10:00', value: 82 },
  { name: '12:00', value: 85 },
  { name: '14:00', value: 80 },
  { name: '16:00', value: 90 },
  { name: '18:00', value: 87 },
  { name: '20:00', value: 75 },
  { name: '22:00', value: 68 },
];

const temperatureData = [
  { name: '00:00', value: 22 },
  { name: '02:00', value: 21.5 },
  { name: '04:00', value: 21 },
  { name: '06:00', value: 21.2 },
  { name: '08:00', value: 21.8 },
  { name: '10:00', value: 23 },
  { name: '12:00', value: 24.5 },
  { name: '14:00', value: 25 },
  { name: '16:00', value: 24.8 },
  { name: '18:00', value: 24 },
  { name: '20:00', value: 23.5 },
  { name: '22:00', value: 22.8 },
];

const incidentTypes = [
  { name: 'Hardware', value: 42 },
  { name: 'Network', value: 28 },
  { name: 'Power', value: 15 },
  { name: 'Cooling', value: 23 },
  { name: 'Software', value: 34 },
];

const incidents = [
  { 
    id: 'INC-2023-001', 
    title: 'Server Cooling Fan Failure', 
    severity: 'high', 
    status: 'active', 
    time: '28 min ago',
    prediction: 'Potential thermal event in 4 hours' 
  },
  { 
    id: 'INC-2023-002', 
    title: 'Network Switch Degradation', 
    severity: 'medium', 
    status: 'investigating', 
    time: '1 hr 15 min ago',
    prediction: 'Connectivity loss risk: 35%' 
  },
  { 
    id: 'INC-2023-003', 
    title: 'Power Distribution Unit Alert', 
    severity: 'low', 
    status: 'resolved', 
    time: '3 hrs ago',
    prediction: 'No further issues expected' 
  },
  { 
    id: 'INC-2023-004', 
    title: 'Database Performance Degradation', 
    severity: 'medium', 
    status: 'monitoring', 
    time: '2 hrs 45 min ago',
    prediction: 'Expected resolution within 30 minutes' 
  },
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card py-2 px-3 text-sm shadow-lg">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-primary">{`${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">7</div>
                <div className="flex items-center text-xs mt-1">
                  <ArrowUpRight className="mr-1 text-destructive" size={12} />
                  <span className="text-destructive font-medium">+2</span>
                  <span className="text-muted-foreground ml-1">from yesterday</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle size={20} className="text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">12</div>
                <div className="flex items-center text-xs mt-1">
                  <ArrowDownRight className="mr-1 text-green-500" size={12} />
                  <span className="text-green-500 font-medium">95%</span>
                  <span className="text-muted-foreground ml-1">resolution rate</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle size={20} className="text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">98.7%</div>
                <div className="flex items-center text-xs mt-1">
                  <ArrowUpRight className="mr-1 text-green-500" size={12} />
                  <span className="text-green-500 font-medium">+0.3%</span>
                  <span className="text-muted-foreground ml-1">from last week</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity size={20} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>System Performance</CardTitle>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" onClick={() => setTimeRange('day')} className={timeRange === 'day' ? 'text-primary' : ''}>Day</Button>
                <Button variant="ghost" size="sm" onClick={() => setTimeRange('week')} className={timeRange === 'week' ? 'text-primary' : ''}>Week</Button>
                <Button variant="ghost" size="sm" onClick={() => setTimeRange('month')} className={timeRange === 'month' ? 'text-primary' : ''}>Month</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="performance">
              <TabsList className="mb-4">
                <TabsTrigger value="performance">CPU & Memory</TabsTrigger>
                <TabsTrigger value="temperature">Temperature</TabsTrigger>
              </TabsList>
              
              <TabsContent value="performance" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="temperature" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={temperatureData}>
                    <defs>
                      <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorTemp)" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle>Incident Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incidentTypes}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Active Incidents</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors duration-200">
                  <div className="flex items-center">
                    <div 
                      className={cn(
                        "w-2 h-12 rounded-full mr-4",
                        incident.severity === 'high' ? "bg-destructive" :
                        incident.severity === 'medium' ? "bg-amber-500" :
                        "bg-green-500"
                      )}
                    />
                    <div>
                      <div className="flex items-center">
                        <span 
                          className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full mr-2",
                            incident.status === 'active' ? "bg-destructive/10 text-destructive" :
                            incident.status === 'investigating' ? "bg-amber-500/10 text-amber-500" :
                            incident.status === 'monitoring' ? "bg-blue-500/10 text-blue-500" :
                            "bg-green-500/10 text-green-500"
                          )}
                        >
                          {incident.status}
                        </span>
                        <span className="text-xs text-muted-foreground">{incident.time}</span>
                      </div>
                      <h4 className="font-medium mt-1">{incident.title}</h4>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span className="mr-2">ID: {incident.id}</span>
                        {incident.status !== 'resolved' && (
                          <div className="flex items-center text-amber-500">
                            <AlertTriangle size={12} className="mr-1" />
                            {incident.prediction}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="hidden md:flex items-center mr-4">
                      {incident.severity === 'high' && <Thermometer size={16} className="text-destructive mr-2" />}
                      {incident.title.includes('Network') && <Activity size={16} className="text-amber-500 mr-2" />}
                      {incident.title.includes('Database') && <Database size={16} className="text-blue-500 mr-2" />}
                      {incident.title.includes('Power') && <Cpu size={16} className="text-green-500 mr-2" />}
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IncidentDashboard;
