
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MaintenanceAlert = () => {
  const [showAlert, setShowAlert] = useState(true);
  
  if (!showAlert) return null;
  
  return (
    <Alert className="mb-4 bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400">
      <AlertCircle className="h-4 w-4" />
      <div className="flex justify-between items-start w-full">
        <div>
          <AlertTitle>Predictive Alert</AlertTitle>
          <AlertDescription>
            The cooling system in Rack B3 is showing signs of potential failure. Maintenance is recommended within the next 7 days.
          </AlertDescription>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-yellow-700 dark:text-yellow-400 -mt-1 -mr-2"
          onClick={() => setShowAlert(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  );
};

export default MaintenanceAlert;
