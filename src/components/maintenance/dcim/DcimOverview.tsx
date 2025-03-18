
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Activity,
  AlertCircle,
  Bot,
  BrainCircuit,
  Server,
  Thermometer,
  Zap,
  Bolt,
  Cpu,
  Lock,
  Network,
  RefreshCw
} from 'lucide-react';
import { useState } from 'react';

const DcimOverview = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const startOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
    }, 3000);
  };
  
  return (
    <div className="space-y-6">
      <Alert className="bg-primary/10 border-primary/20">
        <BrainCircuit className="h-4 w-4 text-primary" />
        <AlertTitle>AI System Active</AlertTitle>
        <AlertDescription>
          The AI-powered DCIM system is actively monitoring and optimizing all data center resources. Last autonomous action: VM consolidation on low-usage rack 13-C (15 minutes ago).
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Power Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">92%</span>
              </div>
              <Badge className="bg-green-500">Optimized</Badge>
            </div>
            <Progress value={92} className="h-2 mt-4" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cooling Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold">22.3°C</span>
              </div>
              <Badge className="bg-blue-500">Efficient</Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Cooling power reduced by 17% via AI optimization
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Server Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-amber-500" />
                <span className="text-2xl font-bold">78%</span>
              </div>
              <Badge className="bg-amber-500/10 text-amber-500">Attention</Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              3 racks approaching high utilization threshold
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">Secure</span>
              </div>
              <Badge className="bg-green-500">Protected</Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              All systems operating within security parameters
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">AI-Powered Resource Optimization</h3>
          <Button onClick={startOptimization} disabled={isOptimizing}>
            {isOptimizing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <BrainCircuit className="h-4 w-4 mr-2" />
                Run Optimization
              </>
            )}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Automated Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">VM Consolidation</p>
                    <p className="text-sm text-muted-foreground">
                      Consolidated 8 virtual machines on rack 13-C to optimize resource usage
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start gap-3">
                  <Thermometer className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Cooling Adjustment</p>
                    <p className="text-sm text-muted-foreground">
                      Reduced cooling power in zones B2-B4 based on thermal analysis
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">43 minutes ago</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start gap-3">
                  <Bolt className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">UPS Mode Switch</p>
                    <p className="text-sm text-muted-foreground">
                      Switched UPS-3 to eco-mode during off-peak hours to save energy
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>System Health Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-primary" />
                    <span className="text-sm">Server Infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">98%</span>
                    <Progress value={98} className="w-24 h-2" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Power Systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">92%</span>
                    <Progress value={92} className="w-24 h-2" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Cooling Infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">95%</span>
                    <Progress value={95} className="w-24 h-2" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Network className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Network Performance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">97%</span>
                    <Progress value={97} className="w-24 h-2" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Security Systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">100%</span>
                    <Progress value={100} className="w-24 h-2" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Active Alerts</span>
                  </div>
                  <Badge>3</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <span className="text-sm">Automated Remediations</span>
                  </div>
                  <Badge>12 today</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DcimOverview;
