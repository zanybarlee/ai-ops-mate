
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { calculatePueImprovement } from '@/utils/maintenance';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const PueImprovementChart = () => {
  const pueData = calculatePueImprovement();
  
  return (
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
  );
};

export default PueImprovementChart;
