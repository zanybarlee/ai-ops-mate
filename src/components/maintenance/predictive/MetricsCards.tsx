
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Clock, Calendar, Activity } from 'lucide-react';
import { getPredictiveMaintenanceMetrics, fetchPredictiveMaintenanceAlerts } from '@/utils/maintenance';

const MetricsCards = () => {
  const metrics = getPredictiveMaintenanceMetrics();
  
  return (
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
              <div className="text-3xl font-bold">{metrics.equipmentCount}</div>
              <p className="text-xs text-muted-foreground">
                With {metrics.sensorCount} IoT sensors
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
