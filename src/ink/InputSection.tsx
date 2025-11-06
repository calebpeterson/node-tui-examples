import React, { memo } from 'react';
import { Box, Text } from 'ink';
import InputDisplay from './InputDisplay.tsx';

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
        <InputDisplay currentInput={currentInput} inputMode={inputMode} />
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
}, (prevProps, nextProps) => {
  return prevProps.currentInput === nextProps.currentInput &&
         prevProps.inputMode === nextProps.inputMode &&
         prevProps.rawModeSupported === nextProps.rawModeSupported;
});

InputSection.displayName = 'InputSection';

export default InputSection;