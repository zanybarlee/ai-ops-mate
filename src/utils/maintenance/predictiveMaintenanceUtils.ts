
import {
  IoTSensor,
  SensorReading,
  PredictiveMaintenance,
  EquipmentData
} from './types';

// Mock IoT sensors data
const mockIoTSensors: IoTSensor[] = [
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

// Mock sensor readings history
const generateSensorReadings = (sensorId: string, baseValue: number, unit: string, range: {min: number, max: number}): SensorReading[] => {
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

// Mock predictive maintenance alerts based on sensor data
const mockPredictiveMaintenance: PredictiveMaintenance[] = [
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

// Utility functions to fetch and manage predictive maintenance data
export const fetchIoTSensors = (): IoTSensor[] => {
  return mockIoTSensors;
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

export const fetchPredictiveMaintenanceAlerts = (): PredictiveMaintenance[] => {
  return mockPredictiveMaintenance;
};

export const getSensorStatusCounts = (): { normal: number; warning: number; critical: number } => {
  const statusCounts = { normal: 0, warning: 0, critical: 0 };
  mockIoTSensors.forEach(sensor => {
    statusCounts[sensor.lastReading.status]++;
  });
  return statusCounts;
};

export const getTotalEquipmentCount = (): number => {
  // Get unique equipment IDs from sensors
  const equipmentIds = new Set(mockIoTSensors.map(sensor => sensor.equipmentId));
  return equipmentIds.size;
};

export const getEquipmentWithSensors = (): { id: string; name: string; sensorCount: number }[] => {
  const equipmentMap = new Map<string, { id: string; name: string; sensorCount: number }>();
  
  mockIoTSensors.forEach(sensor => {
    if (!equipmentMap.has(sensor.equipmentId)) {
      equipmentMap.set(sensor.equipmentId, {
        id: sensor.equipmentId,
        name: sensor.equipmentName,
        sensorCount: 1
      });
    } else {
      const equipment = equipmentMap.get(sensor.equipmentId);
      if (equipment) {
        equipment.sensorCount++;
        equipmentMap.set(sensor.equipmentId, equipment);
      }
    }
  });
  
  return Array.from(equipmentMap.values());
};

export const getPredictiveMaintenanceMetrics = (): {
  pendingAlerts: number;
  highPriorityAlerts: number;
  scheduledMaintenance: number;
  averageTimeToFailure: number;
} => {
  const alerts = mockPredictiveMaintenance;
  const pendingAlerts = alerts.filter(alert => alert.status === 'pending').length;
  const highPriorityAlerts = alerts.filter(alert => alert.priority === 'high').length;
  const scheduledMaintenance = alerts.filter(alert => alert.status === 'scheduled').length;
  
  // Calculate average time to failure for pending and scheduled alerts
  const relevantAlerts = alerts.filter(alert => ['pending', 'scheduled'].includes(alert.status));
  const totalDays = relevantAlerts.reduce((sum, alert) => sum + alert.estimatedTimeToFailure, 0);
  const averageTimeToFailure = relevantAlerts.length > 0 ? Math.round(totalDays / relevantAlerts.length) : 0;
  
  return {
    pendingAlerts,
    highPriorityAlerts,
    scheduledMaintenance,
    averageTimeToFailure
  };
};

// Update maintenance module index to export the new utility functions
export const getPredictiveMaintenanceByEquipment = (equipmentId: string): PredictiveMaintenance | undefined => {
  return mockPredictiveMaintenance.find(pm => pm.equipmentId === equipmentId);
};

// Calculate risk score for each piece of equipment
export const calculateEquipmentRiskScore = (equipmentId: string): number => {
  const prediction = mockPredictiveMaintenance.find(pm => pm.equipmentId === equipmentId);
  if (!prediction) return 0;
  
  // Calculate risk score based on failure probability and time to failure
  // Higher probability and shorter time to failure means higher risk
  const probabilityFactor = prediction.failureProbability / 100;
  const timeFactor = 1 - (Math.min(prediction.estimatedTimeToFailure, 90) / 90);
  
  // Combine factors with weights
  const riskScore = (probabilityFactor * 0.7 + timeFactor * 0.3) * 100;
  return Math.round(riskScore);
};

// Get health index for equipment - the inverse of risk score
export const getEquipmentHealthIndex = (equipmentId: string): number => {
  const riskScore = calculateEquipmentRiskScore(equipmentId);
  return Math.max(0, 100 - riskScore);
};

