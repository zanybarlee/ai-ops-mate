
import { PersonnelData } from './types';

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
