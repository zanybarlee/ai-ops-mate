
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Wrench,
  Settings,
  HardDrive,
  Clock,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { EquipmentData, fetchEquipmentData } from '@/utils/maintenanceUtils';

const EquipmentManagement = () => {
  const [equipment, setEquipment] = useState<EquipmentData[]>(() => fetchEquipmentData());
  const { toast } = useToast();
  
  const handleAddEquipment = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The ability to add new equipment will be implemented in the next update.",
    });
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <span className="h-2 w-2 rounded-full bg-green-500"></span>;
      case 'maintenance-required':
        return <AlertTriangle className="h-3 w-3 text-yellow-500" />;
      case 'out-of-service':
        return <span className="h-2 w-2 rounded-full bg-red-500"></span>;
      default:
        return null;
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      default:
        return '';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-medium">Equipment Management</h2>
        </div>
        <Button onClick={handleAddEquipment}>
          <Plus className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </div>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <span>Maintenance Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-card border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Equipment</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Last Maintenance</TableHead>
                  <TableHead>Next Maintenance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipment.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        {item.name}
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <span>{item.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {item.lastMaintenance}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {item.nextMaintenance}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Schedule</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
              <span>Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-3 w-3 text-yellow-500" />
              <span>Maintenance Required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-red-500"></span>
              <span>Out of Service</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentManagement;
