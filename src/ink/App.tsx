import React, { useState, useCallback } from 'react';
import { Box, Text, useInput, useStdout } from 'ink';
import MessageDisplay from './MessageDisplay.tsx';

interface Message {
  content: string;
  role: 'user' | 'agent';
}

const App: React.FC = () => {
  const { stdout } = useStdout();
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello! How can I help you today?", role: "agent" },
    { content: "I'd like to learn about React", role: "user" },
    {
      content: "Great! React is a JavaScript library for building user interfaces. What specifically would you like to know?",
      role: "agent",
    },
    { content: "How do I create a component?", role: "user" },
    {
      content: "You can create a React component by writing a function that returns JSX. For example: function MyComponent() { return <div>Hello!</div>; }",
      role: "agent",
    },
    {
      content: "What about props? How do I pass data to components?",
      role: "user",
    },
    {
      content: "Props are arguments passed to React components. You can pass them like HTML attributes: <MyComponent name='John' age={25} />. Then access them in your component: function MyComponent(props) { return <div>Hello {props.name}, you are {props.age} years old!</div>; }",
      role: "agent",
    },
    {
      content: "Can you show me how to use state in a component?",
      role: "user",
    },
    {
      content: "Sure! You can use the useState hook for state management. Import it first: import { useState } from 'react'. Then in your component: const [count, setCount] = useState(0). Now you have a count state variable and setCount function to update it.",
      role: "agent",
    },
    { content: "How do I handle events like button clicks?", role: "user" },
    {
      content: "You can handle events by passing event handler functions to JSX elements. For example: <button onClick={() => setCount(count + 1)}>Click me</button>. The onClick prop receives a function that runs when the button is clicked.",
      role: "agent",
    },
  ]);

  const [currentInput, setCurrentInput] = useState('');
  const [inputMode, setInputMode] = useState(false);

  const handleSubmit = useCallback(() => {
    if (currentInput.trim()) {
      const userMessage: Message = { content: currentInput.trim(), role: 'user' };
      const agentMessage: Message = { content: currentInput.trim(), role: 'agent' };
      
      setMessages(prev => [...prev, userMessage, agentMessage]);
      setCurrentInput('');
      setInputMode(false);
    }
  }, [currentInput]);

  useInput((input, key) => {
    if (key.return && inputMode) {
      handleSubmit();
      return;
    }
    
    if (key.escape) {
      setInputMode(false);
      setCurrentInput('');
      return;
    }
    
    if (!inputMode && input === 'i') {
      setInputMode(true);
      return;
    }
    
    if (inputMode) {
      if (key.backspace || key.delete) {
        setCurrentInput(prev => prev.slice(0, -1));
      } else if (input && !key.ctrl && !key.meta) {
        setCurrentInput(prev => prev + input);
      }
    }
  });

  const visibleMessages = messages.slice(-Math.max(1, stdout.rows - 8));

  return (
    <Box flexDirection="column" height={stdout.rows} width={stdout.columns}>
      {/* Messages area */}
      <Box flexDirection="column" flexGrow={1} paddingX={1} paddingY={1}>
        {visibleMessages.map((msg, index) => (
          <MessageDisplay key={index} message={msg} />
        ))}
      </Box>
      
      {/* Input area */}
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
            {inputMode ? 'Press Enter to send, Escape to cancel' : "Press 'i' to input message"}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default App;