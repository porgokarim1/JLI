import NavigationBar from "@/components/navigation/NavigationBar"
import { ComingSoon } from "@/components/ui/coming-soon"

export default function Resources() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <ComingSoon 
        feature="Learning Resources" 
        description="Access a curated collection of learning materials, guides, and supplementary content to enhance your learning journey. Coming soon!"
      />
    </div>
  )
}