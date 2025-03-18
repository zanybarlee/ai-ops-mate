
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
  History,
  Clock,
  FileText,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MaintenanceHistoryData, fetchMaintenanceHistory } from '@/utils/maintenance';

const MaintenanceHistory = () => {
  const [history, setHistory] = useState<MaintenanceHistoryData[]>(() => fetchMaintenanceHistory());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const totalPages = Math.ceil(history.length / itemsPerPage);
  const currentItems = history.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'in-progress':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'scheduled':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'cancelled':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      default:
        return '';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-medium">Maintenance History</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span>Maintenance Records</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-card border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px]">Reference ID</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Maintenance Type</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.referenceId}
                    </TableCell>
                    <TableCell>{item.equipment}</TableCell>
                    <TableCell>{item.maintenanceType}</TableCell>
                    <TableCell>{item.assignedTo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {item.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="mt-4 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceHistory;
