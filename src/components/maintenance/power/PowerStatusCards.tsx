
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, Zap, Activity, BarChart3 } from 'lucide-react';
import { fetchPowerUsageData, fetchUpsSystems, fetchPowerSources } from '@/utils/maintenance';

const PowerStatusCards = () => {
  const powerUsageData = fetchPowerUsageData();
  const upsSystems = fetchUpsSystems();
  const powerSources = fetchPowerSources();
  
  const latestPowerData = powerUsageData[0];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Current PUE</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-primary mr-3" />
            <div>
              <div className="text-3xl font-bold">{latestPowerData.pue}</div>
              <p className="text-xs text-muted-foreground">
                Target: 1.2 PUE
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Power</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-amber-500 mr-3" />
            <div>
              <div className="text-3xl font-bold">{Math.round(latestPowerData.totalConsumption)} kWh</div>
              <p className="text-xs text-muted-foreground">
                {latestPowerData.totalConsumption > 450 ? "5% above" : "3% below"} baseline
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">UPS Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Battery className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <div className="text-3xl font-bold">
                {upsSystems[0].batteryLevel}%
              </div>
              <p className="text-xs text-muted-foreground">
                {upsSystems[0].estimatedRuntime} min runtime
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Renewable Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-emerald-500 mr-3" />
            <div>
              <div className="text-3xl font-bold">
                {Math.round((powerSources.find(s => s.type === 'solar')?.currentOutput || 0) / 
                  latestPowerData.totalConsumption * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                75 kW from solar
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PowerStatusCards;
