import { AlertCircle } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

interface ComingSoonProps {
  feature: string;
  description?: string;
}

export function ComingSoon({ feature, description }: ComingSoonProps) {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-16">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="text-xl font-semibold">
          {feature} Coming Soon!
        </AlertTitle>
        <AlertDescription>
          {description || "We're working hard to bring you this exciting new feature. Stay tuned for updates!"}
        </AlertDescription>
      </Alert>
    </div>
  )
}