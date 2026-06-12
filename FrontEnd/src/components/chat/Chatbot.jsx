import { addMessage, sendMessage } from "@/redux/slices/chatbotSlice";
import { MessageCircleMore, SendHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chatbot);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    dispatch(addMessage(input));
    dispatch(sendMessage(input));

    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#008484] hover:bg-[#006b6b] text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105 "
        >
          <MessageCircleMore />
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-[350px] md:w-[400px] h-[550px] rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
          <div className="bg-[#008484] p-4 text-white flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">MedFlow AI Triage</h3>
              <p className="text-xs text-teal-100">Usually replies instantly</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 p-1"
            >
              <X />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
            {messages.map((msg, index) => (
              <ChatMessage key={index} msg={msg} />
            ))}

            {loading && (
              <div className="flex items-start">
                <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-none p-3 shadow-sm text-sm flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-100">●</span>
                  <span className="animate-bounce delay-200">●</span>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-gray-200 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#008484]/50"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-[#008484] text-white p-2 rounded-full hover:bg-[#006b6b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <SendHorizontal />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
