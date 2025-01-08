import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Mail, FileText } from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import { useNavigate } from "react-router-dom";

interface StudentDashboardProps {
  conversationCount?: number;
}

const StudentDashboard = ({ conversationCount = 0 }: StudentDashboardProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col gap-4 p-4 max-w-lg mx-auto">
      <DashboardHeader />
      
      {/* Next Lesson Card */}
      <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-medium">Next Lesson</h3>
                <p className="text-sm text-muted-foreground">02/15/2025 @4PM</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Confirm Attendance
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Engagements Card */}
      <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤝</span>
              <div>
                <h3 className="font-medium">Engagements</h3>
                <p className="text-sm text-muted-foreground">{conversationCount}/7 peers</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate("/engagement")}
            >
              <Plus className="h-4 w-4" />
              New
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resources Card */}
      <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="font-medium">Resources</h3>
                <p className="text-sm text-muted-foreground">knowIsrael.com/257...</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <FileText className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;