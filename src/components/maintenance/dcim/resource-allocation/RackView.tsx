
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Type definitions for props
interface RackViewProps {
  serverRacks: {
    id: string;
    name: string;
    servers: number;
    utilization: number;
    status: string;
    power: number;
    cooling: string;
  }[];
  getStatusColor: (status: string) => string;
}

const RackView = ({ serverRacks, getStatusColor }: RackViewProps) => {
  return (
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
  );
};

export default RackView;
