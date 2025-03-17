
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
  Users, 
  UserPlus, 
  UserCheck, 
  Calendar,
  X,
  Check
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { PersonnelData, fetchPersonnelData } from '@/utils/maintenanceUtils';

const PersonnelManagement = () => {
  const [personnel, setPersonnel] = useState<PersonnelData[]>(() => fetchPersonnelData());
  const { toast } = useToast();
  
  const handleToggleAvailability = (id: string, day: number) => {
    setPersonnel(prev => 
      prev.map(person => {
        if (person.id === id) {
          const newAvailability = [...person.availability];
          newAvailability[day] = !newAvailability[day];
          return {...person, availability: newAvailability};
        }
        return person;
      })
    );
    
    toast({
      title: "Availability Updated",
      description: "Personnel availability has been updated successfully.",
    });
  };
  
  const handleAddPersonnel = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The ability to add new personnel will be implemented in the next update.",
    });
  };
  
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-medium">Personnel Management</h2>
        </div>
        <Button onClick={handleAddPersonnel}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Personnel
        </Button>
      </div>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            <span>Personnel Availability</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-card border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px]">Name</TableHead>
                  <TableHead className="min-w-[120px]">Role</TableHead>
                  {weekdays.map(day => (
                    <TableHead key={day} className="text-center">{day.substring(0, 3)}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {personnel.map(person => (
                  <TableRow key={person.id}>
                    <TableCell className="font-medium">{person.name}</TableCell>
                    <TableCell>{person.role}</TableCell>
                    {person.availability.map((available, idx) => (
                      <TableCell key={idx} className="text-center">
                        <button
                          onClick={() => handleToggleAvailability(person.id, idx)}
                          className={`h-6 w-6 rounded-full flex items-center justify-center ${
                            available 
                              ? 'bg-green-500/20 text-green-600 hover:bg-green-500/30' 
                              : 'bg-red-500/20 text-red-600 hover:bg-red-500/30'
                          }`}
                        >
                          {available ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                        </button>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-green-500/20"></span>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-red-500/20"></span>
              <span>Unavailable</span>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button variant="outline" className="mr-2">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule View
            </Button>
            <Button>
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonnelManagement;
