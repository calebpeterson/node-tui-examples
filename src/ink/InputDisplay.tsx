import React, { memo } from 'react';
import { Text } from 'ink';

interface InputDisplayProps {
  currentInput: string;
  inputMode: boolean;
}

const InputDisplay: React.FC<InputDisplayProps> = memo(({ currentInput, inputMode }) => {
  return (
    <>
      <Text color="green">&gt; </Text>
      <Text>{currentInput}</Text>
      {inputMode && <Text backgroundColor="white"> </Text>}
    </>
  );
});

InputDisplay.displayName = 'InputDisplay';

export default InputDisplay;