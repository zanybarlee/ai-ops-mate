
import { MaintenanceHistoryData } from './types';

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
