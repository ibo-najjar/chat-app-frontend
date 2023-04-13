import { sendMessageAruments } from "@/../backend/src/util/types";
import { useMutation } from "@apollo/client";
import { Session } from "next-auth";
import React, { useState } from "react";
import { AiOutlineGif } from "react-icons/ai";
import MessageOperations from "../../../graphql/operations/messages";
import { ObjectID } from "bson";

interface IMessageBoxProps {
  session: Session;
  conversationId: string;
}

const MessageBox = ({ session, conversationId }: IMessageBoxProps) => {
  const [message, setMessage] = useState<string>("");
  const [sendMessage] = useMutation<
    { sendMessage: boolean },
    sendMessageAruments
  >(MessageOperations.Mutation.sendMessage);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log(message);
    //setMessage("");

    if (message.trim() === "") return;

    try {
      const { id: senderId } = session.user;
      const messageId = new ObjectID().toString();
      const newMessage: sendMessageAruments = {
        id: messageId,
        senderId,
        imageUrl: session.user.imageUrl as string,
        conversationId,
        body: message,
      };

      setMessage("");

      const { data, errors } = await sendMessage({
        variables: { ...newMessage },
        optimisticResponse: {
          sendMessage: true,
        },
        update: (cache) => {
          const existing = cache.readQuery<any>({
            query: MessageOperations.Query.messages,
            variables: {
              conversationId,
            },
          });
          // if (!existing) return;
          cache.writeQuery<any, any>({
            query: MessageOperations.Query.messages,
            variables: {
              conversationId,
            },
            data: {
              ...existing,
              messages: [
                {
                  id: messageId,
                  body: message,
                  senderId: session.user.id,
                  conversationId,
                  sender: {
                    id: session.user.id,
                    username: session.user.username,
                    imageUrl: session.user.imageUrl, // TODO: fix this
                  },
                  createdAt: new Date(Date.now()),
                  updatedAt: new Date(Date.now()),
                },
                ...existing.messages,
              ],
            },
          });
        },
      });
      if (!data?.sendMessage || errors) {
        throw new Error("Failed to send message");
      }
    } catch (e: any) {
      console.log("on send message error", e);
      // toast
    }
  };
  return (
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
  );
};

export default MessageBox;
