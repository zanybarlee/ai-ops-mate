
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MaintenanceScheduler from '@/components/maintenance/MaintenanceScheduler';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

const MaintenanceScheduling = () => {
  const [activeTab, setActiveTab] = useState('scheduler');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        {!isAuthenticated ? (
          <div className="p-8 text-center">
            <Alert className="max-w-xl mx-auto">
              <Shield className="h-5 w-5 text-primary" />
              <AlertTitle>Authentication Required</AlertTitle>
              <AlertDescription>
                Please sign in to access the maintenance scheduling module.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-3xl font-medium">Maintenance Scheduling</h1>
              <p className="text-muted-foreground mt-2">
                Generate and manage weekly maintenance rosters aligned with personnel availability and equipment needs
              </p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="mb-2">
                <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
                <TabsTrigger value="personnel">Personnel</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="scheduler" className="animate-fade-in">
                <MaintenanceScheduler />
              </TabsContent>
              
              <TabsContent value="personnel" className="animate-fade-in">
                <div className="glass-card p-6 rounded-lg">
                  <h2 className="text-xl font-medium mb-4">Personnel Management</h2>
                  <p className="text-muted-foreground">
                    Manage personnel availability and skills for maintenance scheduling.
                    This section will be implemented in the next phase.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="equipment" className="animate-fade-in">
                <div className="glass-card p-6 rounded-lg">
                  <h2 className="text-xl font-medium mb-4">Equipment Management</h2>
                  <p className="text-muted-foreground">
                    Configure equipment maintenance cycles and requirements.
                    This section will be implemented in the next phase.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="animate-fade-in">
                <div className="glass-card p-6 rounded-lg">
                  <h2 className="text-xl font-medium mb-4">Maintenance History</h2>
                  <p className="text-muted-foreground">
                    View past maintenance schedules and completion status.
                    This section will be implemented in the next phase.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MaintenanceScheduling;
