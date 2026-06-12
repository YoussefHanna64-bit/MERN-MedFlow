const formatBoldText = (text) => {
  if (!text) {
    return null;
  }
  const words = text.split(/(\*\*.*?\*\*)/g);

  return words.map((word, index) => {
    if (word.startsWith("**") && word.endsWith("**")) {
      return <strong key={index}>{word.slice(2, -2)}</strong>;
    }
    return <span key={index}>{word}</span>;
  });
};

const ChatMessage = ({ msg }) => {
  const isUser = msg.sender === "user";
  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[85%] p-3 rounded-2xl text-sm ${
          isUser
            ? "bg-[#008484] text-white rounded-br-none"
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
        }`}
      >
        {formatBoldText(msg.text)}
      </div>
    </div>
  );
};

export default ChatMessage;
