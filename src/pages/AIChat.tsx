import { useEffect } from "react";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Card } from "@/components/ui/card";

/* declare global {
  interface Window {
    AgentInitializer: {
      init: (config: any) => void;
    }
  }
} */

const AIChat = () => {
 /*  useEffect(() => {
    // Cargar el script dinámicamente
    const script = document.createElement("script");
    script.src = "https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js";
    script.async = true;
    script.onload = () => {
      if (window.AgentInitializer) {
        window.AgentInitializer.init({
          rootId: "JotformAgent-0194f10c92c47b609a5a530c58949a445613",
          formID: "0194f10c92c47b609a5a530c58949a445613",
          queryParams: ["skipWelcome=1", "maximizable=1"],
          domain: "https://www.jotform.com",
          isInitialOpen: false,
          isDraggable: false,
          background: "linear-gradient(180deg, #C8CEED 0%, #C8CEED 100%)",
          buttonBackgroundColor: "#0a1551",
          buttonIconColor: "#fff",
          variant: false,
          customizations: {
            greeting: "No",
            greetingMessage: "Hi! How can I assist you?",
            pulse: "No",
            position: "right",
          },
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []); */

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