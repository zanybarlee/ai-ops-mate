
import { PredictiveMaintenance } from '../types';
import { mockPredictiveMaintenance } from './mockData';
import { getTotalEquipmentCount } from './equipmentUtils';
import { fetchIoTSensors } from './iotSensors';

export const fetchPredictiveMaintenanceAlerts = (): PredictiveMaintenance[] => {
  return mockPredictiveMaintenance;
};

export const getPredictiveMaintenanceMetrics = (): {
  pendingAlerts: number;
  highPriorityAlerts: number;
  scheduledMaintenance: number;
  averageTimeToFailure: number;
  equipmentCount: number;
  sensorCount: number;
} => {
  const alerts = mockPredictiveMaintenance;
  const pendingAlerts = alerts.filter(alert => alert.status === 'pending').length;
  const highPriorityAlerts = alerts.filter(alert => alert.priority === 'high').length;
  const scheduledMaintenance = alerts.filter(alert => alert.status === 'scheduled').length;
  
  // Calculate average time to failure for pending and scheduled alerts
  const relevantAlerts = alerts.filter(alert => ['pending', 'scheduled'].includes(alert.status));
  const totalDays = relevantAlerts.reduce((sum, alert) => sum + alert.estimatedTimeToFailure, 0);
  const averageTimeToFailure = relevantAlerts.length > 0 ? Math.round(totalDays / relevantAlerts.length) : 0;
  
  const equipmentCount = getTotalEquipmentCount();
  const sensorCount = fetchIoTSensors().length;
  
  return {
    pendingAlerts,
    highPriorityAlerts,
    scheduledMaintenance,
    averageTimeToFailure,
    equipmentCount,
    sensorCount
  };
};
