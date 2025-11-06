import React, { useState, useCallback, useMemo } from 'react';
import { Box, useInput } from 'ink';
import MessageList from './MessageList.tsx';
import InputSection from './InputSection.tsx';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'agent';
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: "Hello! How can I help you today?", role: "agent" },
    { id: '2', content: "I'd like to learn about React", role: "user" },
    {
      id: '3',
      content: "Great! React is a JavaScript library for building user interfaces. What specifically would you like to know?",
      role: "agent",
    },
    { id: '4', content: "How do I create a component?", role: "user" },
    {
      id: '5',
      content: "You can create a React component by writing a function that returns JSX. For example: function MyComponent() { return <div>Hello!</div>; }",
      role: "agent",
    },
    {
      id: '6',
      content: "What about props? How do I pass data to components?",
      role: "user",
    },
    {
      id: '7',
      content: "Props are arguments passed to React components. You can pass them like HTML attributes: <MyComponent name='John' age={25} />. Then access them in your component: function MyComponent(props) { return <div>Hello {props.name}, you are {props.age} years old!</div>; }",
      role: "agent",
    },
    {
      id: '8',
      content: "Can you show me how to use state in a component?",
      role: "user",
    },
    {
      id: '9',
      content: "Sure! You can use the useState hook for state management. Import it first: import { useState } from 'react'. Then in your component: const [count, setCount] = useState(0). Now you have a count state variable and setCount function to update it.",
      role: "agent",
    },
    { id: '10', content: "How do I handle events like button clicks?", role: "user" },
    {
      id: '11',
      content: "You can handle events by passing event handler functions to JSX elements. For example: <button onClick={() => setCount(count + 1)}>Click me</button>. The onClick prop receives a function that runs when the button is clicked.",
      role: "agent",
    },
  ]);

  const [currentInput, setCurrentInput] = useState('');

  const inputSectionProps = useMemo(() => ({
    currentInput,
    rawModeSupported: true
  }), [currentInput]);

  const handleSubmit = useCallback(() => {
    if (currentInput.trim()) {
      const timestamp = Date.now();
      const userMessage: Message = { 
        id: `${timestamp}-user`, 
        content: currentInput.trim(), 
        role: 'user' 
      };
      const agentMessage: Message = { 
        id: `${timestamp}-agent`, 
        content: currentInput.trim(), 
        role: 'agent' 
      };
      
      setMessages(prev => [...prev, userMessage, agentMessage]);
      setCurrentInput('');
    }
  }, [currentInput]);

  useInput((input, key) => {
    if (key.return) {
      handleSubmit();
      return;
    }
    
    if (key.escape) {
      setCurrentInput('');
      return;
    }
    
    if (key.backspace || key.delete) {
      setCurrentInput(prev => prev.slice(0, -1));
    } else if (input && !key.ctrl && !key.meta) {
      setCurrentInput(prev => prev + input);
    }
  });


  return (
    <Box flexDirection="column">
      <MessageList messages={messages} />
      <InputSection {...inputSectionProps} />
    </Box>
  );
};

export default App;