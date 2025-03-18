
import { SensorReading } from '../types';
import { mockIoTSensors } from './mockData';

// Mock sensor readings history generator
export const generateSensorReadings = (sensorId: string, baseValue: number, unit: string, range: {min: number, max: number}): SensorReading[] => {
  const readings: SensorReading[] = [];
  const now = new Date();
  
  for (let i = 0; i < 48; i++) {
    const timestamp = new Date(now.getTime() - (i * 30 * 60 * 1000)).toISOString(); // Every 30 minutes
    const randomVariation = (Math.random() - 0.5) * (range.max - range.min) * 0.2;
    const value = baseValue + randomVariation;
    const status = value > range.max ? 'critical' : 
                  value > (range.max - (range.max - range.min) * 0.2) ? 'warning' : 'normal';
    
    readings.push({
      id: `reading-${sensorId}-${i}`,
      sensorId,
      timestamp,
      value,
      unit,
      normalRange: range,
      status
    });
  }
  
  return readings;
};

export const fetchSensorReadings = (sensorId: string): SensorReading[] => {
  const sensor = mockIoTSensors.find(s => s.id === sensorId);
  if (!sensor) return [];
  
  return generateSensorReadings(
    sensorId, 
    sensor.lastReading.value, 
    sensor.lastReading.unit, 
    sensor.lastReading.normalRange
  );
};
