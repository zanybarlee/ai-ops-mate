
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Power } from 'lucide-react';
import { fetchPowerSources } from '@/utils/maintenance';

const PowerSourcesList = () => {
  const powerSources = fetchPowerSources();

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle>Power Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {powerSources.map(source => (
            <div 
              key={source.id} 
              className="border rounded-lg p-4 flex flex-col space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{source.name}</h3>
                  <p className="text-xs text-muted-foreground capitalize">{source.type}</p>
                </div>
                <Badge 
                  className={
                    source.status === 'active' ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" :
                    source.status === 'standby' ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20" :
                    "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                  }
                >
                  {source.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="grid grid-cols-2 text-sm">
                  <span className="text-muted-foreground">Output:</span>
                  <span className="text-right font-medium">{source.currentOutput} kW</span>
                </div>
                <div className="grid grid-cols-2 text-sm">
                  <span className="text-muted-foreground">Capacity:</span>
                  <span className="text-right font-medium">{source.capacity} kW</span>
                </div>
                <div className="grid grid-cols-2 text-sm">
                  <span className="text-muted-foreground">Carbon:</span>
                  <span className="text-right font-medium">{source.carbonIntensity} g/kWh</span>
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Power className="h-4 w-4 mr-2" />
                  {source.status === 'active' ? 'Adjust' : 'Activate'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerSourcesList;
