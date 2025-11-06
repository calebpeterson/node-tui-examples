import React, { memo, useState, useCallback } from "react";
import { Box, Text, useInput } from "ink";
import InputDisplay from "./InputDisplay.tsx";

interface InputSectionProps {
  onSubmit: (message: string) => void;
  rawModeSupported: boolean;
}

const InputSection: React.FC<InputSectionProps> = memo(
  ({ onSubmit, rawModeSupported }) => {
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
              ? "Raw mode not supported - input disabled"
              : "Type your message, Press Enter to send, Escape to clear"}
          </Text>
        </Box>
      </>
    );
  }
);

InputSection.displayName = "InputSection";

export default InputSection;
