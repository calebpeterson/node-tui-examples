import React, { useState } from "react";
import { render, Box, Text, useInput, Static } from "ink";

interface EchoMessage {
  id: string;
  content: string;
}

const EchoApp: React.FC = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [echoedMessages, setEchoedMessages] = useState<EchoMessage[]>([]);

  useInput((input, key) => {
    if (key.return) {
      if (currentInput.trim()) {
        const newMessage: EchoMessage = {
          id: `${Date.now()}`,
          content: currentInput.trim(),
        };
        setEchoedMessages((prev) => [...prev, newMessage]);
        setCurrentInput("");
      }
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
      {echoedMessages.length > 0 && (
        <Static items={echoedMessages}>
          {(msg: EchoMessage) => (
            <Box key={msg.id} marginLeft={2}>
              <Text color="cyan">→ {msg.content}</Text>
            </Box>
          )}
        </Static>
      )}

      <Box borderStyle="round" borderColor="green" paddingX={1} paddingY={0}>
        <Text>
          <Text color="green">&gt; </Text>
          {currentInput ? (
            <>
              <Text>{currentInput}</Text>
              <Text inverse> </Text>
            </>
          ) : (
            <Text dimColor italic>
              Type something and press Enter to echo it back
            </Text>
          )}
        </Text>
      </Box>

      <Box paddingX={3}>
        <Text dimColor italic>
          Press Enter to echo • Escape to clear • Ctrl+C to exit
        </Text>
      </Box>
    </>
  );
};

console.clear();
render(<EchoApp />);
