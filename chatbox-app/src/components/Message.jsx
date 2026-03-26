import React from "react";

const Message = ({ msg }) => {
  const isUser = msg.role === "user";

  return (
    <div className={`flex w-full my-2 ${isUser ? "justify-start" : "justify-end"}`}>
      <div
        className={`px-4 py-2 max-w-[70%] rounded-2xl text-sm shadow-md break-words
        ${
          isUser
            ? "bg-gray-200 text-gray-900 rounded-bl-sm"
            : "bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-br-sm"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
};

export default Message;