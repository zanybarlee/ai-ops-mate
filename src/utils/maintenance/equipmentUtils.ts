
import { EquipmentData } from './types';

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
