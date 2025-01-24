import NavigationBar from "@/components/navigation/NavigationBar";
import { Card } from "@/components/ui/card";

const AIChat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="h-[calc(100vh-64px)] pt-16">
        <div className="flex items-center justify-center h-full">
          <Card className="max-w-sm md:max-w-sm lg:max-w-md p-6 m-6 text-center">
            <p className="text-lg font-medium text-gray-700">
              Come back after lesson 1 to chat and prepare for your conversations!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIChat;