import React, { useState } from 'react';
import { ArrowUp, CheckSquare, Search, Info } from 'lucide-react';
import Button from '../ui/Button';
import AIHeader from './AIHeader';
import AIResponseComponent from './AIResponse';
import { cn } from '../../lib/utils';
import useChatStore from '../../store/chatStore';
import { Menu } from '@headlessui/react';
import { toneOptions } from '../../data/mockData';

const AICopilot: React.FC = () => {
  const { aiResponses, generateAIResponse: generateResponse, addToComposer, rephraseText: rephrase } = useChatStore();
  const [question, setQuestion] = useState('');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [showToneOptions, setShowToneOptions] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      generateResponse(question);
      setQuestion('');
    }
  };
  
  return (
    <div className="flex flex-col h-full border-l border-ui-divider bg-white w-80">
      <AIHeader isActive={!isDetailsOpen} onToggle={() => setIsDetailsOpen(!isDetailsOpen)} />
      
      {!isDetailsOpen ? (
        <>
          <div className="p-4 flex items-center">
            <div className="bg-[#000000] text-white rounded-md p-1 mr-2">
              <span className="text-xs font-bold">AI</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Hi, I'm Fin AI Copilot</h3>
              <p className="text-xs text-gray-500">Ask me anything about this conversation.</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {aiResponses.length === 0 && (
              <div className="mb-4">
                <div className="bg-gray-50 rounded-lg px-3 py-2 mb-2">
                  <span className="text-sm font-medium">Suggested</span>
                  <div className="flex items-start mt-1">
                    <CheckSquare size={16} className="text-[#006CFF] mt-0.5 mr-1.5 flex-shrink-0" />
                    <button 
                      className="text-sm text-gray-800 hover:text-[#006CFF] text-left"
                      onClick={() => generateResponse('How do I get a refund?')}
                    >
                      How do I get a refund?
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {aiResponses.map((response) => (
              <AIResponseComponent key={response.id} response={response} />
            ))}
          </div>
          
          <div className="p-4 pt-2 border-t border-ui-divider">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                placeholder="Ask a follow up question..."
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#006CFF] focus:border-[#006CFF]"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button
                type="submit"
                className={cn(
                  "absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors",
                  question.trim() ? 'text-[#006CFF] hover:bg-[#006CFF]/10' : 'text-gray-400'
                )}
                disabled={!question.trim()}
              >
                <ArrowUp size={16} />
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex-1 p-4">
          <div className="space-y-4">
            <div className="border-b border-ui-divider pb-4">
              <h3 className="font-medium mb-2">Assignee</h3>
              <div className="flex items-center text-sm text-gray-600">
                <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32" 
                     alt="Brian Byrne" 
                     className="w-6 h-6 rounded-full mr-2" 
                />
                <span>Brian Byrne</span>
              </div>
            </div>
            
            <div className="border-b border-ui-divider pb-4">
              <h3 className="font-medium mb-2">Team</h3>
              <div className="flex items-center text-sm text-gray-600">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  Unassigned
                </span>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span className="text-sm text-gray-700">Tracker ticket</span>
                <span className="text-gray-400">+</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span className="text-sm text-gray-700">Back-office tickets</span>
                <span className="text-gray-400">+</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span className="text-sm text-gray-700">Side conversations</span>
                <span className="text-gray-400">+</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <button className="w-full text-left">
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">USER DATA</span>
                  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
              
              <button className="w-full text-left">
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">CONVERSATION ATTRIBUTES</span>
                  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
              
              <button className="w-full text-left">
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">COMPANY DETAILS</span>
                  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICopilot;