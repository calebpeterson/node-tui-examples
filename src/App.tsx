import React, { useState } from 'react';
import { Text, useSize, Input, View, Frame } from 'react-curse';

const App: React.FC = () => {
  const { width, height } = useSize();
  const [lastInput, setLastInput] = useState("hello world");

  return (
    <Text width={width} height={height} clear background="black">
      <View height={height - 6} focus={false}>
        <Text x={Math.floor((width - lastInput.length) / 2)} y={Math.floor((height - 6) / 2)}>
          {lastInput}
        </Text>
      </View>
      <Frame x={0} y={height - 4} width={width - 2} height={1} type="rounded">
        <Text x={0} y={0}>
          &gt;
        </Text>
        <Input
          x={2}
          width={width - 4}
          height={1}
          focus={true}
          onSubmit={(value) => setLastInput(value || "hello world")}
        />
      </Frame>
    </Text>
  );
};

export default App;