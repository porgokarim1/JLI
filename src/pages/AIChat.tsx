import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Card } from "@/components/ui/card";

declare global {
  interface Window {
    PICKAXE?: {
      pickaxes: { id: string; type: string }[];
      style?: string;
    };
  }
}

const AIChat = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/ai-chat") return;

    if (window.PICKAXE) {
      return;
    }


    window.PICKAXE = { pickaxes: [], style: "kHsjoCQGgI0GWASmgIdIAxiDA6wgM6CMbgC4UgDDAXYEAvDIBoGEBgG4CAWQIGYBgwCqApdoEjggjIaCcCoCA9gGzOBUToIQygtAyDw4IGoGgCkxAAC6AQCsAAD4BILgJ6AkV0ALDQAFA+ZiAkjEDFLoEEywHkKgMCHAzVmBfPMBUIIAaXQC7ggIDFAilWBXGkAmVIFVJQAAigADFAFGCB6IMBcQoBEJQAAKgGrsABOAQRmANK6AWEKAIgyAAAiACEoA+oB6QADwgB5IgBEjgAkmgGksgCEwAG6ACTSAPTiAJUGAUq6AQU2AQhaAEHyAK3iAgy8AaoB1cIBDP4CBfYAYCYBJPICJhIBjjYAjkYAbloA7c4B7nYBPf4BVpYCtVoBhi4BpZYC7F4B5m4CjR4AqL4CmTIBIDYAUDIDfUoAAzYAA4oDgM4C4sIABEIAWwIAugIAxEIAYwIAIGIDAoYA8AoBQCoAxYEAwqGAFCCAFKANQVAAGEgFpAQBF0YAADEAKFCATBpABC5gEABQCQXoBFGMAmcaAcGhAJDigAEhwAvFYBoJUA8ciATxHACWRgFUnwCCDIBABEAOM2AFQ1ANiigDRQQBLUYANJ0AQR6AGntAAIJgGVywAARIAvNEAMFaAQNhANKFgAJNwA+moAk8sAKlKAVQDAIlBgE3HQCBoIADQ0ADRSAcAXABfTgCjFQBFXYAKM0AYKIAIEAR8iAABRAIFGgHGCwDLdYA38EABQiAMBpABBIgAweQAKBIBOGsAKgSAVexAJfhgAACQAARYAbQUANm+AYTGAIuAQF9AAKtgA0QQBAA4B380A0OeAeSnAGu9gEwOQDesIAUZUATNKANjJAPU6gDj1QCqGYBAlkAAxWAcVjANNQgHgsQAxqIAKAUAEwiAXK1ABKGgDGnQAMCYBBCEAGQiALwVAHD4gGLxQAe7IADI8Ao3OAMvlAATvgEWgQAL9oBuwMABLiAExCAFiAULHAK4GgECEQCCkIArViABWugCaZYAWAiAOMfgACEYAsAaAMJ4gBQX4AaN2AN+wgCZfYAMpSADqOgAwyoAzfOANA7gAilAAAEAA===" };
    window.PICKAXE.pickaxes.push({ id: "JLI_KI_L1_OMWIM", type: "fab" });

    const scriptUrl = "https://cdn.jsdelivr.net/gh/pickaxeproject/cdn@latest/dist/bundle.js";


    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.defer = true;
      script.id = "pickaxe-bundle";
      document.head.appendChild(script);
    }

    return () => {


      document.getElementById("pickaxe-bundle")?.remove();


      document.querySelectorAll("iframe").forEach((iframe) => {
        if (iframe.src.includes("pickaxeproject")) {
          iframe.remove();
        }
      });


      document.querySelectorAll("div").forEach((div) => {
        if (div.id.includes("pickaxe")) {
          div.remove();
        }
      });


      delete window.PICKAXE;
    };
  }, [location.pathname]);

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