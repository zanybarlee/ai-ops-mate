
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { CustomTooltip, performanceData, temperatureData } from './ChartUtils';

interface PerformanceChartsProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
}

export const PerformanceCharts = ({ timeRange, setTimeRange }: PerformanceChartsProps) => {
  return (
    <Card className="glass-card lg:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>System Performance</CardTitle>
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setTimeRange('day')} 
              className={timeRange === 'day' ? 'text-primary' : ''}
            >
              Day
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setTimeRange('week')} 
              className={timeRange === 'week' ? 'text-primary' : ''}
            >
              Week
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setTimeRange('month')} 
              className={timeRange === 'month' ? 'text-primary' : ''}
            >
              Month
            </Button>
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
  );
};
