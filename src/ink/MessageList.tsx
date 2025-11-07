import React, { memo } from "react";
import MessageDisplay from "./MessageDisplay";
import { Static } from "ink";

interface Message {
  id: string;
  content: string;
  role: "user" | "agent";
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = memo(({ messages }) => {
  return (
    <Static items={messages}>
      {(message: Message) => <MessageDisplay key={message.id} {...message} />}
    </Static>
  );
});

MessageList.displayName = "MessageList";

export default MessageList;
