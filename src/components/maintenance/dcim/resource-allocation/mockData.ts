
// Mock data for server racks
export const serverRacks = [
  { id: 'rack-1', name: 'Rack 01-A', servers: 42, utilization: 82, status: 'normal', power: 6.8, cooling: 'Optimal' },
  { id: 'rack-2', name: 'Rack 01-B', servers: 42, utilization: 75, status: 'normal', power: 5.9, cooling: 'Optimal' },
  { id: 'rack-3', name: 'Rack 02-A', servers: 42, utilization: 91, status: 'high', power: 7.2, cooling: 'Elevated' },
  { id: 'rack-4', name: 'Rack 02-B', servers: 42, utilization: 68, status: 'normal', power: 5.5, cooling: 'Optimal' },
  { id: 'rack-5', name: 'Rack 03-A', servers: 42, utilization: 79, status: 'normal', power: 6.3, cooling: 'Optimal' },
  { id: 'rack-6', name: 'Rack 03-B', servers: 42, utilization: 86, status: 'normal', power: 6.9, cooling: 'Slightly Elevated' },
  { id: 'rack-7', name: 'Rack 04-A', servers: 42, utilization: 93, status: 'high', power: 7.8, cooling: 'High' },
  { id: 'rack-8', name: 'Rack 04-B', servers: 42, utilization: 55, status: 'low', power: 4.1, cooling: 'Optimal' },
];

// Mock data for server allocation
export const serverAllocation = [
  { id: 'server-1', name: 'App Server 1', rack: 'Rack 01-A', cpu: 78, memory: 82, storage: 65, status: 'normal' },
  { id: 'server-2', name: 'App Server 2', rack: 'Rack 01-A', cpu: 85, memory: 76, storage: 58, status: 'normal' },
  { id: 'server-3', name: 'DB Server 1', rack: 'Rack 02-A', cpu: 92, memory: 88, storage: 75, status: 'high' },
  { id: 'server-4', name: 'Web Server 1', rack: 'Rack 01-B', cpu: 65, memory: 58, storage: 42, status: 'normal' },
  { id: 'server-5', name: 'Web Server 2', rack: 'Rack 01-B', cpu: 72, memory: 68, storage: 45, status: 'normal' },
  { id: 'server-6', name: 'Storage Server 1', rack: 'Rack 03-A', cpu: 45, memory: 52, storage: 92, status: 'normal' },
  { id: 'server-7', name: 'Compute Node 1', rack: 'Rack 04-A', cpu: 95, memory: 91, storage: 48, status: 'high' },
  { id: 'server-8', name: 'Compute Node 2', rack: 'Rack 04-A', cpu: 93, memory: 89, storage: 52, status: 'high' },
];
