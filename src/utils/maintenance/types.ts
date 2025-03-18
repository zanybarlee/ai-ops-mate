
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

// Kanban Task Types
export type KanbanColumnType = 'backlog' | 'todo' | 'in-progress' | 'completed';

export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  equipmentId?: string;
  equipmentName: string;
  assignedTo?: string;
  dueDate?: string;
  priority: 'high' | 'medium' | 'low';
  status: KanbanColumnType;
  category: string;
}

export interface KanbanColumn {
  id: KanbanColumnType;
  title: string;
  tasks: KanbanTask[];
}

// Thermal Analytics Types
export interface TemperatureData {
  id: string;
  location: string;
  timestamp: string;
  temperature: number;
  humidity: number;
  airflow: number;
}

export interface CoolingSystem {
  id: string;
  name: string;
  status: 'active' | 'standby' | 'maintenance' | 'offline';
  currentLoad: number; // percentage
  energyConsumption: number; // kWh
  efficiency: number; // percentage
  location: string;
}

// Power Management Types
export interface PowerUsageData {
  id: string;
  timestamp: string;
  totalConsumption: number; // kWh
  serverLoad: number; // kWh
  coolingLoad: number; // kWh
  otherLoad: number; // kWh
  pue: number; // Power Usage Effectiveness
}

export interface UpsSystem {
  id: string;
  name: string;
  status: 'active' | 'standby' | 'maintenance' | 'offline';
  currentLoad: number; // percentage
  batteryLevel: number; // percentage
  estimatedRuntime: number; // minutes
  efficiency: number; // percentage
}

export interface PowerSource {
  id: string;
  name: string;
  type: 'grid' | 'generator' | 'solar' | 'battery' | 'fuel-cell';
  status: 'active' | 'standby' | 'offline';
  currentOutput: number; // kW
  capacity: number; // kW
  carbonIntensity: number; // gCO2/kWh
}

export interface PowerOptimizationRecommendation {
  id: string;
  timestamp: string;
  type: 'cooling' | 'load-balancing' | 'battery' | 'scheduling' | 'routing';
  description: string;
  potentialSavings: number; // kWh or percentage
  priority: 'high' | 'medium' | 'low';
  status: 'implemented' | 'pending' | 'rejected';
  implementationDate?: string;
}
