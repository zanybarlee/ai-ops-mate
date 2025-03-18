
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThermalAnalytics from './ThermalAnalytics';
import PowerManagement from './PowerManagement';
import PowerOptimizationList from './PowerOptimizationList';

const ThermalPowerDashboard = () => {
  const [activeTab, setActiveTab] = useState('thermal');
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium">Energy Management Dashboard</h2>
        <p className="text-muted-foreground">AI-powered thermal analytics and dynamic power management</p>
      </div>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle>Dashboard Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="thermal">Thermal Analytics</TabsTrigger>
              <TabsTrigger value="power">Power Management</TabsTrigger>
              <TabsTrigger value="optimizations">Optimizations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="thermal">
              <ThermalAnalytics />
            </TabsContent>
            
            <TabsContent value="power">
              <PowerManagement />
            </TabsContent>
            
            <TabsContent value="optimizations">
              <PowerOptimizationList />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThermalPowerDashboard;
