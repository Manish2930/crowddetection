import React, { useEffect, useRef, useState } from 'react';
import { db } from '../firebaseConfig';
import { ref, push, onValue } from 'firebase/database';
import { SendHorizonal } from 'lucide-react';

type Message = {
  sender: 'admin' | 'security';
  text: string;
  timestamp: number;
};

type Props = {
  userRole: 'admin' | 'security';
  userId: string; // used to filter or route conversations if needed
};

const ChatPanel: React.FC<Props> = ({ userRole, userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chatRef = ref(db, 'chats/' + userId);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedMessages: Message[] = Object.values(data);
        parsedMessages.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(parsedMessages);
      }
    });
  }, [userId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      sender: userRole,
      text: input.trim(),
      timestamp: Date.now(),
    };

    await push(ref(db, 'chats/' + userId), newMessage);
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-white rounded-lg shadow-md max-w-2xl mx-auto flex flex-col h-[500px]">
      <div className="p-4 border-b text-lg font-semibold text-gray-800">Chat with Admin</div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === userRole ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                msg.sender === userRole
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          <SendHorizonal size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
