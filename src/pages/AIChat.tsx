import NavigationBar from "@/components/navigation/NavigationBar";

const AIChat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-16">
        <div className="h-[calc(100vh-5rem)]">
          <iframe
            src="https://beta.pickaxeproject.com/axe?id=JLI_KI_L1_OMWIM&chat=STTCHG4KBZAI6PCD1TLJ"
            className="w-full h-full border-0 rounded-lg shadow-lg"
            allow="microphone"
          />
        </div>
      </div>
    </div>
  );
};

export default AIChat;