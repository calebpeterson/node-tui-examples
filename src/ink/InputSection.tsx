import React, { memo } from 'react';
import { Box, Text } from 'ink';

interface InputSectionProps {
  currentInput: string;
  inputMode: boolean;
  rawModeSupported: boolean;
}

const InputSection: React.FC<InputSectionProps> = memo(({ 
  currentInput, 
  inputMode, 
  rawModeSupported 
}) => {
  return (
    <Box
      borderStyle="round"
      borderColor="gray"
      paddingX={1}
      paddingY={0}
      marginX={1}
      marginBottom={1}
    >
      <Box>
        <Text color="green">&gt; </Text>
        <Text>{currentInput}</Text>
        {inputMode && <Text backgroundColor="white"> </Text>}
      </Box>
      <Box marginTop={1}>
        <Text dimColor>
          {!rawModeSupported 
            ? 'Raw mode not supported - input disabled' 
            : inputMode 
              ? 'Press Enter to send, Escape to cancel' 
              : "Press 'i' to input message"
          }
        </Text>
      </Box>
    </Box>
  );
});

InputSection.displayName = 'InputSection';

export default InputSection;