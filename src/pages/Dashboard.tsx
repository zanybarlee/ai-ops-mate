
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IncidentDashboard from '@/components/incidents/IncidentDashboard';
import SuccessMetrics from '@/components/SuccessMetrics';
import KnowledgeBase from '@/components/KnowledgeBase';
import ChatInterface from '@/components/ChatInterface';
import MaintenanceAlert from '@/components/maintenance/MaintenanceAlert';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Shield, Calendar, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('incidents');
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isAuthenticated, user } = useAuth();
  
  // All authenticated users can access the dashboard

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
                Please sign in to access the dashboard.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
              <p className="text-muted-foreground mt-2">You're signed in as a {user?.role.replace('_', ' ')}.</p>
            </div>
            
            {/* Display maintenance alert */}
            <MaintenanceAlert />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="mb-2">
                <TabsTrigger value="incidents">Incidents</TabsTrigger>
                <TabsTrigger value="metrics">KPI Metrics</TabsTrigger>
                <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
                <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="energy">Energy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="incidents" className="animate-fade-in">
                <IncidentDashboard />
              </TabsContent>
              
              <TabsContent value="metrics" className="animate-fade-in">
                <SuccessMetrics />
              </TabsContent>
              
              <TabsContent value="knowledge" className="animate-fade-in">
                <KnowledgeBase />
              </TabsContent>
              
              <TabsContent value="assistant" className="animate-fade-in">
                <div className="max-w-3xl mx-auto">
                  <ChatInterface />
                </div>
              </TabsContent>
              
              <TabsContent value="maintenance" className="animate-fade-in">
                <div className="glass-card p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-medium">Maintenance Scheduling</h2>
                      <p className="text-muted-foreground">Manage maintenance rosters and equipment schedules</p>
                    </div>
                    <Button 
                      onClick={() => navigate('/maintenance')} 
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      Full Schedule View
                    </Button>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 dark:text-yellow-400 p-4 rounded-lg mb-4">
                    <p className="text-sm font-medium">The cooling system in Rack B3 requires maintenance within the next 7 days.</p>
                  </div>
                  <p>Access the full maintenance scheduling module for detailed roster management and equipment maintenance scheduling.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="energy" className="animate-fade-in">
                <div className="glass-card p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-medium">Energy Management</h2>
                      <p className="text-muted-foreground">AI-powered thermal analytics and dynamic power management</p>
                    </div>
                    <Button 
                      onClick={() => navigate('/energy')} 
                      className="flex items-center gap-2"
                    >
                      <Zap className="h-4 w-4" />
                      Energy Dashboard
                    </Button>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 p-4 rounded-lg mb-4">
                    <p className="text-sm font-medium">AI has identified potential energy savings of up to 35% through optimized cooling operations.</p>
                  </div>
                  <p>Access the full energy management dashboard to view detailed thermal analytics and power optimization recommendations.</p>
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

export default Dashboard;
