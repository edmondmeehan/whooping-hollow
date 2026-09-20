
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Guide from "./pages/Guide";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Properties from "./pages/Properties";
import BookDirect from "./pages/BookDirect";
import ForgotPassword from "./components/admin/ForgotPassword";
import ResetPassword from "./components/admin/ResetPassword";
import LocalArea from "./pages/LocalArea";
import Availability from "./pages/Availability";
import Review from "./pages/Review";
import React from "react";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/forgot-password" element={<ForgotPassword />} />
              <Route path="/admin/reset-password" element={<ResetPassword />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/book-direct" element={<BookDirect />} />
              <Route path="/local-area" element={<LocalArea />} />
              <Route path="/availability" element={<Availability />} />
              <Route path="/review/:token" element={<Review />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
