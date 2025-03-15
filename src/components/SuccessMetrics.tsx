
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, ThumbsUp, Database, BarChart, AlertTriangle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const SuccessMetrics = () => {
  // Mock data for the metrics
  const metrics = [
    {
      title: "Incident Resolution Time",
      description: "Reduction compared to manual processes",
      value: 32,
      target: 30,
      icon: <Clock className="h-4 w-4" />,
      status: "success",
    },
    {
      title: "User Satisfaction",
      description: "From tech support staff surveys",
      value: 89,
      target: 85,
      icon: <ThumbsUp className="h-4 w-4" />,
      status: "success",
    },
    {
      title: "Knowledge Base Accuracy",
      description: "Successful resolutions from RAG recommendations",
      value: 92,
      target: 90,
      icon: <Database className="h-4 w-4" />,
      status: "success",
    },
    {
      title: "System Uptime",
      description: "Critical modules availability",
      value: 99.94,
      target: 99.9,
      icon: <BarChart className="h-4 w-4" />,
      status: "success",
    }
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-medium">KPI & Success Metrics</h2>
        <p className="text-muted-foreground">Project performance against target goals</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="glass-card overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  {metric.icon}
                  <span className="ml-2">{metric.title}</span>
                </CardTitle>
                <div className={cn(
                  "flex items-center text-xs rounded-full px-2 py-1",
                  metric.status === "success" ? "bg-green-100 text-green-800" : 
                  metric.status === "warning" ? "bg-yellow-100 text-yellow-800" : 
                  "bg-red-100 text-red-800"
                )}>
                  {metric.status === "success" ? <TrendingUp className="h-3 w-3 mr-1" /> : <AlertTriangle className="h-3 w-3 mr-1" />}
                  {metric.status === "success" ? "On Target" : "Needs Attention"}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-3xl font-bold">
                      {metric.value}
                      {metric.title.includes("Time") ? "%" : 
                       metric.title.includes("Satisfaction") ? "%" : 
                       metric.title.includes("Accuracy") ? "%" : "%"}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{metric.description}</div>
                  </div>
                  <div className="text-sm">
                    Target: <span className="font-medium">{metric.target}%</span>
                  </div>
                </div>
                
                <Progress 
                  value={metric.title.includes("Uptime") ? (metric.value - 99) * 100 : metric.value} 
                  className="h-2" 
                />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>{metric.title.includes("Uptime") ? "99.9%" : "100%"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SuccessMetrics;
