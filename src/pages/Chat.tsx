
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/ChatInterface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Lightbulb, FileText } from 'lucide-react';

const Chat = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const suggestedPrompts = [
    "Analyze the temperature increase in Rack B3 over the last 24 hours",
    "What could cause unexpected network latency spikes in the primary cluster?",
    "Generate a troubleshooting checklist for power distribution unit failures",
    "Compare current server performance with last month's baseline metrics",
    "What are the warning signs of cooling system failure based on historical incidents?"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-medium mb-2">AI Operations Assistant</h1>
          <p className="text-muted-foreground">
            Get intelligent support for data center operations and technical issues
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>
          
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Lightbulb size={18} className="mr-2 text-primary" />
                  Suggested Prompts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <div 
                      key={index}
                      className="p-2 text-sm hover:bg-secondary/50 rounded cursor-pointer transition-colors"
                    >
                      {prompt}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Bot size={18} className="mr-2 text-primary" />
                  Assistant Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="incidents">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="incidents">Incidents</TabsTrigger>
                    <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="incidents" className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 shrink-0">
                        <span className="text-primary text-xs">1</span>
                      </div>
                      <p className="text-sm">Analyze error logs and alerts to identify root causes</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 shrink-0">
                        <span className="text-primary text-xs">2</span>
                      </div>
                      <p className="text-sm">Provide step-by-step troubleshooting guidance</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 shrink-0">
                        <span className="text-primary text-xs">3</span>
                      </div>
                      <p className="text-sm">Escalate critical issues to human support when needed</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="knowledge" className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 shrink-0">
                        <span className="text-primary text-xs">1</span>
                      </div>
                      <p className="text-sm">Access the knowledge base for technical documentation</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 shrink-0">
                        <span className="text-primary text-xs">2</span>
                      </div>
                      <p className="text-sm">Receive contextual recommendations based on historical data</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 shrink-0">
                        <span className="text-primary text-xs">3</span>
                      </div>
                      <p className="text-sm">Update documentation based on new incident resolutions</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="analytics" className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 shrink-0">
                        <span className="text-primary text-xs">1</span>
                      </div>
                      <p className="text-sm">Analyze performance trends and identify anomalies</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 shrink-0">
                        <span className="text-primary text-xs">2</span>
                      </div>
                      <p className="text-sm">Generate predictive maintenance recommendations</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 shrink-0">
                        <span className="text-primary text-xs">3</span>
                      </div>
                      <p className="text-sm">Create customized reports on system health and efficiency</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <FileText size={18} className="mr-2 text-primary" />
                  Recent Conversations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {[
                    { title: "Server Cooling System Analysis", time: "2 hours ago" },
                    { title: "Network Performance Troubleshooting", time: "Yesterday" },
                    { title: "Power Distribution Unit Maintenance", time: "2 days ago" }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="p-2 hover:bg-secondary/50 rounded cursor-pointer transition-colors"
                    >
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
