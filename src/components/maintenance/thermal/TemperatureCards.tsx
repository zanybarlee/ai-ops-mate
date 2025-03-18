
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Droplets, Wind } from 'lucide-react';
import { fetchTemperatureData } from '@/utils/maintenance';
import { TemperatureData } from '@/utils/maintenance/types';

const TemperatureCards = () => {
  const temperatureData = fetchTemperatureData();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {temperatureData.slice(0, 3).map((data: TemperatureData) => (
        <Card key={data.id} className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {data.location}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-orange-500" />
                <span className="text-2xl font-bold">{data.temperature}°C</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Droplets className="h-4 w-4 mr-1" />
                  <span>{data.humidity}% Humidity</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Wind className="h-4 w-4 mr-1" />
                  <span>{data.airflow}% Airflow</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Last updated: {new Date(data.timestamp).toLocaleTimeString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TemperatureCards;
