
import { 
  PowerStatusCards, 
  PowerConsumptionChart, 
  PueImprovementChart,
  PowerSourcesList
} from './power';

const PowerManagement = () => {
  return (
    <div className="space-y-6">
      <PowerStatusCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PowerConsumptionChart />
        <PueImprovementChart />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <PowerSourcesList />
      </div>
    </div>
  );
};

export default PowerManagement;
