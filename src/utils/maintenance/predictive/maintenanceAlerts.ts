
import { PredictiveMaintenance } from '../types';
import { mockPredictiveMaintenance } from './mockData';

export const fetchPredictiveMaintenanceAlerts = (): PredictiveMaintenance[] => {
  return mockPredictiveMaintenance;
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
