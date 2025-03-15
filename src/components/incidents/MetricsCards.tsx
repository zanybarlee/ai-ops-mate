
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export const MetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold">7</div>
              <div className="flex items-center text-xs mt-1">
                <ArrowUpRight className="mr-1 text-destructive" size={12} />
                <span className="text-destructive font-medium">+2</span>
                <span className="text-muted-foreground ml-1">from yesterday</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle size={20} className="text-destructive" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Resolved Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold">12</div>
              <div className="flex items-center text-xs mt-1">
                <ArrowDownRight className="mr-1 text-green-500" size={12} />
                <span className="text-green-500 font-medium">95%</span>
                <span className="text-muted-foreground ml-1">resolution rate</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle size={20} className="text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold">98.7%</div>
              <div className="flex items-center text-xs mt-1">
                <ArrowUpRight className="mr-1 text-green-500" size={12} />
                <span className="text-green-500 font-medium">+0.3%</span>
                <span className="text-muted-foreground ml-1">from last week</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Activity size={20} className="text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
