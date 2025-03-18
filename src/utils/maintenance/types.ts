
// Define all the shared types for maintenance functionality

// Common types
export type MaintenanceStatus = 'scheduled' | 'completed' | 'in-progress' | 'unscheduled';

export interface MaintenanceSlot {
  date: string;
  status: MaintenanceStatus;
  label: string;
  assignedTo?: string;
  notes?: string;
}

export interface MaintenanceRow {
  id: string;
  name: string;
  type: 'equipment' | 'personnel';
  category?: string;
  priority?: 'high' | 'medium' | 'low';
  schedule: MaintenanceSlot[];
}

// Personnel Management Types
export interface PersonnelData {
  id: string;
  name: string;
  role: string;
  department: string;
  skills: string[];
  availability: boolean[];  // 7 days of the week
  contactInfo: string;
}

// Equipment Management Types
export interface EquipmentData {
  id: string;
  name: string;
  category: string;
  status: 'operational' | 'maintenance-required' | 'out-of-service';
  priority: 'high' | 'medium' | 'low';
  lastMaintenance: string;
  nextMaintenance: string;
  maintenanceCycle: number; // in days
  location: string;
}

// Maintenance History Types
export interface MaintenanceHistoryData {
  id: string;
  referenceId: string;
  equipment: string;
  maintenanceType: string;
  assignedTo: string;
  date: string;
  status: 'completed' | 'in-progress' | 'scheduled' | 'cancelled';
  notes?: string;
  duration?: string;
}
