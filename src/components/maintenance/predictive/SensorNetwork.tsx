
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ThermometerSun, 
  Zap, 
  Gauge,
  Vibrate
} from 'lucide-react';
import { 
  fetchPredictiveMaintenanceAlerts,
  getEquipmentWithSensors
} from '@/utils/maintenance';

const SensorNetwork = () => {
  const equipmentWithSensors = getEquipmentWithSensors();
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
  );
};

export default SensorNetwork;
