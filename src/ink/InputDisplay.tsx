import React, { memo } from 'react';
import { Text } from 'ink';

interface InputDisplayProps {
  currentInput: string;
}

const InputDisplay: React.FC<InputDisplayProps> = memo(({ currentInput }) => {
  return (
    <>
      <Text color="green">&gt; </Text>
      <Text>{currentInput}</Text>
      <Text backgroundColor="white"> </Text>
    </>
  );
}, (prevProps, nextProps) => {
  return prevProps.currentInput === nextProps.currentInput;
});

InputDisplay.displayName = 'InputDisplay';

export default InputDisplay;