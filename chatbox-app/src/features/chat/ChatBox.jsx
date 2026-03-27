import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserMessage, sendMessage } from "./chatSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.chat);

  const handleSend = () => {
    if (!input.trim() || loading) return;

    dispatch(addUserMessage(input));
    dispatch(sendMessage(input));
    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto h-screen flex flex-col p-4">

      {/* Header */}
      <div className="text-center text-xl font-semibold text-gray-800 mb-3">
        AI Chat Assistant
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto bg-white rounded-2xl shadow-lg p-4 space-y-2 border">
        {messages.map((msg, index) => (
          <Message key={index} msg={msg} />
        ))}

        {loading && (
          <div className="text-center text-purple-500 text-sm">
            Typing...
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm text-center mt-2">
          {error}
        </p>
      )}

      {/* Input Section */}
      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
        />

        <button
          onClick={handleSend}
          className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-5 py-3 rounded-xl font-medium hover:scale-105 transition-transform duration-200 shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;