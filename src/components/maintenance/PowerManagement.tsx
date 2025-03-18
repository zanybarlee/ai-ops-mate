
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Battery, 
  Zap, 
  AlertTriangle, 
  BarChart3, 
  RefreshCw, 
  Activity,
  Cpu,
  Snowflake,
  Power
} from 'lucide-react';
import { 
  fetchPowerUsageData, 
  fetchUpsSystems, 
  fetchPowerSources,
  calculatePueImprovement
} from '@/utils/maintenance';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  AreaChart,
  Area,
  ResponsiveContainer 
} from 'recharts';

const PowerManagement = () => {
  const powerUsageData = fetchPowerUsageData();
  const upsSystems = fetchUpsSystems();
  const powerSources = fetchPowerSources();
  const pueData = calculatePueImprovement();
  
  const latestPowerData = powerUsageData[0];
  
  // Prepare data for stacked area chart
  const powerBreakdownData = powerUsageData.map(data => ({
    name: new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    servers: data.serverLoad,
    cooling: data.coolingLoad,
    other: data.otherLoad
  }));
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current PUE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-primary mr-3" />
              <div>
                <div className="text-3xl font-bold">{latestPowerData.pue}</div>
                <p className="text-xs text-muted-foreground">
                  Target: 1.2 PUE
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Power</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-amber-500 mr-3" />
              <div>
                <div className="text-3xl font-bold">{Math.round(latestPowerData.totalConsumption)} kWh</div>
                <p className="text-xs text-muted-foreground">
                  {latestPowerData.totalConsumption > 450 ? "5% above" : "3% below"} baseline
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">UPS Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Battery className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <div className="text-3xl font-bold">
                  {upsSystems[0].batteryLevel}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {upsSystems[0].estimatedRuntime} min runtime
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Renewable Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-emerald-500 mr-3" />
              <div>
                <div className="text-3xl font-bold">
                  {Math.round((powerSources.find(s => s.type === 'solar')?.currentOutput || 0) / 
                    latestPowerData.totalConsumption * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  75 kW from solar
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>PUE Improvement</CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {((pueData[0].pue - pueData[pueData.length - 1].pue) / pueData[pueData.length - 1].pue * 100).toFixed(1)}% Better
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{}}
              >
                <LineChart data={pueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleString('default', { month: 'short' });
                    }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    domain={[1, 2]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    name="PUE" 
                    type="monotone" 
                    dataKey="pue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle>Power Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {powerSources.map(source => (
                <div 
                  key={source.id} 
                  className="border rounded-lg p-4 flex flex-col space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{source.name}</h3>
                      <p className="text-xs text-muted-foreground capitalize">{source.type}</p>
                    </div>
                    <Badge 
                      className={
                        source.status === 'active' ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" :
                        source.status === 'standby' ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20" :
                        "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      }
                    >
                      {source.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Output:</span>
                      <span className="text-right font-medium">{source.currentOutput} kW</span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="text-right font-medium">{source.capacity} kW</span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Carbon:</span>
                      <span className="text-right font-medium">{source.carbonIntensity} g/kWh</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Power className="h-4 w-4 mr-2" />
                      {source.status === 'active' ? 'Adjust' : 'Activate'}
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

export default PowerManagement;
