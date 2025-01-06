import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import About from "./pages/About";
import TermsAgreementPage from "./components/onboarding/TermsAgreementPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error checking session:", error);
          setIsAuthenticated(false);
          return;
        }
        setIsAuthenticated(!!session);

        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('terms_agreed')
            .eq('id', session.user.id)
            .single();
          
          setHasAgreedToTerms(profile?.terms_agreed || false);
        }
      } catch (error) {
        console.error("Error in session check:", error);
        setIsAuthenticated(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, !!session);
      
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setHasAgreedToTerms(null);
        queryClient.clear();
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setIsAuthenticated(true);
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('terms_agreed')
            .eq('id', session.user.id)
            .single();
          
          setHasAgreedToTerms(profile?.terms_agreed || false);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated 
        ? (hasAgreedToTerms ? <Index /> : <Navigate to="/terms-agreement" />)
        : <Index />,
    },
    {
      path: "/register",
      element: isAuthenticated ? <Navigate to="/terms-agreement" /> : <Register />,
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/terms-agreement",
      element: isAuthenticated ? (!hasAgreedToTerms ? <TermsAgreementPage /> : <Navigate to="/" />) : <Navigate to="/login" />,
    },
    {
      path: "/profile",
      element: isAuthenticated ? (hasAgreedToTerms ? <Profile /> : <Navigate to="/terms-agreement" />) : <Navigate to="/login" />,
    },
    {
      path: "/about",
      element: isAuthenticated ? (hasAgreedToTerms ? <About /> : <Navigate to="/terms-agreement" />) : <Navigate to="/login" />,
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;