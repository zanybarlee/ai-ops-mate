
import { DcimOverview, ResourceAllocationMap, AutomatedActions } from './index';

const AiPoweredDcim = () => {
  return (
    <div className="space-y-6">
      <DcimOverview />
      
      <div className="grid grid-cols-1 gap-6">
        <ResourceAllocationMap />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <AutomatedActions />
      </div>
    </div>
  );
};

export default AiPoweredDcim;
