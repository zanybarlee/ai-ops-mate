
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Knowledge from "./pages/Knowledge";
import MaintenanceScheduling from "./pages/MaintenanceScheduling";
import EnergyManagement from "./pages/EnergyManagement";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { FloatingChatProvider } from "./contexts/FloatingChatContext";
import { FloatingChat } from "./components/floating-chat/FloatingChatbot";
import { VoiceBot } from "./components/voice-bot/VoiceBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <FloatingChatProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/maintenance" element={<MaintenanceScheduling />} />
              <Route path="/energy" element={<EnergyManagement />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingChat />
            <VoiceBot />
          </BrowserRouter>
        </FloatingChatProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
