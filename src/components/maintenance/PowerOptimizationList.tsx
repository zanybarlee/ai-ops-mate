
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  X,
  ThumbsUp,
  Filter,
  Zap,
  Snowflake,
  Battery,
  Calendar,
  CornerDownRight 
} from 'lucide-react';
import { fetchPowerOptimizationRecommendations } from '@/utils/maintenance';
import { useToast } from '@/components/ui/use-toast';

const PowerOptimizationList = () => {
  const recommendations = fetchPowerOptimizationRecommendations();
  const { toast } = useToast();
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cooling':
        return <Snowflake className="h-4 w-4" />;
      case 'load-balancing':
        return <Zap className="h-4 w-4" />;
      case 'battery':
        return <Battery className="h-4 w-4" />;
      case 'scheduling':
        return <Calendar className="h-4 w-4" />;
      case 'routing':
        return <CornerDownRight className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      default:
        return '';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'implemented':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'rejected':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const handleAccept = (id: string) => {
    toast({
      title: "Optimization Accepted",
      description: "The recommendation will be implemented automatically.",
    });
  };
  
  const handleReject = (id: string) => {
    toast({
      title: "Optimization Rejected",
      description: "The recommendation has been rejected.",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {recommendations.length} AI-generated optimization recommendations
        </div>
        <Button size="sm" variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      
      <div className="space-y-4">
        {recommendations.map(recommendation => (
          <Card key={recommendation.id} className="glass-card overflow-hidden">
            <div className="flex border-l-4 border-primary">
              <div className="py-4 px-6 flex-grow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(recommendation.type)}
                    <h3 className="font-medium text-primary">{recommendation.type.replace('-', ' ').charAt(0).toUpperCase() + recommendation.type.replace('-', ' ').slice(1)}</h3>
                    <Badge className={getPriorityColor(recommendation.priority)}>
                      {recommendation.priority}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {recommendation.potentialSavings}% savings
                  </Badge>
                </div>
                
                <p className="mt-2">{recommendation.description}</p>
                
                <div className="flex items-center mt-3 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Generated: {new Date(recommendation.timestamp).toLocaleString()}</span>
                  {recommendation.implementationDate && (
                    <>
                      <span className="mx-2">•</span>
                      <span>Implemented: {new Date(recommendation.implementationDate).toLocaleString()}</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center px-6 border-l bg-muted/20">
                {recommendation.status === 'pending' ? (
                  <div className="flex flex-col gap-2">
                    <Button 
                      onClick={() => handleAccept(recommendation.id)}
                      size="sm" 
                      className="w-24"
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                    <Button 
                      onClick={() => handleReject(recommendation.id)}
                      variant="outline" 
                      size="sm" 
                      className="w-24"
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    {getStatusIcon(recommendation.status)}
                    <span className="text-sm capitalize">{recommendation.status}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PowerOptimizationList;
