import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ConversationForm from "../engagement/ConversationForm";
import { CompletionCodeDialog } from "../lesson/CompletionCodeDialog";
import { NextLessonCard } from "./cards/NextLessonCard";
import { EngagementCard } from "./cards/EngagementCard";
import { ReferralCard } from "./cards/ReferralCard";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import NavigationBar from "../navigation/NavigationBar";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";
import WelcomePopup from "@/components/welcome/WelcomePopup";

const REFERRAL_URL = "knowisrael.app";

const LoadingSpinner = () => (
  <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary align-middle ml-2"></span>
);

const StudentDashboard = () => {
  const [showEngagementForm, setShowEngagementForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [recentEngagements, setRecentEngagements] = useState<any[]>([]);
  const [selectedEngagement, setSelectedEngagement] = useState<any>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast.error("User not found");
          setLoading(false);
          return;
        }

        const [profileResponse, engagementsResponse] = await Promise.all([
          supabase.from("profiles").select().eq("id", user.id).single(),
          supabase.from("conversations").select("*").eq("user_id", user.id).order("conversation_date", { ascending: false }),
        ]);

        const { data: profile, error: profileError } = profileResponse;
        const { data: engagements, error: engagementsError } = engagementsResponse;

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast.error("Failed to load profile");
        } else if (profile?.first_name) {
          setFirstName(profile.first_name);
        }

        if (engagementsError) {
          console.error("Error fetching recent engagements:", engagementsError);
        } else {
          setRecentEngagements(engagements);
        }

        const userAcceptedEula = !!profile?.terms_agreed;
        if (!userAcceptedEula) {
          setIsPopupOpen(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    };
    console.log(showEngagementForm)
    fetchData();
  }, [showEngagementForm]);

  const handleCopyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_URL);
      toast.success("Referral link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy referral link");
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("Join me in the Know Israel Program");
    const body = encodeURIComponent(`Hey! There’s a new course on Israel that addresses all the hot-topic issues and I think you’d find it interesting. You can sign up here https://${REFERRAL_URL}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleEditEngagement = (engagement: any) => {
    setSelectedEngagement(engagement);
    setShowEngagementForm(true);
  };

  const handleFormClose = () => {
    setShowEngagementForm(false);
    setSelectedEngagement(null);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleNewEngagement = () => {
    console.log("Opening engagement form");
    setShowEngagementForm(true);
  };

  return (
    <div className="min-h-[100dvh] p-4 md:p-0 mx-auto space-y-4 pb-20 pl-0">
      <NavigationBar />
      <div className="space-y-4 max-w-md mx-auto w-full px-2 pl-6">
        <div className="flex flex-col items-start px-2 pt-0 pt-14 md:pt-16">
          <h1 className="text-lg font-semibold text-slate-800">
            Welcome back{firstName ? `, ${firstName}` : <LoadingSpinner />}
          </h1>
        </div>

        <NextLessonCard onAttendanceClick={() => setShowAttendanceForm(true)} />
        <ReferralCard onShareLink={handleCopyReferralLink} onEmailShare={handleEmailShare} />
        <EngagementCard
          onNewEngagement={() => setShowEngagementForm(true)}
          onEditEngagement={handleEditEngagement}
          recentEngagements={recentEngagements}
        />
      </div>
      <Dialog open={showEngagementForm} onOpenChange={handleFormClose}>
        <DialogContent className="mx-auto w-full max-w-[90%] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center">Log Engagement</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              onClick={handleFormClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>
          <ConversationForm
            initialData={selectedEngagement}
            onSuccess={handleFormClose}
            onClose={handleFormClose}
          />
        </DialogContent>
      </Dialog>

      {/* Attendance Dialog */}
      <CompletionCodeDialog
        lessonId="placeholder-id"
        onSuccess={() => setShowAttendanceForm(false)}
        open={showAttendanceForm}
        onOpenChange={setShowAttendanceForm}
      />
      <WelcomePopup isOpen={isPopupOpen} onClose={handlePopupClose} />
    </div>
  );
};

export default StudentDashboard;