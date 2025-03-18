
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  Check, 
  Zap, 
  Server, 
  Thermometer, 
  BrainCircuit,
  Bot,
  X
} from 'lucide-react';
import { useState } from 'react';

// Mock data for automated rules
const automatedRules = [
  { 
    id: 'rule-1', 
    name: 'VM Consolidation', 
    description: 'Automatically consolidate virtual machines when server utilization drops below threshold',
    trigger: 'Server utilization < 30% for > 1 hour',
    action: 'Migrate VMs and power down idle servers',
    status: 'enabled',
    category: 'power',
    lastTriggered: '15 minutes ago'
  },
  { 
    id: 'rule-2', 
    name: 'Cooling Adjustment', 
    description: 'Dynamically adjust cooling based on thermal analysis and workload distribution',
    trigger: 'Temperature < threshold for > 30 minutes',
    action: 'Reduce cooling power in affected zones',
    status: 'enabled',
    category: 'cooling',
    lastTriggered: '43 minutes ago'
  },
  { 
    id: 'rule-3', 
    name: 'UPS Mode Switching', 
    description: 'Switch UPS operating modes based on load conditions and time of day',
    trigger: 'Off-peak hours AND load < 50%',
    action: 'Switch UPS to eco-mode operation',
    status: 'enabled',
    category: 'power',
    lastTriggered: '2 hours ago'
  },
  { 
    id: 'rule-4', 
    name: 'Server Power Capping', 
    description: 'Apply power caps to servers during peak power demand periods',
    trigger: 'Total power draw > 85% of capacity',
    action: 'Apply graduated power caps to non-critical servers',
    status: 'enabled',
    category: 'power',
    lastTriggered: '1 day ago'
  },
  { 
    id: 'rule-5', 
    name: 'Emergency Cooling Boost', 
    description: 'Temporarily boost cooling capacity if temperatures approach critical thresholds',
    trigger: 'Any zone temperature > critical - 5°C',
    action: 'Increase cooling capacity by 30% in affected zones',
    status: 'enabled',
    category: 'cooling',
    lastTriggered: 'Never'
  },
];

// Mock data for rule execution history
const ruleHistory = [
  {
    id: 'exec-1',
    ruleName: 'VM Consolidation',
    timestamp: '15 minutes ago',
    status: 'success',
    details: 'Consolidated 8 VMs and powered down 2 servers in Rack 13-C',
    energySaved: '1.2 kWh'
  },
  {
    id: 'exec-2',
    ruleName: 'Cooling Adjustment',
    timestamp: '43 minutes ago',
    status: 'success',
    details: 'Reduced cooling power by 22% in zones B2-B4',
    energySaved: '3.5 kWh'
  },
  {
    id: 'exec-3',
    ruleName: 'UPS Mode Switching',
    timestamp: '2 hours ago',
    status: 'success',
    details: 'Switched UPS-3 to eco-mode for off-peak operation',
    energySaved: '0.8 kWh'
  },
  {
    id: 'exec-4',
    ruleName: 'VM Consolidation',
    timestamp: '1 day ago',
    status: 'partial',
    details: 'Consolidated 5 VMs but 2 migrations failed due to compatibility issues',
    energySaved: '0.7 kWh'
  },
  {
    id: 'exec-5',
    ruleName: 'Server Power Capping',
    timestamp: '1 day ago',
    status: 'success',
    details: 'Applied 10% power cap to 12 non-critical servers during peak demand',
    energySaved: '4.2 kWh'
  },
];

const AutomatedActions = () => {
  const [activeTab, setActiveTab] = useState('rules');
  const [rules, setRules] = useState(automatedRules);

  const toggleRuleStatus = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, status: rule.status === 'enabled' ? 'disabled' : 'enabled' } 
        : rule
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500"><Check className="h-3 w-3 mr-1" /> Success</Badge>;
      case 'partial':
        return <Badge className="bg-amber-500"><AlertTriangle className="h-3 w-3 mr-1" /> Partial</Badge>;
      case 'failed':
        return <Badge className="bg-red-500"><X className="h-3 w-3 mr-1" /> Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'power':
        return <Zap className="h-5 w-5 text-amber-500" />;
      case 'cooling':
        return <Thermometer className="h-5 w-5 text-blue-500" />;
      case 'server':
        return <Server className="h-5 w-5 text-purple-500" />;
      default:
        return <Bot className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>AI-Driven Automation</CardTitle>
          <Badge className="bg-primary">15 rules total</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rules">Automation Rules</TabsTrigger>
            <TabsTrigger value="history">Execution History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rules">
            <Alert className="bg-primary/10 border-primary/20 mb-4">
              <BrainCircuit className="h-4 w-4 text-primary" />
              <AlertDescription>
                AI-powered automation rules are continuously optimizing data center operations. The system has saved approximately 145 kWh this week.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              {rules.slice(0, 5).map((rule) => (
                <div key={rule.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getCategoryIcon(rule.category)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{rule.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
                        </div>
                        <Switch 
                          checked={rule.status === 'enabled'} 
                          onCheckedChange={() => toggleRuleStatus(rule.id)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Trigger condition:</p>
                          <p>{rule.trigger}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Automated action:</p>
                          <p>{rule.action}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                        <span>Last triggered: {rule.lastTriggered}</span>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">View Details</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{rule.name}</DialogTitle>
                              <DialogDescription>
                                Automation rule details and configuration options
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <h4 className="font-medium text-sm">Description</h4>
                                <p className="text-sm text-muted-foreground">{rule.description}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium text-sm">Trigger Condition</h4>
                                  <p className="text-sm text-muted-foreground">{rule.trigger}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm">Automated Action</h4>
                                  <p className="text-sm text-muted-foreground">{rule.action}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">AI Learning Status</h4>
                                <p className="text-sm text-muted-foreground">
                                  This rule has executed 23 times and has self-optimized 3 times based on outcome analysis.
                                </p>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Edit Rule</Button>
                              <Button>Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {rules.length > 5 && (
                <Button variant="outline" className="w-full">
                  Show All Rules
                </Button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4">
              {ruleHistory.map((execution) => (
                <div key={execution.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <Server className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">{execution.ruleName}</h4>
                        <p className="text-sm mt-1">{execution.details}</p>
                        <p className="text-xs text-muted-foreground mt-2">{execution.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {getStatusBadge(execution.status)}
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Saved {execution.energySaved}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View Full History
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AutomatedActions;
