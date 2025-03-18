
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  BrainCircuit,
  Clock,
  Play,
  ArrowRight,
  Settings2,
  Calendar,
  MoreHorizontal,
  Plus
} from 'lucide-react';

// Mock data for automation workflows
const workflowData = [
  {
    id: 'workflow-001',
    name: 'Daily Server Room Inspection',
    description: 'Automated thermal scanning and visual inspection of all server rooms',
    schedule: 'Daily at 6:00 AM',
    lastRun: '2024-04-10T06:00:00',
    status: 'active',
    steps: [
      { id: 'step-1', name: 'Inspect Server Room 1', robotId: 'robot-001', duration: '15 min' },
      { id: 'step-2', name: 'Inspect Server Room 2', robotId: 'robot-001', duration: '15 min' },
      { id: 'step-3', name: 'Upload thermal data', robotId: 'robot-001', duration: '5 min' },
      { id: 'step-4', name: 'Generate inspection report', robotId: 'system', duration: '5 min' }
    ]
  },
  {
    id: 'workflow-002',
    name: 'Weekly Cable Management',
    description: 'Automated cable organization and labeling in rack areas',
    schedule: 'Every Monday at 10:00 AM',
    lastRun: '2024-04-08T10:00:00',
    status: 'active',
    steps: [
      { id: 'step-1', name: 'Scan all rack areas', robotId: 'robot-002', duration: '20 min' },
      { id: 'step-2', name: 'Identify loose cables', robotId: 'robot-002', duration: '10 min' },
      { id: 'step-3', name: 'Organize and route cables', robotId: 'robot-002', duration: '45 min' },
      { id: 'step-4', name: 'Print and apply labels', robotId: 'robot-002', duration: '15 min' }
    ]
  },
  {
    id: 'workflow-003',
    name: 'Bi-Weekly Floor Cleaning',
    description: 'Automated dust removal and static control in server areas',
    schedule: 'Every 2 weeks on Thursday at 11:00 PM',
    lastRun: '2024-04-04T23:00:00',
    status: 'paused',
    steps: [
      { id: 'step-1', name: 'Deploy cleaning robot', robotId: 'robot-003', duration: '5 min' },
      { id: 'step-2', name: 'Clean Server Room 1', robotId: 'robot-003', duration: '30 min' },
      { id: 'step-3', name: 'Clean Server Room 2', robotId: 'robot-003', duration: '30 min' },
      { id: 'step-4', name: 'Apply anti-static treatment', robotId: 'robot-003', duration: '20 min' },
      { id: 'step-5', name: 'Return to charging station', robotId: 'robot-003', duration: '5 min' }
    ]
  },
  {
    id: 'workflow-004',
    name: 'Monthly HVAC Duct Inspection',
    description: 'Comprehensive inspection of cooling system ducts and filters',
    schedule: 'First day of month at 8:00 AM',
    lastRun: '2024-04-01T08:00:00',
    status: 'active',
    steps: [
      { id: 'step-1', name: 'Deploy HVAC robot', robotId: 'robot-005', duration: '5 min' },
      { id: 'step-2', name: 'Inspect main ducts', robotId: 'robot-005', duration: '20 min' },
      { id: 'step-3', name: 'Assess filter conditions', robotId: 'robot-005', duration: '15 min' },
      { id: 'step-4', name: 'Measure airflow at key points', robotId: 'robot-005', duration: '10 min' },
      { id: 'step-5', name: 'Generate maintenance recommendations', robotId: 'system', duration: '5 min' }
    ]
  }
];

const AutomationWorkflows = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<typeof workflowData[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'paused':
        return <Badge className="bg-amber-500">Paused</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const showWorkflowDetails = (workflow: typeof workflowData[0]) => {
    setSelectedWorkflow(workflow);
    setDetailsOpen(true);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Automation Workflows</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workflowData.map((workflow) => (
            <div 
              key={workflow.id} 
              className="border rounded-lg p-4 hover:bg-secondary/50 transition-colors cursor-pointer"
              onClick={() => showWorkflowDetails(workflow)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <BrainCircuit className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">{workflow.name}</h3>
                    <p className="text-sm text-muted-foreground">{workflow.description}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      {getStatusBadge(workflow.status)}
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {workflow.schedule}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedWorkflow && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedWorkflow.name}</DialogTitle>
                  <DialogDescription>
                    {selectedWorkflow.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <div className="mt-1">{getStatusBadge(selectedWorkflow.status)}</div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Schedule</p>
                      <div className="flex items-center mt-1 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {selectedWorkflow.schedule}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Last Execution</p>
                    <p className="text-sm">{new Date(selectedWorkflow.lastRun).toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Workflow Steps</p>
                    <div className="space-y-3">
                      {selectedWorkflow.steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            <span className="text-xs font-medium">{index + 1}</span>
                          </div>
                          <div className="flex-1 border rounded-md p-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-sm">{step.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  Using: {step.robotId === 'system' ? 'System Automation' : step.robotId}
                                </p>
                              </div>
                              <Badge variant="outline">{step.duration}</Badge>
                            </div>
                          </div>
                          {index < selectedWorkflow.steps.length - 1 && (
                            <ArrowRight className="h-4 w-4 mx-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notification" />
                      <label 
                        htmlFor="notification" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Notify me when workflow completes
                      </label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button>
                  {selectedWorkflow.status === 'active' ? (
                    <Button variant="outline">Pause Workflow</Button>
                  ) : (
                    <Button variant="outline">Resume Workflow</Button>
                  )}
                  <Button>
                    <Play className="h-4 w-4 mr-2" />
                    Run Now
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AutomationWorkflows;
