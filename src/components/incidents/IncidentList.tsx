
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { incidents } from './ChartUtils';
import { ChevronRight, Thermometer, Activity, Database, Cpu, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const IncidentList = () => {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Active Incidents</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div key={incident.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors duration-200">
              <div className="flex items-center">
                <div 
                  className={cn(
                    "w-2 h-12 rounded-full mr-4",
                    incident.severity === 'high' ? "bg-destructive" :
                    incident.severity === 'medium' ? "bg-amber-500" :
                    "bg-green-500"
                  )}
                />
                <div>
                  <div className="flex items-center">
                    <span 
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full mr-2",
                        incident.status === 'active' ? "bg-destructive/10 text-destructive" :
                        incident.status === 'investigating' ? "bg-amber-500/10 text-amber-500" :
                        incident.status === 'monitoring' ? "bg-blue-500/10 text-blue-500" :
                        "bg-green-500/10 text-green-500"
                      )}
                    >
                      {incident.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{incident.time}</span>
                  </div>
                  <h4 className="font-medium mt-1">{incident.title}</h4>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span className="mr-2">ID: {incident.id}</span>
                    {incident.status !== 'resolved' && (
                      <div className="flex items-center text-amber-500">
                        <AlertTriangle size={12} className="mr-1" />
                        {incident.prediction}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="hidden md:flex items-center mr-4">
                  {incident.severity === 'high' && <Thermometer size={16} className="text-destructive mr-2" />}
                  {incident.title.includes('Network') && <Activity size={16} className="text-amber-500 mr-2" />}
                  {incident.title.includes('Database') && <Database size={16} className="text-blue-500 mr-2" />}
                  {incident.title.includes('Power') && <Cpu size={16} className="text-green-500 mr-2" />}
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
