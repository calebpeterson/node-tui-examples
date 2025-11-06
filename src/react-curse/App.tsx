import React, { useState, Fragment } from "react";
import {
  Text,
  useSize,
  Input,
  View,
  Frame,
  useWordWrap,
  useMouse,
} from "react-curse";

interface Message {
  content: string;
  role: "user" | "agent";
}

const App: React.FC = () => {
  const { width, height } = useSize();
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello! How can I help you today?", role: "agent" },
    { content: "I'd like to learn about React", role: "user" },
    {
      content:
        "Great! React is a JavaScript library for building user interfaces. What specifically would you like to know?",
      role: "agent",
    },
    { content: "How do I create a component?", role: "user" },
    {
      content:
        "You can create a React component by writing a function that returns JSX. For example: function MyComponent() { return <div>Hello!</div>; }",
      role: "agent",
    },
    {
      content: "What about props? How do I pass data to components?",
      role: "user",
    },
    {
      content:
        "Props are arguments passed to React components. You can pass them like HTML attributes: <MyComponent name='John' age={25} />. Then access them in your component: function MyComponent(props) { return <div>Hello {props.name}, you are {props.age} years old!</div>; }",
      role: "agent",
    },
    {
      content: "Can you show me how to use state in a component?",
      role: "user",
    },
    {
      content:
        "Sure! You can use the useState hook for state management. Import it first: import { useState } from 'react'. Then in your component: const [count, setCount] = useState(0). Now you have a count state variable and setCount function to update it.",
      role: "agent",
    },
    { content: "How do I handle events like button clicks?", role: "user" },
    {
      content:
        "You can handle events by passing event handler functions to JSX elements. For example: <button onClick={() => setCount(count + 1)}>Click me</button>. The onClick prop receives a function that runs when the button is clicked.",
      role: "agent",
    },
    {
      content: "What's the difference between functional and class components?",
      role: "user",
    },
    {
      content:
        "Functional components are simpler and use hooks for state and lifecycle methods. Class components use ES6 classes and have built-in lifecycle methods. Modern React development favors functional components with hooks as they're more concise and easier to test.",
      role: "agent",
    },
    { content: "How do I use useEffect for side effects?", role: "user" },
    {
      content:
        "useEffect lets you perform side effects in functional components. Import it with useState: import { useState, useEffect } from 'react'. Basic usage: useEffect(() => { console.log('Component mounted or updated'); }). You can also specify dependencies: useEffect(() => { fetchData(); }, [userId]) will only run when userId changes.",
      role: "agent",
    },
    {
      content: "What are React keys and why are they important?",
      role: "user",
    },
    {
      content:
        "Keys help React identify which list items have changed, been added, or removed. They should be stable, predictable, and unique among siblings. Use them when rendering lists: {items.map(item => <li key={item.id}>{item.name}</li>)}. Avoid using array indices as keys when the list can change.",
      role: "agent",
    },
    { content: "How do I handle forms in React?", role: "user" },
    {
      content:
        "For controlled components, use state to manage form values: const [name, setName] = useState(''); then <input value={name} onChange={(e) => setName(e.target.value)} />. Handle form submission with onSubmit: <form onSubmit={handleSubmit}>. This gives you full control over form data and validation.",
      role: "agent",
    },
    { content: "What's the difference between props and state?", role: "user" },
    {
      content:
        "Props are read-only data passed from parent to child components - they're like function parameters. State is internal data that a component manages and can change over time. Props flow down, state is local. When state changes, the component re-renders. When props change, the component also re-renders.",
      role: "agent",
    },
    { content: "How do I make API calls in React?", role: "user" },
    {
      content:
        "Use useEffect with fetch or axios for API calls. Example: useEffect(() => { fetch('/api/users').then(res => res.json()).then(data => setUsers(data)); }, []). The empty dependency array means it runs once on mount. For user-triggered calls, put the fetch in event handlers instead of useEffect.",
      role: "agent",
    },
  ]);

  const [scrollOffset, setScrollOffset] = useState(0);

  useMouse(({ type, x, y }) => {
    const maxScroll = Math.max(0, messages.length * 4 - (height - 6));
    
    if (type === "wheelup") {
      setScrollOffset((prev) => prev + 3);
    } else if (type === "wheeldown") {
      setScrollOffset((prev) => Math.max(0, prev - 3));
    }
    
    setScrollOffset((prev) => Math.min(prev, maxScroll));
  });

  const handleSubmit = (value: string) => {
    if (value.trim()) {
      const userMessage: Message = { content: value, role: "user" };
      const agentMessage: Message = { content: value, role: "agent" };

      setMessages((prev) => [...prev, userMessage, agentMessage]);
    }
  };

  return (
    <>
      <View height={height - 6} width="100%" focus={false}>
        <Text y={-scrollOffset}>
          {messages.map((msg, index) => {
            const isUser = msg.role === "user";
            const maxWidth = Math.floor(width * 0.8);
            const wrappedContent = useWordWrap(msg.content, maxWidth);
            const lines = wrappedContent.split("\n");
            const frameHeight = lines.length;
            const frameWidth = Math.max(...lines.map((line) => line.length));
            const alignX = isUser ? width - frameWidth - 2 : 0;
            const color = isUser ? "blue" : "white";

            return (
              <Fragment key={index}>
                <Frame
                  x={alignX}
                  width={frameWidth}
                  height={frameHeight}
                  type="rounded"
                  color={color}
                >
                  <Text color={color}>{wrappedContent}</Text>
                </Frame>
                {index < messages.length - 1 && <Text block> </Text>}
              </Fragment>
            );
          })}
        </Text>
      </View>
      <Frame x={0} y={height - 6} width={width - 2} height={4} type="rounded">
        <Text x={0} y={0}>
          &gt;
        </Text>
        <Input
          x={2}
          width={width - 4}
          height={4}
          focus={true}
          onSubmit={handleSubmit}
        />
      </Frame>
    </>
  );
};

export default App;
