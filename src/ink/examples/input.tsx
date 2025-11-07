import { useState } from "react";
import { render, Text, useInput, Box } from "ink";

const InputExample = () => {
  const [inputs, setInputs] = useState<unknown[]>([]);

  useInput((input, key) => {
    setInputs((prev) => [...prev, { input, key }]);
  });

  return (
    <Box flexDirection="column" height={process.stdout.rows - 1}>
      <Text color="green">{JSON.stringify(inputs, null, 2)}</Text>
      <Text color="green">
        <Text color="green">Press any key to see the input</Text>
      </Text>
    </Box>
  );
};

render(<InputExample />);
