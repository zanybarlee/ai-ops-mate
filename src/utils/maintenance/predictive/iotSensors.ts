
import { IoTSensor } from '../types';
import { mockIoTSensors } from './mockData';

export const fetchIoTSensors = (): IoTSensor[] => {
  return mockIoTSensors;
};

export const getSensorStatusCounts = (): { normal: number; warning: number; critical: number } => {
  const statusCounts = { normal: 0, warning: 0, critical: 0 };
  mockIoTSensors.forEach(sensor => {
    statusCounts[sensor.lastReading.status]++;
  });
  return statusCounts;
};
