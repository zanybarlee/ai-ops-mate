
import { 
  TemperatureData, 
  CoolingSystem, 
  PowerUsageData, 
  UpsSystem, 
  PowerSource,
  PowerOptimizationRecommendation 
} from './types';

// Mock data for thermal analytics
export const fetchTemperatureData = (): TemperatureData[] => {
  return [
    {
      id: 't1',
      location: 'Server Room 1',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      temperature: 23.5,
      humidity: 45,
      airflow: 85
    },
    {
      id: 't2',
      location: 'Server Room 1',
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      temperature: 24.1,
      humidity: 46,
      airflow: 83
    },
    {
      id: 't3',
      location: 'Server Room 1',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      temperature: 24.8,
      humidity: 47,
      airflow: 80
    },
    {
      id: 't4',
      location: 'Server Room 2',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      temperature: 22.3,
      humidity: 42,
      airflow: 88
    },
    {
      id: 't5',
      location: 'Data Center A',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      temperature: 21.5,
      humidity: 40,
      airflow: 90
    }
  ];
};

// Mock data for cooling systems
export const fetchCoolingSystems = (): CoolingSystem[] => {
  return [
    {
      id: 'c1',
      name: 'CRAC Unit 1',
      status: 'active',
      currentLoad: 65,
      energyConsumption: 45.2,
      efficiency: 78,
      location: 'Server Room 1'
    },
    {
      id: 'c2',
      name: 'CRAC Unit 2',
      status: 'standby',
      currentLoad: 20,
      energyConsumption: 15.7,
      efficiency: 85,
      location: 'Server Room 1'
    },
    {
      id: 'c3',
      name: 'CRAC Unit 3',
      status: 'active',
      currentLoad: 70,
      energyConsumption: 48.5,
      efficiency: 76,
      location: 'Server Room 2'
    },
    {
      id: 'c4',
      name: 'Chiller System A',
      status: 'active',
      currentLoad: 60,
      energyConsumption: 120.3,
      efficiency: 82,
      location: 'Data Center A'
    }
  ];
};

// Mock data for power usage
export const fetchPowerUsageData = (): PowerUsageData[] => {
  const hourlyData = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000)).toISOString();
    // Generate varying but realistic data
    const totalConsumption = 400 + Math.sin(i * 0.5) * 100;
    const serverLoad = totalConsumption * (0.6 + Math.random() * 0.1);
    const coolingLoad = totalConsumption * (0.3 + Math.random() * 0.05);
    const otherLoad = totalConsumption - serverLoad - coolingLoad;
    const pue = 1 + (coolingLoad + otherLoad) / serverLoad;
    
    hourlyData.push({
      id: `pu${i}`,
      timestamp,
      totalConsumption,
      serverLoad,
      coolingLoad,
      otherLoad,
      pue: parseFloat(pue.toFixed(2))
    });
  }
  
  return hourlyData.reverse();
};

// Mock data for UPS systems
export const fetchUpsSystems = (): UpsSystem[] => {
  return [
    {
      id: 'ups1',
      name: 'UPS System 1',
      status: 'active',
      currentLoad: 55,
      batteryLevel: 95,
      estimatedRuntime: 120,
      efficiency: 92
    },
    {
      id: 'ups2',
      name: 'UPS System 2',
      status: 'active',
      currentLoad: 48,
      batteryLevel: 97,
      estimatedRuntime: 125,
      efficiency: 94
    },
    {
      id: 'ups3',
      name: 'UPS System 3',
      status: 'standby',
      currentLoad: 10,
      batteryLevel: 100,
      estimatedRuntime: 180,
      efficiency: 96
    }
  ];
};

// Mock data for power sources
export const fetchPowerSources = (): PowerSource[] => {
  return [
    {
      id: 'ps1',
      name: 'Main Grid Supply',
      type: 'grid',
      status: 'active',
      currentOutput: 450,
      capacity: 800,
      carbonIntensity: 250
    },
    {
      id: 'ps2',
      name: 'Backup Generator',
      type: 'generator',
      status: 'standby',
      currentOutput: 0,
      capacity: 600,
      carbonIntensity: 500
    },
    {
      id: 'ps3',
      name: 'Solar Array',
      type: 'solar',
      status: 'active',
      currentOutput: 75,
      capacity: 150,
      carbonIntensity: 0
    },
    {
      id: 'ps4',
      name: 'Battery Storage',
      type: 'battery',
      status: 'active',
      currentOutput: 25,
      capacity: 200,
      carbonIntensity: 0
    }
  ];
};

// Mock data for power optimization recommendations
export const fetchPowerOptimizationRecommendations = (): PowerOptimizationRecommendation[] => {
  return [
    {
      id: 'por1',
      timestamp: new Date().toISOString(),
      type: 'cooling',
      description: 'Increase cold aisle temperature by 2°C to reduce cooling energy consumption',
      potentialSavings: 15, // percentage
      priority: 'high',
      status: 'pending'
    },
    {
      id: 'por2',
      timestamp: new Date().toISOString(),
      type: 'load-balancing',
      description: 'Redistribute workloads to utilize servers more efficiently',
      potentialSavings: 8, // percentage
      priority: 'medium',
      status: 'implemented',
      implementationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
    },
    {
      id: 'por3',
      timestamp: new Date().toISOString(),
      type: 'battery',
      description: 'Charge battery storage during off-peak hours for peak shaving',
      potentialSavings: 12, // percentage
      priority: 'medium',
      status: 'pending'
    },
    {
      id: 'por4',
      timestamp: new Date().toISOString(),
      type: 'scheduling',
      description: 'Schedule batch processing jobs during solar generation peak',
      potentialSavings: 10, // percentage
      priority: 'low',
      status: 'pending'
    },
    {
      id: 'por5',
      timestamp: new Date().toISOString(),
      type: 'routing',
      description: 'Cap power to non-critical systems during predicted grid strain',
      potentialSavings: 20, // percentage
      priority: 'high',
      status: 'rejected'
    }
  ];
};

// Calculate PUE improvement over time
export const calculatePueImprovement = (): { date: string; pue: number }[] => {
  const data = [];
  const now = new Date();
  const startPue = 1.8; // Starting PUE
  const targetPue = 1.2; // Target PUE
  
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
    // Calculate improvement over time (non-linear)
    const progress = Math.pow(i / 11, 0.6); // Non-linear improvement curve
    const pue = startPue - progress * (startPue - targetPue);
    
    data.push({
      date: date.toISOString().slice(0, 7), // YYYY-MM format
      pue: parseFloat(pue.toFixed(2))
    });
  }
  
  return data;
};

// Calculate energy savings
export const calculateEnergySavings = (): { category: string; value: number }[] => {
  return [
    { category: 'Optimized Cooling', value: 35 },
    { category: 'Load Balancing', value: 15 },
    { category: 'Smart Scheduling', value: 12 },
    { category: 'Battery Management', value: 18 },
    { category: 'Power Routing', value: 10 }
  ];
};
