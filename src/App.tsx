import React from 'react';
import { Text, useInput, useSize } from 'react-curse';

const App: React.FC = () => {
  const { width, height } = useSize();
  
  useInput((key) => {
    if (key === 'q') {
      process.exit(0);
    }
  });

  const message = "hello world";
  const centerX = Math.max(0, Math.floor((width - message.length) / 2));
  const centerY = Math.max(0, Math.floor(height / 2));

  return (
    <Text x={centerX} y={centerY}>
      {message}
    </Text>
  );
};

export default App;