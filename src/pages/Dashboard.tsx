
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IncidentDashboard from '@/components/IncidentDashboard';
import SuccessMetrics from '@/components/SuccessMetrics';
import KnowledgeBase from '@/components/KnowledgeBase';
import ChatInterface from '@/components/ChatInterface';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('incidents');
  
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
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="mb-2">
                <TabsTrigger value="incidents">Incidents</TabsTrigger>
                <TabsTrigger value="metrics">KPI Metrics</TabsTrigger>
                <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
                <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
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
            </Tabs>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
