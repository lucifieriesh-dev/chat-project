import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function rephraseText(content: string, tone: string): string {
  const tones = {
    friendly: `Hey there! 👋 ${content
      .replace(/please/gi, '')
      .replace(/\./g, '! ')
      .replace(/Hello|Hi/gi, 'Hey')
      .trim()}`,
    
    formal: `Dear valued customer,\n\n${content
      .replace(/hey|hi/gi, 'Hello')
      .replace(/!+/g, '.')
      .trim()}\n\nBest regards,\nCustomer Support`,
    
    default: content
  };

  return tones[tone as keyof typeof tones] || content;
}

export function generateAIResponse(query: string): string {
  // Enhanced AI responses based on different query types
  const responses: { [key: string]: string } = {
    greeting: `👋 Hello! I'm your AI assistant. I can help you with:

• Orders and shipping
• Product information
• Returns and refunds
• Account management
• Technical support

What can I help you with today?`,

    refund: `I understand you're interested in a refund. Let me help you with that!

Here's what you need to know:

1. For orders within 30 days:
   ✅ Full refund available
   📦 Free return shipping
   💳 Money back in 3-5 days

2. For orders over 30 days:
   🎁 Store credit option
   📝 Special case review
   ⚡ Quick processing

Would you like me to:
1. Start your refund process
2. Explain our refund policy
3. Check your order status

Just let me know which option you prefer!`,
    
    shipping: `📦 Here's your shipping information:

🚚 Standard: 3-5 business days
✈️ Express: 1-2 business days
🌍 International: 7-14 business days

Your order includes:
✅ Real-time tracking
🛡️ Insurance coverage
📱 SMS updates

Would you like me to:
1. Track your order
2. Upgrade shipping
3. Estimate delivery time`,
    
    product: `I'd love to help you with product information!

Key features:
🌟 Premium quality
🛠️ Expert craftsmanship
✨ 1-year warranty
↩️ 30-day returns

Would you like to:
1. See product demos
2. Compare features
3. Check availability
4. Read reviews`,
    
    account: `Let's help you manage your account!

Available options:
👤 Update profile
🔐 Security settings
🔔 Notification preferences
📋 Order history
💳 Payment methods

What would you like to do first?`,
    
    help: `I'm here to assist! Here's what I can help with:

🛍️ Shopping
• Browse products
• Check prices
• Find deals

📦 Orders
• Track shipments
• Update details
• Cancel orders

💳 Payments
• Process refunds
• Update payment
• Billing issues

Just let me know what you need!`,
    
    default: `I'm here to help! Could you please provide more details about your request? 

I can assist with:
• Orders and shipping
• Product information
• Account management
• Returns and refunds
• Technical support

Feel free to ask anything!`
  };

  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('hi') || lowerQuery.includes('hello') || lowerQuery.includes('hey')) {
    return responses.greeting;
  } else if (lowerQuery.includes('refund') || lowerQuery.includes('return')) {
    return responses.refund;
  } else if (lowerQuery.includes('shipping') || lowerQuery.includes('delivery')) {
    return responses.shipping;
  } else if (lowerQuery.includes('product') || lowerQuery.includes('item')) {
    return responses.product;
  } else if (lowerQuery.includes('account') || lowerQuery.includes('profile')) {
    return responses.account;
  } else if (lowerQuery.includes('help') || lowerQuery.includes('support')) {
    return responses.help;
  }
  
  return responses.default;
}

export function getRelevantSources(query: string): AISource[] {
  const sources = {
    greeting: [
      { id: '1', title: 'Getting Started Guide', icon: 'book', count: 5 },
      { id: '2', title: 'Common Questions', icon: 'help-circle' },
      { id: '3', title: 'Contact Support', icon: 'mail' },
    ],
    refund: [
      { id: '1', title: 'Refund Policy', icon: 'file-text', count: 12 },
      { id: '2', title: 'Return Process Guide', icon: 'package' },
      { id: '3', title: 'Special Cases & Exceptions', icon: 'gift' },
    ],
    shipping: [
      { id: '1', title: 'Shipping Methods', icon: 'truck', count: 8 },
      { id: '2', title: 'Delivery Estimates', icon: 'clock' },
      { id: '3', title: 'International Shipping', icon: 'globe' },
    ],
    product: [
      { id: '1', title: 'Product Catalog', icon: 'box', count: 15 },
      { id: '2', title: 'Usage Guidelines', icon: 'book' },
      { id: '3', title: 'Care Instructions', icon: 'heart' },
    ],
    account: [
      { id: '1', title: 'Account Settings', icon: 'user', count: 10 },
      { id: '2', title: 'Security Guide', icon: 'shield' },
      { id: '3', title: 'Privacy Policy', icon: 'lock' },
    ],
    help: [
      { id: '1', title: 'Help Center', icon: 'help-circle', count: 25 },
      { id: '2', title: 'FAQs', icon: 'file-text' },
      { id: '3', title: 'Support Channels', icon: 'mail' },
    ],
    default: [
      { id: '1', title: 'Help Center', icon: 'help-circle', count: 25 },
      { id: '2', title: 'FAQs', icon: 'file-text' },
      { id: '3', title: 'Contact Support', icon: 'mail' },
    ],
  };

  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('hi') || lowerQuery.includes('hello') || lowerQuery.includes('hey')) {
    return sources.greeting;
  } else if (lowerQuery.includes('refund') || lowerQuery.includes('return')) {
    return sources.refund;
  } else if (lowerQuery.includes('shipping') || lowerQuery.includes('delivery')) {
    return sources.shipping;
  } else if (lowerQuery.includes('product') || lowerQuery.includes('item')) {
    return sources.product;
  } else if (lowerQuery.includes('account') || lowerQuery.includes('profile')) {
    return sources.account;
  } else if (lowerQuery.includes('help') || lowerQuery.includes('support')) {
    return sources.help;
  }
  
  return sources.default;
}

export interface AISource {
  id: string;
  title: string;
  icon: string;
  count?: number;
}