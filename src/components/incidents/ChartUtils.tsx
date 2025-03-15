
import { TooltipProps } from 'recharts';

export const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card py-2 px-3 text-sm shadow-lg">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-primary">{`${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// Mock data for the dashboard
export const performanceData = [
  { name: '00:00', value: 65 },
  { name: '02:00', value: 60 },
  { name: '04:00', value: 67 },
  { name: '06:00', value: 70 },
  { name: '08:00', value: 75 },
  { name: '10:00', value: 82 },
  { name: '12:00', value: 85 },
  { name: '14:00', value: 80 },
  { name: '16:00', value: 90 },
  { name: '18:00', value: 87 },
  { name: '20:00', value: 75 },
  { name: '22:00', value: 68 },
];

export const temperatureData = [
  { name: '00:00', value: 22 },
  { name: '02:00', value: 21.5 },
  { name: '04:00', value: 21 },
  { name: '06:00', value: 21.2 },
  { name: '08:00', value: 21.8 },
  { name: '10:00', value: 23 },
  { name: '12:00', value: 24.5 },
  { name: '14:00', value: 25 },
  { name: '16:00', value: 24.8 },
  { name: '18:00', value: 24 },
  { name: '20:00', value: 23.5 },
  { name: '22:00', value: 22.8 },
];

export const incidentTypes = [
  { name: 'Hardware', value: 42 },
  { name: 'Network', value: 28 },
  { name: 'Power', value: 15 },
  { name: 'Cooling', value: 23 },
  { name: 'Software', value: 34 },
];

export const incidents = [
  { 
    id: 'INC-2023-001', 
    title: 'Server Cooling Fan Failure', 
    severity: 'high', 
    status: 'active', 
    time: '28 min ago',
    prediction: 'Potential thermal event in 4 hours' 
  },
  { 
    id: 'INC-2023-002', 
    title: 'Network Switch Degradation', 
    severity: 'medium', 
    status: 'investigating', 
    time: '1 hr 15 min ago',
    prediction: 'Connectivity loss risk: 35%' 
  },
  { 
    id: 'INC-2023-003', 
    title: 'Power Distribution Unit Alert', 
    severity: 'low', 
    status: 'resolved', 
    time: '3 hrs ago',
    prediction: 'No further issues expected' 
  },
  { 
    id: 'INC-2023-004', 
    title: 'Database Performance Degradation', 
    severity: 'medium', 
    status: 'monitoring', 
    time: '2 hrs 45 min ago',
    prediction: 'Expected resolution within 30 minutes' 
  },
];
