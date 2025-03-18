
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { fetchPowerUsageData } from '@/utils/maintenance';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const PowerConsumptionChart = () => {
  const powerUsageData = fetchPowerUsageData();
  
  // Prepare data for stacked area chart
  const powerBreakdownData = powerUsageData.map(data => ({
    name: new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    servers: data.serverLoad,
    cooling: data.coolingLoad,
    other: data.otherLoad
  }));
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Power Consumption Breakdown</CardTitle>
          <Button size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              servers: { color: "hsl(var(--primary))" },
              cooling: { color: "hsl(var(--destructive))" },
              other: { color: "hsl(var(--muted))" }
            }}
          >
            <AreaChart data={powerBreakdownData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="servers" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" />
              <Area type="monotone" dataKey="cooling" stackId="1" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" />
              <Area type="monotone" dataKey="other" stackId="1" stroke="hsl(var(--muted))" fill="hsl(var(--muted))" />
            </AreaChart>
          </ChartContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-sm">Servers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <span className="text-sm">Cooling</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted"></div>
            <span className="text-sm">Other</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerConsumptionChart;
