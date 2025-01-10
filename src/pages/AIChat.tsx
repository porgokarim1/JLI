import NavigationBar from "@/components/navigation/NavigationBar";

const AIChat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-20 pb-8 flex justify-center">
        <iframe 
          id="embed-preview-iframe" 
          loading="eager" 
          src="https://embed.pickaxeproject.com/axe?id=JLI_KI_L1_OMWIM&mode=embed_gold&host=beta&theme=custom&opacity=100&font_header=Real+Head+Pro&size_header=30&font_body=Real+Head+Pro&size_body=16&font_labels=Real+Head+Pro&size_labels=14&font_button=Real+Head+Pro&size_button=16&c_fb=FFFFFF&c_ff=FFFFFF&c_fbd=F4D32F&c_rb=EAEAEA&c_bb=F4D32F&c_bt=FFFFFF&c_t=000000&s_ffo=100&s_rbo=100&s_bbo=100&s_f=minimalist&s_b=filled&s_t=4&s_to=4&s_r=10&image=hide&title=hide&description=hide" 
          width="100%" 
          height="calc(100vh - 120px)" 
          className="transition hover:translate-y-[-2px] hover:shadow-[0_6px_20px_0px_rgba(0,0,0,0.15)]" 
          style={{
            border: "4px solid rgba(0, 0, 0, 1)",
            transition: ".3s",
            borderRadius: "10px",
            maxWidth: "100%"
          }} 
          frameBorder="0"
        />
        <div id="pickaxe-fab-JLI_KI_L1_OMWIM"></div>
      </div>
    </div>
  );
};

export default AIChat;