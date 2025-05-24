import React from 'react';
import { MoreHorizontal, Clock } from 'lucide-react';
import useChatStore from '../../store/chatStore';

interface ChatHeaderProps {
  title: string;
  onClose?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  const { toggleAICopilot } = useChatStore();
  
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-2">
        <h2 className="text-base font-medium text-gray-900">{title}</h2>
        <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="flex items-center px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          <Clock className="w-4 h-4" />
        </button>
        <button className="flex items-center px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
        <button className="px-3 py-1.5 text-sm font-medium text-white bg-black rounded-md hover:bg-black/90 transition-colors">
          Close
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;