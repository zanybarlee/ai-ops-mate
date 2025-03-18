
import { 
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export interface AnomalyDataPoint {
  timestamp: string;
  value: number;
  predicted: number;
  threshold: number;
}

interface AnomalyChartProps {
  data: AnomalyDataPoint[];
  height?: string | number;
  title?: string;
}

const AnomalyChart = ({ data, height = "80%", title }: AnomalyChartProps) => {
  return (
    <div className="h-full">
      {title && <h3 className="text-sm font-medium mb-2">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <ChartContainer
          config={{
            actual: { color: "hsl(var(--primary))" },
            normal: { color: "hsl(var(--muted-foreground))" },
            threshold: { color: "hsl(var(--destructive))" },
          }}
        >
          <LineChart
            data={data.slice(0, 12).reverse()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              }}
            />
            <YAxis />
            <ChartTooltip 
              content={
                <ChartTooltipContent 
                  labelFormatter={(value) => {
                    const date = new Date(value as string);
                    return date.toLocaleString();
                  }}
                />
              }
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              activeDot={{ r: 8 }}
              name="Actual"
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="hsl(var(--muted-foreground))" 
              strokeDasharray="3 3" 
              name="Normal Range"
            />
            <Line 
              type="monotone" 
              dataKey="threshold" 
              stroke="hsl(var(--destructive))" 
              name="Threshold"
            />
          </LineChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  );
};

export default AnomalyChart;
