
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { fetchPredictiveMaintenanceAlerts } from '@/utils/maintenance';

const FailureTimeline = () => {
  const predictiveAlerts = fetchPredictiveMaintenanceAlerts();
  
  // Format alerts for timeline view
  const timelineData = predictiveAlerts
    .filter(alert => ['pending', 'scheduled'].includes(alert.status))
    .sort((a, b) => a.estimatedTimeToFailure - b.estimatedTimeToFailure)
    .map(alert => ({
      name: alert.equipmentName,
      days: alert.estimatedTimeToFailure,
      priority: alert.priority
    }));

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle>Predictive Failure Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={timelineData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                label={{ 
                  value: 'Days Until Potential Failure', 
                  position: 'insideBottom', 
                  offset: -5 
                }} 
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={120}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border p-2 rounded-md text-sm shadow-md">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-muted-foreground">{data.days} days remaining</p>
                        <div className="flex items-center mt-1">
                          <span className="mr-2">Priority:</span>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${data.priority === 'high' ? 'bg-destructive/10 text-destructive' : 
                                data.priority === 'medium' ? 'bg-amber-500/10 text-amber-500' : 
                                'bg-green-500/10 text-green-500'}
                            `}
                          >
                            {data.priority}
                          </Badge>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="days" 
                fill="hsl(var(--primary))" 
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FailureTimeline;
