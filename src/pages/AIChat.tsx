import NavigationBar from "@/components/navigation/NavigationBar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

const AIChat = () => {
  const [hasCompletedLesson1, setHasCompletedLesson1] = useState(false);

  useEffect(() => {
    const checkLesson1Completion = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: lessons } = await supabase
        .from('lessons')
        .select('id')
        .eq('lesson_order', '1')
        .single();

      if (lessons?.id) {
        const { data: progress } = await supabase
          .from('user_lesson_progress')
          .select('status')
          .eq('user_id', user.id)
          .eq('lesson_id', lessons.id)
          .single();

        setHasCompletedLesson1(progress?.status === 'completed');
      }
    };

    checkLesson1Completion();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="h-[calc(100vh-64px)] pt-16">
        {hasCompletedLesson1 ? (
          <iframe 
            id="embed-preview-iframe" 
            loading="eager" 
            src="https://embed.pickaxeproject.com/axe?id=JLI_KI_L1_OMWIM&mode=embed_gold&host=beta&theme=custom&opacity=100&font_header=Real+Head+Pro&size_header=30&font_body=Real+Head+Pro&size_body=16&font_labels=Real+Head+Pro&size_labels=14&font_button=Real+Head+Pro&size_button=16&c_fb=FFFFFF&c_ff=FFFFFF&c_fbd=F4D32F&c_rb=EAEAEA&c_bb=F4D32F&c_bt=FFFFFF&c_t=000000&s_ffo=100&s_rbo=100&s_bbo=100&s_f=minimalist&s_b=filled&s_t=4&s_to=4&s_r=10&image=hide&title=hide&description=hide" 
            className="w-full h-full transition-transform" 
            style={{
              border: "none",
              borderRadius: "0",
              maxWidth: "100%"
            }} 
            frameBorder="0"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Card className="max-w-lg p-6 text-center">
              <p className="text-lg font-medium text-gray-700">
                Come back after lesson 1 to chat and prepare for your conversations!
              </p>
            </Card>
          </div>
        )}
        <div id="pickaxe-fab-JLI_KI_L1_OMWIM"></div>
      </div>
    </div>
  );
};

export default AIChat;