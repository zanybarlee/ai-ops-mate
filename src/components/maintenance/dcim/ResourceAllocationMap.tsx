
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { Server, Cpu, Memory, Database, HardDrive, RefreshCw } from 'lucide-react';

// Mock data for server racks
const serverRacks = [
  { id: 'rack-1', name: 'Rack 01-A', servers: 42, utilization: 82, status: 'normal', power: 6.8, cooling: 'Optimal' },
  { id: 'rack-2', name: 'Rack 01-B', servers: 42, utilization: 75, status: 'normal', power: 5.9, cooling: 'Optimal' },
  { id: 'rack-3', name: 'Rack 02-A', servers: 42, utilization: 91, status: 'high', power: 7.2, cooling: 'Elevated' },
  { id: 'rack-4', name: 'Rack 02-B', servers: 42, utilization: 68, status: 'normal', power: 5.5, cooling: 'Optimal' },
  { id: 'rack-5', name: 'Rack 03-A', servers: 42, utilization: 79, status: 'normal', power: 6.3, cooling: 'Optimal' },
  { id: 'rack-6', name: 'Rack 03-B', servers: 42, utilization: 86, status: 'normal', power: 6.9, cooling: 'Slightly Elevated' },
  { id: 'rack-7', name: 'Rack 04-A', servers: 42, utilization: 93, status: 'high', power: 7.8, cooling: 'High' },
  { id: 'rack-8', name: 'Rack 04-B', servers: 42, utilization: 55, status: 'low', power: 4.1, cooling: 'Optimal' },
];

// Mock data for server allocation
const serverAllocation = [
  { id: 'server-1', name: 'App Server 1', rack: 'Rack 01-A', cpu: 78, memory: 82, storage: 65, status: 'normal' },
  { id: 'server-2', name: 'App Server 2', rack: 'Rack 01-A', cpu: 85, memory: 76, storage: 58, status: 'normal' },
  { id: 'server-3', name: 'DB Server 1', rack: 'Rack 02-A', cpu: 92, memory: 88, storage: 75, status: 'high' },
  { id: 'server-4', name: 'Web Server 1', rack: 'Rack 01-B', cpu: 65, memory: 58, storage: 42, status: 'normal' },
  { id: 'server-5', name: 'Web Server 2', rack: 'Rack 01-B', cpu: 72, memory: 68, storage: 45, status: 'normal' },
  { id: 'server-6', name: 'Storage Server 1', rack: 'Rack 03-A', cpu: 45, memory: 52, storage: 92, status: 'normal' },
  { id: 'server-7', name: 'Compute Node 1', rack: 'Rack 04-A', cpu: 95, memory: 91, storage: 48, status: 'high' },
  { id: 'server-8', name: 'Compute Node 2', rack: 'Rack 04-A', cpu: 93, memory: 89, storage: 52, status: 'high' },
];

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
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Rack Name</TableHead>
                    <TableHead>Servers</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Power Draw</TableHead>
                    <TableHead>Cooling Status</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serverRacks.map((rack) => (
                    <TableRow key={rack.id}>
                      <TableCell className="font-medium">{rack.name}</TableCell>
                      <TableCell>{rack.servers} U</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-200 dark:bg-gray-700 w-24 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                rack.utilization > 90 ? 'bg-red-500' : 
                                rack.utilization > 80 ? 'bg-amber-500' : 
                                'bg-green-500'
                              }`} 
                              style={{ width: `${rack.utilization}%` }}
                            ></div>
                          </div>
                          <span>{rack.utilization}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{rack.power} kW</TableCell>
                      <TableCell>{rack.cooling}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(rack.status)} text-white`}>
                          {rack.status === 'normal' ? 'Normal' : 
                           rack.status === 'high' ? 'High Usage' : 
                           rack.status === 'low' ? 'Low Usage' : rack.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="servers">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Server Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <Cpu className="h-4 w-4 mr-1" />
                        CPU
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <Memory className="h-4 w-4 mr-1" />
                        Memory
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <HardDrive className="h-4 w-4 mr-1" />
                        Storage
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serverAllocation.map((server) => (
                    <TableRow key={server.id}>
                      <TableCell className="font-medium">{server.name}</TableCell>
                      <TableCell>{server.rack}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-200 dark:bg-gray-700 w-16 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                server.cpu > 90 ? 'bg-red-500' : 
                                server.cpu > 80 ? 'bg-amber-500' : 
                                'bg-green-500'
                              }`} 
                              style={{ width: `${server.cpu}%` }}
                            ></div>
                          </div>
                          <span>{server.cpu}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-200 dark:bg-gray-700 w-16 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                server.memory > 90 ? 'bg-red-500' : 
                                server.memory > 80 ? 'bg-amber-500' : 
                                'bg-green-500'
                              }`} 
                              style={{ width: `${server.memory}%` }}
                            ></div>
                          </div>
                          <span>{server.memory}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-200 dark:bg-gray-700 w-16 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                server.storage > 90 ? 'bg-red-500' : 
                                server.storage > 80 ? 'bg-amber-500' : 
                                'bg-green-500'
                              }`} 
                              style={{ width: `${server.storage}%` }}
                            ></div>
                          </div>
                          <span>{server.storage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(server.status)} text-white`}>
                          {server.status === 'normal' ? 'Normal' : 
                           server.status === 'high' ? 'High Usage' : 
                           server.status === 'low' ? 'Low Usage' : server.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResourceAllocationMap;
