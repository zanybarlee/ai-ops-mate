
import { KanbanTask, KanbanColumn, KanbanColumnType } from './types';

// Function to fetch mock Kanban tasks
export const fetchKanbanTasks = (): KanbanTask[] => {
  return [
    {
      id: 'task-1',
      title: 'Replace cooling fan',
      description: 'Fan #3 in rack B3 needs replacement due to excessive noise',
      equipmentId: 'e2',
      equipmentName: 'Server Rack B3',
      assignedTo: 'John Doe',
      dueDate: '2023-04-28',
      priority: 'high',
      status: 'todo',
      category: 'Server Infrastructure'
    },
    {
      id: 'task-2',
      title: 'Firmware update',
      description: 'Apply security patches to all network switches',
      equipmentId: 'e4',
      equipmentName: 'Network Switch C4',
      assignedTo: 'Robert Johnson',
      dueDate: '2023-04-30',
      priority: 'medium',
      status: 'backlog',
      category: 'Network'
    },
    {
      id: 'task-3',
      title: 'UPS Battery replacement',
      description: 'Replace all battery modules in UPS system',
      equipmentId: 'e5',
      equipmentName: 'UPS System',
      assignedTo: 'Michael Wilson',
      dueDate: '2023-04-25',
      priority: 'high',
      status: 'in-progress',
      category: 'Power'
    },
    {
      id: 'task-4',
      title: 'Cooling system inspection',
      description: 'Perform quarterly maintenance check on cooling system',
      equipmentId: 'e1',
      equipmentName: 'Cooling System A',
      assignedTo: 'Emily Davis',
      dueDate: '2023-05-05',
      priority: 'medium',
      status: 'backlog',
      category: 'HVAC'
    },
    {
      id: 'task-5',
      title: 'Generator oil change',
      description: 'Scheduled oil change and filter replacement',
      equipmentId: 'e3',
      equipmentName: 'Power Generator',
      assignedTo: 'John Doe',
      dueDate: '2023-04-20',
      priority: 'low',
      status: 'completed',
      category: 'Power'
    },
    {
      id: 'task-6',
      title: 'Storage array disk check',
      description: 'Inspect and replace any failing disks',
      equipmentId: 'e6',
      equipmentName: 'Backup Storage Array',
      assignedTo: 'Jane Smith',
      dueDate: '2023-04-27',
      priority: 'medium',
      status: 'todo',
      category: 'Storage'
    },
    {
      id: 'task-7',
      title: 'Network cable management',
      description: 'Reorganize and label network cables in racks A1-A4',
      equipmentId: 'e4',
      equipmentName: 'Network Switch C4',
      assignedTo: 'Robert Johnson',
      dueDate: '2023-05-10',
      priority: 'low',
      status: 'todo',
      category: 'Network'
    },
    {
      id: 'task-8',
      title: 'Air filter replacement',
      description: 'Replace HVAC air filters throughout data center',
      equipmentId: 'e1',
      equipmentName: 'Cooling System A',
      assignedTo: 'Emily Davis',
      dueDate: '2023-04-22',
      priority: 'medium',
      status: 'completed',
      category: 'HVAC'
    }
  ];
};

// Function to organize tasks into columns
export const organizeTasksByColumn = (tasks: KanbanTask[]): KanbanColumn[] => {
  const columns: KanbanColumn[] = [
    { id: 'backlog', title: 'Backlog', tasks: [] },
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'in-progress', title: 'In Progress', tasks: [] },
    { id: 'completed', title: 'Completed', tasks: [] }
  ];

  // Distribute tasks to their respective columns
  tasks.forEach(task => {
    const column = columns.find(col => col.id === task.status);
    if (column) {
      column.tasks.push(task);
    }
  });

  return columns;
};

// Function to move a task between columns
export const moveTask = (
  tasks: KanbanTask[],
  taskId: string,
  targetStatus: KanbanColumnType
): KanbanTask[] => {
  return tasks.map(task => 
    task.id === taskId 
      ? { ...task, status: targetStatus } 
      : task
  );
};

// Function to update task assignment
export const assignTask = (
  tasks: KanbanTask[],
  taskId: string,
  assignedTo: string
): KanbanTask[] => {
  return tasks.map(task => 
    task.id === taskId 
      ? { ...task, assignedTo } 
      : task
  );
};
