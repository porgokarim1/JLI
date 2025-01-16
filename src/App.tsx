import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Lessons from "./pages/Lessons";
import BottomNav from "./components/navigation/BottomNav";
import AIChat from "./pages/AIChat";
import LessonView from "./pages/LessonView";
import InstructorRedirect from "./pages/InstructorRedirect";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppLayout = ({ isAuthenticated, userRole }: { isAuthenticated: boolean; userRole: string | null }) => {
  return (
    <div className="pb-16 md:pb-0">
      <Outlet />
      {isAuthenticated && userRole !== 'instructor' && <BottomNav />}
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session error:", error);
          setIsAuthenticated(false);
          if (error.message.includes("refresh_token_not_found")) {
            await supabase.auth.signOut();
            toast.error("Your session has expired. Please sign in again.");
          }
          return;
        }

        setIsAuthenticated(!!session);

        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          setUserRole(profile?.role || null);
        }
      } catch (error) {
        console.error("Error in session check:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, !!session);
      
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        queryClient.clear();
      }

      switch (event) {
        case 'SIGNED_OUT':
          setIsAuthenticated(false);
          setUserRole(null);
          break;
        case 'SIGNED_IN':
          setIsAuthenticated(true);
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();
            setUserRole(profile?.role || null);
          }
          break;
        case 'TOKEN_REFRESHED':
          setIsAuthenticated(!!session);
          break;
        case 'USER_UPDATED':
          setIsAuthenticated(!!session);
          break;
        default:
          break;
      }

      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      element: <AppLayout isAuthenticated={isAuthenticated || false} userRole={userRole} />,
      children: [
        {
          path: "/",
          element: isAuthenticated && userRole === 'instructor' 
            ? <InstructorRedirect />
            : <Index />,
        },
        {
          path: "/register",
          element: isAuthenticated ? <Navigate to="/" /> : <Register />,
        },
        {
          path: "/login",
          element: isAuthenticated ? <Navigate to="/" /> : <Login />,
        },
        {
          path: "/profile",
          element: !isAuthenticated ? <Navigate to="/login" /> : 
            userRole === 'instructor' ? <InstructorRedirect /> : <Profile />,
        },
        {
          path: "/about",
          element: !isAuthenticated ? <Navigate to="/login" /> : 
            userRole === 'instructor' ? <InstructorRedirect /> : <About />,
        },
        {
          path: "/lessons",
          element: !isAuthenticated ? <Navigate to="/login" /> : 
            userRole === 'instructor' ? <InstructorRedirect /> : <Lessons />,
        },
        {
          path: "/ai-chat",
          element: !isAuthenticated ? <Navigate to="/login" /> : 
            userRole === 'instructor' ? <InstructorRedirect /> : <AIChat />,
        },
        {
          path: "/lessons/:id",
          element: !isAuthenticated ? <Navigate to="/login" /> : 
            userRole === 'instructor' ? <InstructorRedirect /> : <LessonView />,
        }
      ]
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