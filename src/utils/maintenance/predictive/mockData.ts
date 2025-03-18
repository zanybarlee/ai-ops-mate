
import { IoTSensor, SensorReading, PredictiveMaintenance } from '../types';

// Mock IoT sensors data
export const mockIoTSensors: IoTSensor[] = [
  {
    id: 'sensor-001',
    name: 'Chiller-1 Vibration',
    equipmentId: 'equip-001',
    equipmentName: 'Chiller Unit 1',
    type: 'vibration',
    location: 'Cooling Room A',
    status: 'online',
    lastReading: {
      id: 'reading-001',
      sensorId: 'sensor-001',
      timestamp: new Date().toISOString(),
      value: 2.8,
      unit: 'mm/s',
      normalRange: { min: 0, max: 3.5 },
      status: 'normal'
    },
    batteryLevel: 87
  },
  {
    id: 'sensor-002',
    name: 'UPS-1 Temperature',
    equipmentId: 'equip-002',
    equipmentName: 'UPS System 1',
    type: 'temperature',
    location: 'Power Room',
    status: 'online',
    lastReading: {
      id: 'reading-002',
      sensorId: 'sensor-002',
      timestamp: new Date().toISOString(),
      value: 42.5,
      unit: '°C',
      normalRange: { min: 10, max: 40 },
      status: 'warning'
    },
    batteryLevel: 92
  },
  {
    id: 'sensor-003',
    name: 'PDU-1 Power Draw',
    equipmentId: 'equip-003',
    equipmentName: 'PDU Rack A1',
    type: 'power',
    location: 'Server Room 1',
    status: 'online',
    lastReading: {
      id: 'reading-003',
      sensorId: 'sensor-003',
      timestamp: new Date().toISOString(),
      value: 4.8,
      unit: 'kW',
      normalRange: { min: 0, max: 6 },
      status: 'normal'
    },
    batteryLevel: 74
  },
  {
    id: 'sensor-004',
    name: 'CRAC-2 Airflow',
    equipmentId: 'equip-004',
    equipmentName: 'CRAC Unit 2',
    type: 'airflow',
    location: 'Server Room 2',
    status: 'online',
    lastReading: {
      id: 'reading-004',
      sensorId: 'sensor-004',
      timestamp: new Date().toISOString(),
      value: 12.3,
      unit: 'm³/s',
      normalRange: { min: 10, max: 15 },
      status: 'normal'
    },
    batteryLevel: 65
  },
  {
    id: 'sensor-005',
    name: 'Generator-1 Acoustic',
    equipmentId: 'equip-005',
    equipmentName: 'Backup Generator 1',
    type: 'acoustic',
    location: 'External Power Area',
    status: 'online',
    lastReading: {
      id: 'reading-005',
      sensorId: 'sensor-005',
      timestamp: new Date().toISOString(),
      value: 68.7,
      unit: 'dB',
      normalRange: { min: 0, max: 75 },
      status: 'normal'
    },
    batteryLevel: 89
  }
];

