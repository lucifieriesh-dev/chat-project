import React, { useState } from 'react';
import ConversationItem from './ConversationItem';
import { ChevronDown, FilterX, Search } from 'lucide-react';
import useChatStore from '../../store/chatStore';

const ConversationList: React.FC = () => {
  const { conversations, activeConversation, setActiveConversation } = useChatStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredConversations = conversations.filter(
    conv => conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conv.message.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="flex flex-col h-full border-r border-ui-divider">
      <div className="p-3 border-b border-ui-divider">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium">Your inbox</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center text-sm text-gray-600 bg-white border border-gray-300 px-3 py-1 rounded-md">
            <span className="mr-1">Open</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          <button className="flex items-center text-sm text-gray-600 bg-white border border-gray-300 px-3 py-1 rounded-md">
            <span className="mr-1">Waiting longest</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-3 border-b border-ui-divider">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setSearchTerm('')}
            >
              <FilterX className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={activeConversation?.id === conversation.id}
            onClick={() => setActiveConversation(conversation.id)}
          />
        ))}
        
        {filteredConversations.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No conversations found
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;