'use client'
import React, { useState, useEffect, useRef } from 'react';

const ChatRoom = ({ user = { name: 'Himalaya Singh', avatar: 'https://via.placeholder.com/40' } }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi! How are you today?', sent: false, time: new Date() },
    { id: 2, text: 'I’m good, thanks! How about you?', sent: true, time: new Date() },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Cuộn xuống tin nhắn mới nhất
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Xử lý gửi tin nhắn
  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: input,
        sent: true,
        time: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInput('');
      // Giả lập tin nhắn nhận được sau 1 giây
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: 'This is a reply!',
            sent: false,
            time: new Date(),
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      {/* Header */}
      <div className="p-4 bg-white border-b flex items-center">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <div className="ml-auto flex space-x-4">
          <i className="fas fa-phone text-gray-600 cursor-pointer hover:text-blue-600"></i>
          <i className="fas fa-video text-gray-600 cursor-pointer hover:text-blue-600"></i>
          <i className="fas fa-info-circle text-gray-600 cursor-pointer hover:text-blue-600"></i>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start ${
              message.sent ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            {!message.sent && (
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-8 h-8 rounded-full mr-2 mt-1"
              />
            )}
            <div
              className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                message.sent
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <p>{message.text}</p>
              <small className={`text-xs ${message.sent ? 'text-gray-200' : 'text-gray-400'}`}>
                {message.time.toLocaleTimeString()}
              </small>
            </div>
            {message.sent && (
              <img
                src="https://via.placeholder.com/40" // Thay bằng avatar của người gửi nếu có
                alt="Avatar"
                className="w-8 h-8 rounded-full ml-2 mt-1"
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <form onSubmit={sendMessage} className="flex items-center">
          <i className="fas fa-paperclip text-gray-500 mr-3 cursor-pointer hover:text-blue-600"></i>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <i className="fas fa-smile text-gray-500 mx-3 cursor-pointer hover:text-blue-600"></i>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;