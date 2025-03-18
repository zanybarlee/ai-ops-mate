
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { KanbanTask as KanbanTaskType } from '@/utils/maintenance/types';
import { Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { format, isPast } from 'date-fns';

interface KanbanTaskProps {
  task: KanbanTaskType;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

const KanbanTask = ({ task, onDragStart }: KanbanTaskProps) => {
  const isPastDue = task.dueDate && isPast(new Date(task.dueDate));
  
  return (
    <Card 
      className="mb-3 cursor-grab shadow-sm"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="font-medium">{task.title}</div>
          <div 
            className={`w-2 h-2 rounded-full ${
              task.priority === 'high' ? 'bg-red-500' : 
              task.priority === 'medium' ? 'bg-yellow-500' : 
              'bg-blue-500'
            }`}
          />
        </div>
        
        <div className="text-xs text-muted-foreground mt-1 mb-2 line-clamp-2">
          {task.description || 'No description provided'}
        </div>
        
        <div className="flex items-center mt-1 text-xs text-muted-foreground">
          <div className="bg-secondary/20 px-2 py-0.5 rounded">
            {task.equipmentName}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          {task.assignedTo ? (
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-medium">
                {task.assignedTo.split(' ').map(name => name[0]).join('')}
              </div>
              <span className="text-xs ml-1 line-clamp-1 max-w-[80px]">
                {task.assignedTo}
              </span>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">Unassigned</div>
          )}
          
          {task.dueDate && (
            <div className={`flex items-center text-xs ${isPastDue ? 'text-red-500' : 'text-muted-foreground'}`}>
              {isPastDue ? (
                <AlertCircle className="w-3 h-3 mr-1" />
              ) : task.status === 'completed' ? (
                <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
              ) : (
                <Calendar className="w-3 h-3 mr-1" />
              )}
              {format(new Date(task.dueDate), 'MMM d')}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KanbanTask;
