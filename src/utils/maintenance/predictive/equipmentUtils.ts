
import { mockIoTSensors, mockPredictiveMaintenance } from './mockData';

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

export const getPredictiveMaintenanceByEquipment = (equipmentId: string) => {
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
