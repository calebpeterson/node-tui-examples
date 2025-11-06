import React, { useState } from "react";
import { Text, useSize, Input, View, Frame, Block, useWordWrap } from "react-curse";

interface Message {
  content: string;
  role: "user" | "agent";
}

interface MessageDisplayProps {
  message: Message;
  width: number;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ message, width }) => {
  const isUser = message.role === "user";
  const align = isUser ? "right" : "left";

  return (
    <Block align={align} width={width}>
      {message.content}
    </Block>
  );
};

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
  ]);

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
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          const alignX = isUser ? width - msg.content.length : 0;

          return (
            <Text key={index} x={alignX} block>
              {msg.content}
            </Text>
          );
        })}
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
