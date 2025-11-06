import React, { memo } from 'react';
import { Box, Text } from 'ink';

interface MessageDisplayProps {
  id: string;
  content: string;
  role: 'user' | 'agent';
}

const MessageDisplay: React.FC<MessageDisplayProps> = memo(({ id, content, role }) => {
  const isUser = role === 'user';
  
  return (
    <Box
      justifyContent={isUser ? 'flex-end' : 'flex-start'}
      marginBottom={1}
    >
      <Box
        borderStyle="round"
        borderColor={isUser ? 'blue' : 'white'}
        paddingX={1}
        paddingY={0}
        maxWidth="80%"
      >
        <Text color={isUser ? 'blue' : 'white'}>
          {content}
        </Text>
      </Box>
    </Box>
  );
});

MessageDisplay.displayName = 'MessageDisplay';

export default MessageDisplay;