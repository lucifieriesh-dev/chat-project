import React, { useState } from 'react';
import { Smile } from 'lucide-react';
import useChatStore from '../../store/chatStore';

const MessageComposer: React.FC = () => {
  const { messageInput, setMessageInput, sendMessage } = useChatStore();
  const [showFormatting, setShowFormatting] = useState(false);
  const [showToneOptions, setShowToneOptions] = useState(false);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (messageInput.trim()) {
        sendMessage(messageInput);
      }
    }
  };

  const formatText = (format: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = messageInput.substring(start, end);

    let formattedText = '';
    switch (format) {
      case 'B':
        formattedText = `**${selectedText}**`;
        break;
      case 'i':
        formattedText = `_${selectedText}_`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
      case 'H1':
        formattedText = `# ${selectedText}`;
        break;
      case 'H2':
        formattedText = `## ${selectedText}`;
        break;
    }

    const newText = messageInput.substring(0, start) + formattedText + messageInput.substring(end);
    setMessageInput(newText);
  };
  
  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="flex items-center px-4 py-2 border-b border-gray-200">
        <button 
          className="p-1.5 rounded hover:bg-gray-100 transition-colors"
          onClick={() => setShowFormatting(!showFormatting)}
        >
          <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
          </svg>
        </button>
        <button 
          className="p-1.5 rounded hover:bg-gray-100 transition-colors ml-1"
          onClick={() => setShowToneOptions(!showToneOptions)}
        >
          <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="p-1.5 rounded hover:bg-gray-100 transition-colors ml-1">
          <Smile className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      {showFormatting && (
        <div className="px-4 py-2 border-b border-gray-200 flex space-x-2">
          <button onClick={() => formatText('B')} className="p-1.5 hover:bg-gray-100 rounded">B</button>
          <button onClick={() => formatText('i')} className="p-1.5 hover:bg-gray-100 rounded italic">i</button>
          <button onClick={() => formatText('code')} className="p-1.5 hover:bg-gray-100 rounded font-mono">{`</>`}</button>
          <button onClick={() => formatText('H1')} className="p-1.5 hover:bg-gray-100 rounded">H1</button>
          <button onClick={() => formatText('H2')} className="p-1.5 hover:bg-gray-100 rounded">H2</button>
        </div>
      )}

      {showToneOptions && (
        <div className="px-4 py-2 border-b border-gray-200">
          <div className="bg-gray-50 rounded-lg p-2 space-y-2">
            <button className="w-full text-left px-2 py-1.5 hover:bg-white rounded">My tone of voice</button>
            <button className="w-full text-left px-2 py-1.5 hover:bg-white rounded">More friendly</button>
            <button className="w-full text-left px-2 py-1.5 hover:bg-white rounded">More formal</button>
            <button className="w-full text-left px-2 py-1.5 hover:bg-white rounded">Fix grammar & spelling</button>
            <button className="w-full text-left px-2 py-1.5 hover:bg-white rounded">Translate...</button>
          </div>
        </div>
      )}
      
      <div className="px-4 py-3">
        <textarea
          className="w-full min-h-[100px] p-3 text-[15px] border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-500">
            Use <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">⌘K</kbd> for shortcuts
          </p>
          
          <button
            className="flex items-center px-3 py-1.5 text-sm font-medium text-black bg-white hover:bg-black hover:text-white transition-colors rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => messageInput.trim() && sendMessage(messageInput)}
            disabled={!messageInput.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageComposer;