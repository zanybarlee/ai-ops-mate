
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle, 
  Clock, 
  Calendar, 
  Activity, 
  Zap, 
  ThermometerSun, 
  Gauge,
  Vibrate,
  RefreshCw
} from 'lucide-react';
import { 
  fetchPredictiveMaintenanceAlerts,
  getEquipmentWithSensors,
  getPredictiveMaintenanceMetrics
} from '@/utils/maintenance';
import {
  PredictiveMaintenance,
} from '@/utils/maintenance/types';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const PredictiveMaintenanceOverview = () => {
  const [activeAlert, setActiveAlert] = useState<PredictiveMaintenance | null>(null);
  const predictiveAlerts = fetchPredictiveMaintenanceAlerts();
  const equipmentWithSensors = getEquipmentWithSensors();
  const metrics = getPredictiveMaintenanceMetrics();
  
  // Format alerts for timeline view
  const timelineData = predictiveAlerts
    .filter(alert => ['pending', 'scheduled'].includes(alert.status))
    .sort((a, b) => a.estimatedTimeToFailure - b.estimatedTimeToFailure)
    .map(alert => ({
      name: alert.equipmentName,
      days: alert.estimatedTimeToFailure,
      priority: alert.priority
    }));

  const priorityColors = {
    high: 'hsl(var(--destructive))',
    medium: 'hsl(var(--warning))',
    low: 'hsl(var(--success))'
  };
  
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-medium">AI-Driven Predictive Maintenance</h2>
          <p className="text-muted-foreground">IoT-based proactive equipment monitoring and failure prediction</p>
        </div>
        <Button size="sm" variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Sensors
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-destructive mr-3" />
              <div>
                <div className="text-3xl font-bold">{metrics.pendingAlerts}</div>
                <p className="text-xs text-muted-foreground">
                  {metrics.highPriorityAlerts} high priority
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Time to Failure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-amber-500 mr-3" />
              <div>
                <div className="text-3xl font-bold">{metrics.averageTimeToFailure} days</div>
                <p className="text-xs text-muted-foreground">
                  Average time remaining
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <div className="text-3xl font-bold">{metrics.scheduledMaintenance}</div>
                <p className="text-xs text-muted-foreground">
                  Planned interventions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monitored Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <div className="text-3xl font-bold">{equipmentWithSensors.length}</div>
                <p className="text-xs text-muted-foreground">
                  With {fetchPredictiveMaintenanceAlerts().length} IoT sensors
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      </div>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle>IoT Sensor Network</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2 font-medium">Equipment</th>
                  <th className="pb-2 font-medium">Sensors</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Last Reading</th>
                  <th className="pb-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {equipmentWithSensors.map(equipment => {
                  const alert = predictiveAlerts.find(a => a.equipmentId === equipment.id);
                  return (
                    <tr key={equipment.id} className="hover:bg-muted/50">
                      <td className="py-3">
                        <div className="flex items-center">
                          {getIconForEquipment(equipment.name)}
                          <span className="ml-2">{equipment.name}</span>
                        </div>
                      </td>
                      <td className="py-3">{equipment.sensorCount} sensors</td>
                      <td className="py-3">
                        {alert ? (
                          <Badge 
                            variant="outline" 
                            className={`
                              ${alert.priority === 'high' ? 'bg-destructive/10 text-destructive' : 
                                alert.priority === 'medium' ? 'bg-amber-500/10 text-amber-500' : 
                                'bg-green-500/10 text-green-500'}
                            `}
                          >
                            {alert.status}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">
                            normal
                          </Badge>
                        )}
                      </td>
                      <td className="py-3">
                        {alert ? (
                          <span className="text-sm">{alert.estimatedTimeToFailure} days remaining</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">No issues detected</span>
                        )}
                      </td>
                      <td className="py-3">
                        <Button variant="outline" size="sm">View Details</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveMaintenanceOverview;

