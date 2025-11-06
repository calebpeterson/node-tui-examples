import React from 'react';
import { Text } from 'react-curse';

interface Message {
  content: string;
  role: 'user' | 'agent';
}

interface MessageDisplayProps {
  message: Message;
  width: number;
}

export const MessageDisplay: React.FC<MessageDisplayProps> = ({ message, width }) => {
  const isUser = message.role === 'user';
  const alignX = isUser ? width - message.content.length : 0;

  return (
    <Text x={alignX} block>
      {message.content}
    </Text>
  );
};

export type { Message };