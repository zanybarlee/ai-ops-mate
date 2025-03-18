
import { 
  TemperatureCards,
  TemperatureTrends,
  EnergySavingsChart,
  CoolingSystemsStatus
} from './thermal';

const ThermalAnalytics = () => {
  return (
    <div className="space-y-6">
      <TemperatureCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TemperatureTrends />
        <EnergySavingsChart />
      </div>
      
      <CoolingSystemsStatus />
    </div>
  );
};

export default ThermalAnalytics;
