import BotInterface from "../ChatbotPage_components/BotInterface";
import Sidebar from "../ChatbotPage_components/Sidebar";
import ChatbotHeaderSmallScreen from "../ChatbotPage_components/ChatbotHeaderSmallScreen";
import useIsSmallScreen from "../customHooks/useIsSmallScreen";

export default function Chatbot_Interface() {
  const isSmallScreen = useIsSmallScreen();

  return (
    <div className={`w-full h-screen ${isSmallScreen ? "flex flex-col" : "flex flex-row"}`}>
      {isSmallScreen ? (
        // For small screens, display the header at the top
        <ChatbotHeaderSmallScreen />
      ) : (
        // For larger screens, display the sidebar on the left
        <div className="h-full">
          <Sidebar />
        </div>
      )}
      {/* BotInterface takes full space regardless of screen size */}
        <BotInterface />
    </div>
  );
}
