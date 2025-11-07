import React, { memo, useState, useCallback } from "react";
import { Box, Text, useInput } from "ink";
import InputDisplay from "./InputDisplay";

interface InputSectionProps {
  onSubmit: (message: string) => void;
}

const InputSection: React.FC<InputSectionProps> = memo(({ onSubmit }) => {
  const [currentInput, setCurrentInput] = useState("");

  const handleSubmit = useCallback(() => {
    if (currentInput.trim()) {
      onSubmit(currentInput.trim());
      setCurrentInput("");
    }
  }, [currentInput, onSubmit]);

  useInput((input, key) => {
    if (key.return) {
      handleSubmit();
      return;
    }

    if (key.escape) {
      setCurrentInput("");
      return;
    }

    if (key.backspace || key.delete) {
      setCurrentInput((prev) => prev.slice(0, -1));
    } else if (input && !key.ctrl && !key.meta) {
      setCurrentInput((prev) => prev + input);
    }
  });

  return (
    <Box flexDirection="column">
      <Box
        key={currentInput}
        borderStyle="round"
        borderColor="gray"
        paddingX={1}
        paddingY={0}
        marginBottom={1}
        flexShrink={0}
      >
        <InputDisplay currentInput={currentInput} />
      </Box>
      <Box marginX={1}>
        <Text dimColor>
          Type your message, Press Enter to send, Shift+Enter to new line,
          Escape to clear
        </Text>
      </Box>
    </Box>
  );
});

InputSection.displayName = "InputSection";

export default InputSection;
