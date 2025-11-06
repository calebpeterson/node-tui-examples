import React, { memo } from 'react';
import { Box } from 'ink';
import MessageDisplay from './MessageDisplay.tsx';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'agent';
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = memo(({ messages }) => {
  return (
    <Box flexDirection="column" flexGrow={1} paddingX={1} paddingY={1}>
      {messages.map((msg) => (
        <MessageDisplay key={msg.id} {...msg} />
      ))}
    </Box>
  );
}, (prevProps, nextProps) => {
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  return prevProps.messages.every((msg, index) => 
    msg.id === nextProps.messages[index].id &&
    msg.content === nextProps.messages[index].content &&
    msg.role === nextProps.messages[index].role
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;