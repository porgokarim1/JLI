import NavigationBar from "@/components/navigation/NavigationBar"
import { ComingSoon } from "@/components/ui/coming-soon"

export default function Community() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <ComingSoon 
        feature="Community Features" 
        description="Connect with fellow learners, share your progress, and participate in discussions. This feature will be available soon!"
      />
    </div>
  )
}