
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  fetchKanbanTasks, 
  organizeTasksByColumn, 
  moveTask,
  assignTask
} from '@/utils/maintenance/kanbanUtils';
import { fetchPersonnelData } from '@/utils/maintenance/personnelUtils';
import { 
  KanbanTask, 
  KanbanColumn as KanbanColumnType, 
  KanbanColumnType as ColumnType,
  PersonnelData 
} from '@/utils/maintenance/types';
import { 
  Filter, 
  Plus, 
  RefreshCw, 
  SlidersHorizontal 
} from 'lucide-react';
import KanbanColumn from './KanbanColumn';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MaintenanceKanban = () => {
  const [tasks, setTasks] = useState<KanbanTask[]>([]);
  const [columns, setColumns] = useState<KanbanColumnType[]>([]);
  const [personnel, setPersonnel] = useState<PersonnelData[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    // Load initial data
    const allTasks = fetchKanbanTasks();
    setTasks(allTasks);
    setPersonnel(fetchPersonnelData());
  }, []);

  useEffect(() => {
    // Organize tasks into columns whenever tasks change
    let filteredTasks = [...tasks];
    
    if (filter !== 'all') {
      filteredTasks = tasks.filter(task => task.category === filter);
    }
    
    const organizedColumns = organizeTasksByColumn(filteredTasks);
    setColumns(organizedColumns);
  }, [tasks, filter]);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (taskId: string, columnId: ColumnType) => {
    const updatedTasks = moveTask(tasks, taskId, columnId);
    setTasks(updatedTasks);
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: `Task Updated`,
        description: `"${task.title}" moved to ${columnId.replace('-', ' ')}`,
      });
    }
  };

  const handleAssignTask = (taskId: string, assigneeId: string) => {
    const person = personnel.find(p => p.id === assigneeId);
    if (person) {
      const updatedTasks = assignTask(tasks, taskId, person.name);
      setTasks(updatedTasks);
      
      toast({
        title: "Task Assigned",
        description: `Task assigned to ${person.name}`,
      });
    }
  };

  const handleRefresh = () => {
    const allTasks = fetchKanbanTasks();
    setTasks(allTasks);
    
    toast({
      title: "Board Refreshed",
      description: "The Kanban board has been refreshed with the latest data.",
    });
  };

  // Get unique categories for filtering
  const categories = ['all', ...new Set(tasks.map(task => task.category))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-medium mb-1">Task Board</h2>
          <p className="text-muted-foreground">
            Drag and drop tasks to update their status
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select
            value={filter}
            onValueChange={setFilter}
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline"
            onClick={handleRefresh}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map(column => (
          <KanbanColumn
            key={column.id}
            column={column}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
    </div>
  );
};

export default MaintenanceKanban;
