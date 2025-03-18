
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Thermometer, Droplets, Wind, RefreshCw, Zap } from 'lucide-react';
import { fetchTemperatureData, fetchCoolingSystems, calculateEnergySavings } from '@/utils/maintenance';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const ThermalAnalytics = () => {
  const temperatureData = fetchTemperatureData();
  const coolingSystems = fetchCoolingSystems();
  const energySavings = calculateEnergySavings();
  
  // Filter to just cooling-related savings
  const coolingEnergySavings = energySavings.filter(item => 
    item.category === 'Optimized Cooling'
  )[0];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {temperatureData.slice(0, 3).map((data) => (
          <Card key={data.id} className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {data.location}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-orange-500" />
                  <span className="text-2xl font-bold">{data.temperature}°C</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Droplets className="h-4 w-4 mr-1" />
                    <span>{data.humidity}% Humidity</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Wind className="h-4 w-4 mr-1" />
                    <span>{data.airflow}% Airflow</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Last updated: {new Date(data.timestamp).toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Temperature Trends</CardTitle>
              <Button size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{}}
              >
                <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip 
                    content={
                      <ChartTooltipContent />
                    } 
                  />
                  <Line 
                    name="Server Room 1" 
                    data={[
                      { name: '00:00', value: 22.5 },
                      { name: '04:00', value: 22.3 },
                      { name: '08:00', value: 23.1 },
                      { name: '12:00', value: 24.5 },
                      { name: '16:00', value: 24.8 },
                      { name: '20:00', value: 23.5 },
                      { name: 'Now', value: 23.5 }
                    ]}
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    name="Server Room 2" 
                    data={[
                      { name: '00:00', value: 21.5 },
                      { name: '04:00', value: 21.2 },
                      { name: '08:00', value: 21.8 },
                      { name: '12:00', value: 22.9 },
                      { name: '16:00', value: 23.2 },
                      { name: '20:00', value: 22.7 },
                      { name: 'Now', value: 22.3 }
                    ]}
                    dataKey="value" 
                    stroke="hsl(var(--destructive))" 
                    fill="hsl(var(--destructive))"
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Energy Savings Potential</CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {coolingEnergySavings.value}% Reduction
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{}}
              >
                <BarChart data={energySavings}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle>Cooling Systems Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coolingSystems.map(system => (
              <div 
                key={system.id} 
                className="border rounded-lg p-4 flex flex-col space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{system.name}</h3>
                    <p className="text-xs text-muted-foreground">{system.location}</p>
                  </div>
                  <Badge 
                    className={
                      system.status === 'active' ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" :
                      system.status === 'standby' ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20" :
                      system.status === 'maintenance' ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" :
                      "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    }
                  >
                    {system.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-2 text-sm">
                    <span className="text-muted-foreground">Current Load:</span>
                    <span className="text-right font-medium">{system.currentLoad}%</span>
                  </div>
                  <div className="grid grid-cols-2 text-sm">
                    <span className="text-muted-foreground">Energy Usage:</span>
                    <span className="text-right font-medium">{system.energyConsumption} kWh</span>
                  </div>
                  <div className="grid grid-cols-2 text-sm">
                    <span className="text-muted-foreground">Efficiency:</span>
                    <span className="text-right font-medium">{system.efficiency}%</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    Optimize
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThermalAnalytics;
