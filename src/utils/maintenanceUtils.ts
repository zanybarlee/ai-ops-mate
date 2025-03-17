import { format, addDays } from 'date-fns';

export type MaintenanceStatus = 'scheduled' | 'completed' | 'in-progress' | 'unscheduled';

export interface MaintenanceSlot {
  date: string;
  status: MaintenanceStatus;
  label: string;
  assignedTo?: string;
  notes?: string;
}

export interface MaintenanceRow {
  id: string;
  name: string;
  type: 'equipment' | 'personnel';
  category?: string;
  priority?: 'high' | 'medium' | 'low';
  schedule: MaintenanceSlot[];
}

// Personnel Management Types
export interface PersonnelData {
  id: string;
  name: string;
  role: string;
  department: string;
  skills: string[];
  availability: boolean[];  // 7 days of the week
  contactInfo: string;
}

// Equipment Management Types
export interface EquipmentData {
  id: string;
  name: string;
  category: string;
  status: 'operational' | 'maintenance-required' | 'out-of-service';
  priority: 'high' | 'medium' | 'low';
  lastMaintenance: string;
  nextMaintenance: string;
  maintenanceCycle: number; // in days
  location: string;
}

// Maintenance History Types
export interface MaintenanceHistoryData {
  id: string;
  referenceId: string;
  equipment: string;
  maintenanceType: string;
  assignedTo: string;
  date: string;
  status: 'completed' | 'in-progress' | 'scheduled' | 'cancelled';
  notes?: string;
  duration?: string;
}

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
const generatePersonnelSchedule = (startDate: Date): MaintenanceSlot[] => {
  const availabilityStatuses: MaintenanceStatus[] = ['scheduled', 'unscheduled'];
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

// Function to generate mock personnel data
export const fetchPersonnelData = (): PersonnelData[] => {
  return [
    {
      id: 'p1',
      name: 'John Doe',
      role: 'Senior Technician',
      department: 'IT Infrastructure',
      skills: ['Server Maintenance', 'Network Configuration', 'HVAC'],
      availability: [true, true, true, true, true, false, false],
      contactInfo: 'john.doe@example.com'
    },
    {
      id: 'p2',
      name: 'Jane Smith',
      role: 'Systems Engineer',
      department: 'Data Center',
      skills: ['Power Systems', 'Cooling Systems', 'Redundancy Planning'],
      availability: [true, true, false, true, true, false, false],
      contactInfo: 'jane.smith@example.com'
    },
    {
      id: 'p3',
      name: 'Robert Johnson',
      role: 'Network Specialist',
      department: 'IT Infrastructure',
      skills: ['Network Maintenance', 'Security', 'Cable Management'],
      availability: [false, true, true, true, true, true, false],
      contactInfo: 'robert.johnson@example.com'
    },
    {
      id: 'p4',
      name: 'Emily Davis',
      role: 'Junior Technician',
      department: 'Support',
      skills: ['Hardware Troubleshooting', 'Basic Repairs', 'Inventory'],
      availability: [true, true, true, false, true, false, false],
      contactInfo: 'emily.davis@example.com'
    },
    {
      id: 'p5',
      name: 'Michael Wilson',
      role: 'Maintenance Supervisor',
      department: 'Facilities',
      skills: ['Team Management', 'Emergency Response', 'Compliance'],
      availability: [true, true, true, true, true, true, true],
      contactInfo: 'michael.wilson@example.com'
    }
  ];
};

// Function to generate mock equipment data
export const fetchEquipmentData = (): EquipmentData[] => {
  return [
    {
      id: 'e1',
      name: 'Cooling System A',
      category: 'HVAC',
      status: 'operational',
      priority: 'high',
      lastMaintenance: '2023-04-15',
      nextMaintenance: '2023-05-15',
      maintenanceCycle: 30,
      location: 'Server Room 1'
    },
    {
      id: 'e2',
      name: 'Server Rack B3',
      category: 'Server Infrastructure',
      status: 'maintenance-required',
      priority: 'high',
      lastMaintenance: '2023-03-10',
      nextMaintenance: '2023-04-10',
      maintenanceCycle: 30,
      location: 'Data Center A'
    },
    {
      id: 'e3',
      name: 'Power Generator',
      category: 'Power',
      status: 'operational',
      priority: 'high',
      lastMaintenance: '2023-04-01',
      nextMaintenance: '2023-07-01',
      maintenanceCycle: 90,
      location: 'Utility Room'
    },
    {
      id: 'e4',
      name: 'Network Switch C4',
      category: 'Network',
      status: 'operational',
      priority: 'medium',
      lastMaintenance: '2023-03-25',
      nextMaintenance: '2023-05-25',
      maintenanceCycle: 60,
      location: 'Comm Room 2'
    },
    {
      id: 'e5',
      name: 'UPS System',
      category: 'Power',
      status: 'out-of-service',
      priority: 'high',
      lastMaintenance: '2023-02-15',
      nextMaintenance: '2023-04-15',
      maintenanceCycle: 60,
      location: 'Server Room 1'
    },
    {
      id: 'e6',
      name: 'Backup Storage Array',
      category: 'Storage',
      status: 'maintenance-required',
      priority: 'medium',
      lastMaintenance: '2023-03-20',
      nextMaintenance: '2023-05-20',
      maintenanceCycle: 60,
      location: 'Data Center B'
    }
  ];
};

// Function to generate mock maintenance history data
export const fetchMaintenanceHistory = (): MaintenanceHistoryData[] => {
  return [
    {
      id: 'h1',
      referenceId: 'MAINT-2023-001',
      equipment: 'Cooling System A',
      maintenanceType: 'Preventive',
      assignedTo: 'John Doe',
      date: '2023-04-15',
      status: 'completed',
      notes: 'Replaced filters and cleaned cooling coils',
      duration: '4 hours'
    },
    {
      id: 'h2',
      referenceId: 'MAINT-2023-002',
      equipment: 'Server Rack B3',
      maintenanceType: 'Inspection',
      assignedTo: 'Jane Smith',
      date: '2023-03-10',
      status: 'completed',
      notes: 'Checked all connections and temperature sensors',
      duration: '2 hours'
    },
    {
      id: 'h3',
      referenceId: 'MAINT-2023-003',
      equipment: 'Power Generator',
      maintenanceType: 'Preventive',
      assignedTo: 'Robert Johnson',
      date: '2023-04-01',
      status: 'completed',
      notes: 'Oil change and test run completed',
      duration: '3 hours'
    },
    {
      id: 'h4',
      referenceId: 'MAINT-2023-004',
      equipment: 'UPS System',
      maintenanceType: 'Repair',
      assignedTo: 'Michael Wilson',
      date: '2023-04-20',
      status: 'in-progress',
      notes: 'Replacing failed battery modules',
      duration: 'Ongoing'
    },
    {
      id: 'h5',
      referenceId: 'MAINT-2023-005',
      equipment: 'Network Switch C4',
      maintenanceType: 'Firmware Update',
      assignedTo: 'Emily Davis',
      date: '2023-04-25',
      status: 'scheduled',
      notes: 'Update to latest firmware version to patch security vulnerabilities'
    },
    {
      id: 'h6',
      referenceId: 'MAINT-2023-006',
      equipment: 'Backup Storage Array',
      maintenanceType: 'Inspection',
      assignedTo: 'Jane Smith',
      date: '2023-04-22',
      status: 'scheduled',
      notes: 'Check disk health and replace any failing units'
    },
    {
      id: 'h7',
      referenceId: 'MAINT-2023-007',
      equipment: 'Server Rack B3',
      maintenanceType: 'Emergency',
      assignedTo: 'John Doe',
      date: '2023-03-05',
      status: 'completed',
      notes: 'Emergency response to cooling failure',
      duration: '6 hours'
    },
    {
      id: 'h8',
      referenceId: 'MAINT-2023-008',
      equipment: 'Cooling System A',
      maintenanceType: 'Scheduled',
      assignedTo: 'Robert Johnson',
      date: '2023-05-15',
      status: 'scheduled',
      notes: 'Regular maintenance and inspection'
    }
  ];
};
