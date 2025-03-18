
import { format, addDays } from 'date-fns';
import { MaintenanceRow, MaintenanceSlot, MaintenanceStatus } from './types';

// Function to generate mock maintenance data
export const generateMockMaintenanceData = (startDate: Date): MaintenanceRow[] => {
  const equipmentItems: MaintenanceRow[] = [
    {
      id: 'equip-1',
      name: 'Cooling System A',
      type: 'equipment',
      category: 'HVAC',
      priority: 'high',
      schedule: generateRandomSchedule(startDate, ['Inspection', 'Cleaning', 'Repair'])
    },
    {
      id: 'equip-2',
      name: 'Rack B3',
      type: 'equipment',
      category: 'Server Infrastructure',
      priority: 'high',
      schedule: generateRandomSchedule(startDate, ['Temperature Check', 'Component Swap', 'Diagnostic'])
    },
    {
      id: 'equip-3',
      name: 'Power Generator',
      type: 'equipment',
      category: 'Power',
      priority: 'medium',
      schedule: generateRandomSchedule(startDate, ['Fuel Check', 'Test Run', 'Maintenance'])
    },
    {
      id: 'equip-4',
      name: 'Network Switch',
      type: 'equipment',
      category: 'Network',
      priority: 'medium',
      schedule: generateRandomSchedule(startDate, ['Firmware Update', 'Cable Check', 'Performance Test'])
    },
    {
      id: 'equip-5',
      name: 'UPS Battery',
      type: 'equipment',
      category: 'Power',
      priority: 'low',
      schedule: generateRandomSchedule(startDate, ['Discharge Test', 'Replacement', 'Diagnostics'])
    }
  ];
  
  const personnelItems: MaintenanceRow[] = [
    {
      id: 'person-1',
      name: 'John Doe',
      type: 'personnel',
      category: 'Technician',
      schedule: generatePersonnelSchedule(startDate)
    },
    {
      id: 'person-2',
      name: 'Jane Smith',
      type: 'personnel',
      category: 'Engineer',
      schedule: generatePersonnelSchedule(startDate)
    },
    {
      id: 'person-3',
      name: 'Robert Johnson',
      type: 'personnel',
      category: 'Specialist',
      schedule: generatePersonnelSchedule(startDate)
    },
    {
      id: 'person-4',
      name: 'Emily Davis',
      type: 'personnel',
      category: 'Technician',
      schedule: generatePersonnelSchedule(startDate)
    }
  ];
  
  return [...equipmentItems, ...personnelItems];
};

// Helper function to generate random schedule for equipment
const generateRandomSchedule = (startDate: Date, tasks: string[]): MaintenanceSlot[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startDate, i);
    const dateString = format(date, 'yyyy-MM-dd');
    
    // Random status based on probabilities
    const rand = Math.random();
    let status: MaintenanceStatus = 'unscheduled';
    let label = '';
    
    if (rand < 0.4) {
      status = 'scheduled';
      label = tasks[Math.floor(Math.random() * tasks.length)];
    } else if (rand < 0.5) {
      status = 'in-progress';
      label = tasks[Math.floor(Math.random() * tasks.length)];
    } else if (rand < 0.6) {
      status = 'completed';
      label = tasks[Math.floor(Math.random() * tasks.length)];
    }
    
    return {
      date: dateString,
      status,
      label
    };
  });
};

// Helper function to generate personnel schedule
export const generatePersonnelSchedule = (startDate: Date): MaintenanceSlot[] => {
  const shifts = ['AM Shift', 'PM Shift', 'Night Shift', 'On Call', 'Off Duty'];
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startDate, i);
    const dateString = format(date, 'yyyy-MM-dd');
    
    // For weekends, higher chance of being unavailable
    const isWeekend = i === 5 || i === 6;
    const rand = Math.random();
    
    let status: MaintenanceStatus = 'unscheduled';
    let label = 'Off Duty';
    
    if (isWeekend) {
      if (rand < 0.3) {
        status = 'scheduled';
        label = shifts[Math.floor(Math.random() * shifts.length)];
      }
    } else {
      if (rand < 0.8) {
        status = 'scheduled';
        label = shifts[Math.floor(Math.random() * (shifts.length - 1))]; // Exclude "Off Duty"
      }
    }
    
    return {
      date: dateString,
      status,
      label
    };
  });
};
