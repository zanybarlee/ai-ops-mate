
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { RackView, ServerView } from './resource-allocation';
import { serverRacks, serverAllocation } from './resource-allocation/mockData';

const ResourceAllocationMap = () => {
  const [view, setView] = useState('racks');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'high': return 'bg-amber-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Resource Allocation Map</CardTitle>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh Data
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={view} onValueChange={setView} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="racks">Rack View</TabsTrigger>
            <TabsTrigger value="servers">Server View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="racks">
            <RackView 
              serverRacks={serverRacks} 
              getStatusColor={getStatusColor} 
            />
          </TabsContent>
          
          <TabsContent value="servers">
            <ServerView 
              serverAllocation={serverAllocation} 
              getStatusColor={getStatusColor} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResourceAllocationMap;
