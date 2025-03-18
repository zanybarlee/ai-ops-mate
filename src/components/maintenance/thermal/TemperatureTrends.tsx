
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const TemperatureTrends = () => {
  return (
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
  );
};

export default TemperatureTrends;
