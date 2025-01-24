import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useNavigate } from "react-router-dom";
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
import ResetPassword from "./pages/ResetPassword";
import { SessionProvider, useSession } from "./contexts/SessionContext";
import StudentDashboard from "./components/dashboard/StudentDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppLayout = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <div className="pb-16 md:pb-0">
      <Outlet />
      {isAuthenticated && <BottomNav />}
    </div>
  );
};

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { session, loading } = useSession();
  const [teacherValidated, setTeacherValidated] = useState(false);
  const [validatingTeacher, setValidatingTeacher] = useState(false);

  useEffect(() => {
    if (!loading && !session) {
      console.log("Loading value " + loading + " session: " + session);
      navigate('/login');
      return;
    }

    if(!teacherValidated)
    {
      setValidatingTeacher(true);

      const checkTeacherRole = async () => {
        
        if (!session?.user?.id) 
          {
              return;
          }
        
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
  
          if (!profileError && profile && profile.role === 'student') {
            setTeacherValidated(true);
            setValidatingTeacher(false);
          } else {
            // If not an instructor, sign them out
            setTeacherValidated(false);
            setValidatingTeacher(false);
          }
        } catch (error) {
          console.error('Error checking teacher role:', error);
          setValidatingTeacher(false);
        }
      };
      
      checkTeacherRole();
    }

  }, [session, loading, navigate]);

  return session && teacherValidated ? (
    <>
      {children}
    </>
  ) : validatingTeacher ? null : (
      <div>
        <h1>Not Authorized</h1>
        <button onClick={() => supabase.auth.signOut().then(() => navigate('/login'))}>
          Logout
        </button>
      </div>
    );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        // Clear any cached data
        queryClient.clear();
      }

      switch (event) {
        case 'SIGNED_OUT':
          setIsAuthenticated(false);
          break;
        case 'SIGNED_IN':
          setIsAuthenticated(true);
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
      element: <AppLayout isAuthenticated={isAuthenticated || false} />,
      children: [
        {
          path: "/",
          element: isAuthenticated ? <AuthenticatedRoute><StudentDashboard /> </AuthenticatedRoute>: <Index />,
        },
        {
          path: "/reset-password",
          element: <ResetPassword />,
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
          element: !isAuthenticated ? <Navigate to="/login" /> : <AuthenticatedRoute><Profile /></AuthenticatedRoute>,
        },
        {
          path: "/about",
          element: !isAuthenticated ? <Navigate to="/login" /> : <AuthenticatedRoute><About /></AuthenticatedRoute>,
        },
        {
          path: "/lessons",
          element: !isAuthenticated ? <Navigate to="/login" /> : <AuthenticatedRoute><Lessons /></AuthenticatedRoute>,
        },
        {
          path: "/ai-chat",
          element: !isAuthenticated ? <Navigate to="/login" /> : <AuthenticatedRoute><AIChat /></AuthenticatedRoute>,
        },
        {
          path: "/lessons/:id",
          element: !isAuthenticated ? <Navigate to="/login" /> : <AuthenticatedRoute><LessonView /></AuthenticatedRoute>,
        }
      ]
    }
  ]);

  return (
    <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
