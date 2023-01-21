import { Session } from "next-auth";
import React, { useState } from "react";
import { AiOutlineGif } from "react-icons/ai";

interface IMessageBoxProps {
  session: Session;
  conversationId: string;
}

const MessageBox = ({ session, conversationId }: IMessageBoxProps) => {
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(message);
    setMessage("");
    try {
      // call mutation
    } catch (e: any) {
      console.log("on send message error", e);
      // toast
    }
  };
  return (
    <div className="h-24 px-4 py-4 pb-7">
      <form
        className="w-full h-full bg-secondary rounded-2xl px-5 text-ptext flex items-center"
        onSubmit={onSubmit}
      >
        <input
          className="w-full h-full bg-transparent text-gray-50 outline-none flex-1"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <AiOutlineGif className="text-3xl" />
      </form>
    </div>
  );
};

export default MessageBox;
