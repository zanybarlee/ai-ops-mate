
import React from 'react';
import { KanbanColumn as KanbanColumnType, KanbanTask as KanbanTaskType } from '@/utils/maintenance/types';
import KanbanTask from './KanbanTask';

interface KanbanColumnProps {
  column: KanbanColumnType;
  onDrop: (taskId: string, columnId: string) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

const KanbanColumn = ({ column, onDrop, onDragStart }: KanbanColumnProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData('taskId');
    onDrop(taskId, column.id);
  };

  return (
    <div 
      className="flex-1 min-w-[250px] bg-accent/50 rounded-md p-3"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">{column.title}</h3>
        <div className="text-xs bg-accent-foreground/10 text-accent-foreground px-2 py-0.5 rounded-full">
          {column.tasks.length}
        </div>
      </div>
      
      <div className="space-y-3">
        {column.tasks.map(task => (
          <KanbanTask 
            key={task.id} 
            task={task} 
            onDragStart={onDragStart}
          />
        ))}
        
        {column.tasks.length === 0 && (
          <div className="text-xs text-center text-muted-foreground py-6 border border-dashed rounded">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
