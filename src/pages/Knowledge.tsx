
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KnowledgeBase from '@/components/KnowledgeBase';

const Knowledge = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        <KnowledgeBase />
      </main>
      
      <Footer />
    </div>
  );
};

export default Knowledge;
