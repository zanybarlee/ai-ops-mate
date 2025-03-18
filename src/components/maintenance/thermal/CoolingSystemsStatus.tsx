
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { fetchCoolingSystems } from '@/utils/maintenance';
import { CoolingSystem } from '@/utils/maintenance/types';

const CoolingSystemsStatus = () => {
  const coolingSystems = fetchCoolingSystems();
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle>Cooling Systems Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {coolingSystems.map((system: CoolingSystem) => (
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
  );
};

export default CoolingSystemsStatus;