// Mock predictive maintenance alerts based on sensor data
export const mockPredictiveMaintenance: PredictiveMaintenance[] = [
  {
    id: 'pred-001',
    equipmentId: 'equip-002',
    equipmentName: 'UPS System 1',
    predictionDate: new Date().toISOString(),
    failureProbability: 78,
    estimatedTimeToFailure: 14,
    affectedComponent: 'Cooling Fan',
    priority: 'high',
    status: 'pending',
    notes: 'Temperature rising consistently over the past 48 hours. Fan vibration pattern indicates potential bearing failure.',
    sensorData: [{
      sensorId: 'sensor-002',
      sensorName: 'UPS-1 Temperature',
      anomalyDetected: true,
      dataPoints: Array(24).fill(0).map((_, i) => {
        const timestamp = new Date(Date.now() - (i * 3600 * 1000)).toISOString();
        const baseValue = 35 + (23 - i) * 0.4;
        const randomVariation = (Math.random() - 0.5) * 1;
        return {
          timestamp,
          value: baseValue + randomVariation,
          predicted: baseValue - 5,
          threshold: 40
        };
      })
    }]
  },
  {
    id: 'pred-002',
    equipmentId: 'equip-001',
    equipmentName: 'Chiller Unit 1',
    predictionDate: new Date().toISOString(),
    failureProbability: 62,
    estimatedTimeToFailure: 30,
    affectedComponent: 'Compressor',
    priority: 'medium',
    status: 'pending',
    notes: 'Vibration patterns indicate early signs of compressor wear. Recommended to schedule maintenance within 30 days.',
    sensorData: [{
      sensorId: 'sensor-001',
      sensorName: 'Chiller-1 Vibration',
      anomalyDetected: true,
      dataPoints: Array(24).fill(0).map((_, i) => {
        const timestamp = new Date(Date.now() - (i * 3600 * 1000)).toISOString();
        const baseValue = 2.2 + (23 - i) * 0.02;
        const randomVariation = (Math.random() - 0.5) * 0.3;
        return {
          timestamp,
          value: baseValue + randomVariation,
          predicted: baseValue - 0.8,
          threshold: 3.5
        };
      })
    }]
  },
  {
    id: 'pred-003',
    equipmentId: 'equip-005',
    equipmentName: 'Backup Generator 1',
    predictionDate: new Date().toISOString(),
    failureProbability: 45,
    estimatedTimeToFailure: 45,
    affectedComponent: 'Fuel System',
    priority: 'medium',
    status: 'scheduled',
    maintenanceWindowStart: new Date(Date.now() + (5 * 24 * 3600 * 1000)).toISOString(),
    maintenanceWindowEnd: new Date(Date.now() + (6 * 24 * 3600 * 1000)).toISOString(),
    assignedTo: 'John Smith',
    notes: 'Scheduled preventive maintenance based on acoustic pattern analysis and fuel pressure sensor readings.',
    sensorData: [{
      sensorId: 'sensor-005',
      sensorName: 'Generator-1 Acoustic',
      anomalyDetected: true,
      dataPoints: Array(24).fill(0).map((_, i) => {
        const timestamp = new Date(Date.now() - (i * 3600 * 1000)).toISOString();
        const baseValue = 65 + (23 - i) * 0.1;
        const randomVariation = (Math.random() - 0.5) * 2;
        return {
          timestamp,
          value: baseValue + randomVariation,
          predicted: baseValue - 5,
          threshold: 75
        };
      })
    }]
  },
  {
    id: 'pred-004',
    equipmentId: 'equip-004',
    equipmentName: 'CRAC Unit 2',
    predictionDate: new Date(Date.now() - (10 * 24 * 3600 * 1000)).toISOString(),
    failureProbability: 85,
    estimatedTimeToFailure: 7,
    affectedComponent: 'Air Filter',
    priority: 'high',
    status: 'completed',
    maintenanceWindowStart: new Date(Date.now() - (7 * 24 * 3600 * 1000)).toISOString(),
    maintenanceWindowEnd: new Date(Date.now() - (6 * 24 * 3600 * 1000)).toISOString(),
    assignedTo: 'Sarah Johnson',
    notes: 'Air filter replaced. Airflow returned to normal levels after maintenance.',
    sensorData: [{
      sensorId: 'sensor-004',
      sensorName: 'CRAC-2 Airflow',
      anomalyDetected: true,
      dataPoints: Array(24).fill(0).map((_, i) => {
        const timestamp = new Date(Date.now() - (10 * 24 * 3600 * 1000) - (i * 3600 * 1000)).toISOString();
        const baseValue = 9 - (23 - i) * 0.02;
        const randomVariation = (Math.random() - 0.5) * 0.5;
        return {
          timestamp,
          value: baseValue + randomVariation,
          predicted: baseValue + 2,
          threshold: 10
        };
      })
    }]
  }
];
