
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KnowledgeBase from '@/components/KnowledgeBase';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

const Knowledge = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isAuthenticated, user } = useAuth();
  
  // Check if user has access to the knowledge base
  // Only admin, engineer, and support roles have access
  const hasAccess = isAuthenticated && user && ['admin', 'engineer', 'support'].includes(user.role);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        {!isAuthenticated ? (
          <div className="p-8 text-center">
            <Alert className="max-w-xl mx-auto">
              <Shield className="h-5 w-5 text-primary" />
              <AlertTitle>Authentication Required</AlertTitle>
              <AlertDescription>
                Please sign in to access the knowledge base.
              </AlertDescription>
            </Alert>
          </div>
        ) : !hasAccess ? (
          <div className="p-8 text-center">
            <Alert variant="destructive" className="max-w-xl mx-auto">
              <Shield className="h-5 w-5" />
              <AlertTitle>Access Restricted</AlertTitle>
              <AlertDescription>
                Your role ({user?.role}) does not have permission to access the knowledge base.
                Only admin, engineer, and support roles can access this section.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <KnowledgeBase />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Knowledge;
