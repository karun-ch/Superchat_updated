import superchatLogo from "../assets/superchat_logo.png";
import { useSelector } from "react-redux";

const Chatbot_Message = ({ content, type = "text", isLoading }) => {
  const { darkmode } = useSelector((store) => store.user);

  // Conditional styles for dark and light modes
  const messageStyles = darkmode
    ? {
        userMessage: "bg-gray-500 text-gray-200", // Blue for user messages
        botMessage: "bg-[#3A3A3A] text-gray-300", // Dark gray for bot messages
        systemMessage: "bg-[#2C2C2C] text-gray-400", // Darker gray for system messages
        iconColor: "bg-[#3A3A3A]", // Dark gray for bot icon background
      }
    : {
      userMessage: "bg-black text-gray-100", // Blue for user messages
      botMessage: "bg-gray-100 text-gray-800", // Light gray for bot messages
        systemMessage: "bg-gray-200 text-gray-600", // Lighter gray for system messages
        iconColor: "bg-gray-200", // Light gray for bot icon background
      };

  return (
    <div
      className={`flex gap-3 mb-4 ${
        type === "system" ? "justify-center" : type === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {/* Icon for bot/system messages */}
      {type !== "system" && type !== "user" && (
        <div
          className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${messageStyles.iconColor}`}
        >
          {type === "bot" && isLoading ? (
            <img
              src={superchatLogo}
              alt="Loading"
              className="w-6 h-6 animate-spin"
            />
          ) : (
            <img
              src={superchatLogo}
              alt="Superchat Logo"
              className="w-6 h-6 bg-white"
            />
          )}
        </div>
      )}

      {/* Message content */}
      <div
        className={`p-3 max-w-[75%] rounded-bl-lg rounded-br-lg ${
          type === "bot"
            ? "rounded-tl-none rounded-tr-lg" // Bot message: sharp top-left, rounded top-right
            : "rounded-tl-lg rounded-tr-none" // Other messages: rounded top-left, sharp top-right
        } ${
          type === "system"
            ? messageStyles.systemMessage
            : type === "bot"
            ? messageStyles.botMessage
            : messageStyles.userMessage
        }`}
      >
        {isLoading ? "..." : content}
      </div>
    </div>
  );
};

export default Chatbot_Message;
