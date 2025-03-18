
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Cpu, MemoryStick, HardDrive } from 'lucide-react';

// Type definitions for props
interface ServerViewProps {
  serverAllocation: {
    id: string;
    name: string;
    rack: string;
    cpu: number;
    memory: number;
    storage: number;
    status: string;
  }[];
  getStatusColor: (status: string) => string;
}

const ServerView = ({ serverAllocation, getStatusColor }: ServerViewProps) => {
  return (
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
                <MemoryStick className="h-4 w-4 mr-1" />
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
                <ResourceUtilizationBar value={server.cpu} />
              </TableCell>
              <TableCell>
                <ResourceUtilizationBar value={server.memory} />
              </TableCell>
              <TableCell>
                <ResourceUtilizationBar value={server.storage} />
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
  );
};

// Helper component for resource utilization bars
interface ResourceUtilizationBarProps {
  value: number;
}

const ResourceUtilizationBar = ({ value }: ResourceUtilizationBarProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-gray-200 dark:bg-gray-700 w-16 h-2 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${
            value > 90 ? 'bg-red-500' : 
            value > 80 ? 'bg-amber-500' : 
            'bg-green-500'
          }`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <span>{value}%</span>
    </div>
  );
};

export default ServerView;
