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
import { Key, Users, X } from "lucide-react";
import NavigationBar from "../navigation/NavigationBar";
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
    console.log(showEngagementForm);
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
    const body = encodeURIComponent(`Hey! There's a new course on Israel that addresses all the hot-topic issues and I think you'd find it interesting. You can sign up here https://${REFERRAL_URL}`);
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
    <div className="min-h-[100dvh] bg-[#FFFFFF]">
      <NavigationBar />
      <div className="space-y-8 max-w-md mx-auto w-full px-4 pt-20 pb-24">
        <div className="flex flex-col items-start relative mb-4">
          <div className="relative">
            <span className="text-2xl font-bold text-[#1A1F2C] inline-block">
              <span className="relative">
                <span className="relative z-10 uppercase"> WELCOME BACK{firstName ? `, ${firstName}` : ''}{firstName ? '!' : <LoadingSpinner />}</span>
                <span className="absolute bottom-1 left-0 w-full h-[8px] bg-[#FFD700] -z-0"></span>
              </span>
            </span>
          </div>
        </div>

        <NextLessonCard onAttendanceClick={() => setShowAttendanceForm(true)} />
        <ReferralCard onShareLink={handleCopyReferralLink} onEmailShare={handleEmailShare} />
        <EngagementCard
          onNewEngagement={handleNewEngagement}
          onEditEngagement={handleEditEngagement}
          recentEngagements={recentEngagements}
        />
      </div>

      <Dialog open={showEngagementForm} onOpenChange={handleFormClose}>
        <DialogContent className="mx-auto w-full max-w-[90%] sm:max-w-md px-6 py-8 rounded-lg bg-white shadow-lg">
          <div className="flex justify-center">
            <div className="p-3 bg-yellow-400 rounded-full">
              <Users className="w-8 h-8 text-black" />
            </div>
          </div>
          <DialogHeader className="text-center">
            <DialogTitle className="text-lg font-bold text-black">
              LOG ENGAGEMENT
            </DialogTitle>
          </DialogHeader>


          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 opacity-70 transition-opacity hover:opacity-100"
            onClick={handleFormClose}
          >
            <X className="h-4 w-4 text-gray-500" />
          </Button>
          <ConversationForm
            initialData={selectedEngagement}
            onSuccess={handleFormClose}
            onClose={handleFormClose}
          />
        </DialogContent>
      </Dialog>

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
