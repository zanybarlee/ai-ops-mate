
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThermalPowerDashboard from '@/components/maintenance/ThermalPowerDashboard';
import PredictiveMaintenanceDashboard from '@/components/maintenance/PredictiveMaintenanceDashboard';
import AiPoweredDcim from '@/components/maintenance/dcim/AiPoweredDcim';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EnergyManagement = () => {
  const [activeTab, setActiveTab] = useState('thermal-power');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
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
                Please sign in to access the energy management dashboard.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Energy Management</h1>
              <p className="text-muted-foreground mt-2">AI-powered energy optimization and infrastructure management</p>
            </div>
            
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-8">
              <h2 className="text-lg font-medium text-primary mb-2">Energy Optimization Overview</h2>
              <p>The AI-powered system is continuously analyzing thermal patterns and power usage to optimize energy consumption. Current module status:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Thermal analytics is actively monitoring all cooling systems</li>
                <li>Power load balancing has reduced peak demand by 22%</li>
                <li>Current energy efficiency rating: 35% better than baseline</li>
                <li>5 AI-generated optimizations are awaiting your approval</li>
                <li><span className="text-primary font-medium">NEW:</span> Predictive maintenance has identified 3 potential issues</li>
                <li><span className="text-primary font-medium">NEW:</span> AI-powered DCIM is autonomously optimizing resources</li>
              </ul>
            </div>
            
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="thermal-power">Thermal & Power</TabsTrigger>
                <TabsTrigger value="predictive-maintenance">Predictive Maintenance</TabsTrigger>
                <TabsTrigger value="ai-dcim">AI-Powered DCIM</TabsTrigger>
              </TabsList>
              
              <TabsContent value="thermal-power">
                <ThermalPowerDashboard />
              </TabsContent>
              
              <TabsContent value="predictive-maintenance">
                <PredictiveMaintenanceDashboard />
              </TabsContent>
              
              <TabsContent value="ai-dcim">
                <AiPoweredDcim />
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default EnergyManagement;
