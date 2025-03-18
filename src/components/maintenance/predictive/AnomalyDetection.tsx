
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ThermometerSun, 
  Zap, 
  Gauge,
  Vibrate,
} from 'lucide-react';
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
  fetchPredictiveMaintenanceAlerts,
  PredictiveMaintenance
} from '@/utils/maintenance';

const AnomalyDetection = () => {
  const [activeAlert, setActiveAlert] = useState<PredictiveMaintenance | null>(null);
  const predictiveAlerts = fetchPredictiveMaintenanceAlerts();
  
  const getIconForEquipment = (name: string) => {
    if (name.toLowerCase().includes('chiller') || name.toLowerCase().includes('crac')) {
      return <ThermometerSun className="h-4 w-4" />;
    } else if (name.toLowerCase().includes('ups') || name.toLowerCase().includes('pdu')) {
      return <Zap className="h-4 w-4" />;
    } else if (name.toLowerCase().includes('generator')) {
      return <Gauge className="h-4 w-4" />;
    } else {
      return <Vibrate className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle>Sensor Anomaly Detection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {activeAlert ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium">{activeAlert.equipmentName}</h3>
                  <p className="text-xs text-muted-foreground">{activeAlert.affectedComponent}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveAlert(null)}
                >
                  Back to List
                </Button>
              </div>
              
              <ResponsiveContainer width="100%" height="80%">
                <LineChart
                  data={activeAlert.sensorData[0]?.dataPoints.slice(0, 12).reverse()}
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
                  <Tooltip 
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleString();
                    }}
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
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <p className="text-sm text-muted-foreground mb-2">Select an alert to view anomaly detection data:</p>
              <div className="overflow-auto flex-1">
                <div className="space-y-2">
                  {predictiveAlerts.map(alert => (
                    <div 
                      key={alert.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors duration-200 cursor-pointer"
                      onClick={() => setActiveAlert(alert)}
                    >
                      <div className="flex items-center">
                        {getIconForEquipment(alert.equipmentName)}
                        <div className="ml-3">
                          <p className="text-sm font-medium">{alert.equipmentName}</p>
                          <p className="text-xs text-muted-foreground">{alert.affectedComponent}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge 
                          variant="outline" 
                          className={`
                            ${alert.priority === 'high' ? 'bg-destructive/10 text-destructive' : 
                              alert.priority === 'medium' ? 'bg-amber-500/10 text-amber-500' : 
                              'bg-green-500/10 text-green-500'}
                          `}
                        >
                          {alert.priority}
                        </Badge>
                        <span className="text-xs ml-2">{alert.estimatedTimeToFailure} days</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnomalyDetection;
