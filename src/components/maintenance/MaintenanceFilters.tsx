
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X } from 'lucide-react';

const MaintenanceFilters = () => {
  const [personnelFilters, setPersonnelFilters] = useState<string[]>([]);
  const [equipmentFilters, setEquipmentFilters] = useState<string[]>([]);
  
  return (
    <Card className="mb-4 bg-muted/40 border">
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search equipment or personnel..."
                className="pl-8"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="status">Status</Label>
            <Select defaultValue="all">
              <SelectTrigger id="status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="unscheduled">Unscheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select defaultValue="all">
              <SelectTrigger id="priority">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label className="mb-2 block">Personnel</Label>
            <div className="flex flex-wrap gap-2">
              {["John Doe", "Jane Smith", "Robert Johnson", "Emily Davis"].map((person) => (
                <div 
                  key={person}
                  className={`
                    px-2 py-1 text-xs rounded-md flex items-center gap-1 cursor-pointer
                    ${personnelFilters.includes(person) 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'}
                  `}
                  onClick={() => {
                    if (personnelFilters.includes(person)) {
                      setPersonnelFilters(personnelFilters.filter(p => p !== person));
                    } else {
                      setPersonnelFilters([...personnelFilters, person]);
                    }
                  }}
                >
                  {person}
                  {personnelFilters.includes(person) && <X className="h-3 w-3" />}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <Label className="mb-2 block">Equipment</Label>
            <div className="flex flex-wrap gap-2">
              {["Cooling System", "Power Generator", "Rack B3", "Network Switch"].map((equipment) => (
                <div 
                  key={equipment}
                  className={`
                    px-2 py-1 text-xs rounded-md flex items-center gap-1 cursor-pointer
                    ${equipmentFilters.includes(equipment) 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'}
                  `}
                  onClick={() => {
                    if (equipmentFilters.includes(equipment)) {
                      setEquipmentFilters(equipmentFilters.filter(e => e !== equipment));
                    } else {
                      setEquipmentFilters([...equipmentFilters, equipment]);
                    }
                  }}
                >
                  {equipment}
                  {equipmentFilters.includes(equipment) && <X className="h-3 w-3" />}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="outline" size="sm">Reset</Button>
          <Button size="sm">Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceFilters;
