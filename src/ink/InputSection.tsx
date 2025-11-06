import React, { memo } from 'react';
import { Box, Text } from 'ink';
import InputDisplay from './InputDisplay.tsx';

interface InputSectionProps {
  currentInput: string;
  rawModeSupported: boolean;
}

const InputSection: React.FC<InputSectionProps> = memo(({ 
  currentInput, 
  rawModeSupported 
}) => {
  return (
    <>
      <Box
        borderStyle="round"
        borderColor="gray"
        paddingX={1}
        paddingY={0}
        marginX={1}
        marginBottom={1}
      >
        <Box>
          <InputDisplay currentInput={currentInput} />
        </Box>
      </Box>
      <Box marginX={1} marginBottom={1}>
        <Text dimColor>
          {!rawModeSupported 
            ? 'Raw mode not supported - input disabled' 
            : 'Type your message, Press Enter to send, Escape to clear'
          }
        </Text>
      </Box>
    </>
  );
}, (prevProps, nextProps) => {
  return prevProps.currentInput === nextProps.currentInput &&
         prevProps.rawModeSupported === nextProps.rawModeSupported;
});

InputSection.displayName = 'InputSection';

export default InputSection;