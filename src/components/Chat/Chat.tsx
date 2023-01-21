import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import FeedWrapper from "./Feed/Feed";
import ChatBar from "./Feed/ChatBar";
import Feed from "./Feed/Feed";
import MessageBox from "./Feed/MessageBox";
import ConversationsWrapper from "./Conversation/Conversation";
import UserOperations from "../../graphql/operations/user";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

interface IChatProps {
  session: Session;
}

const Chat: React.FC<IChatProps> = ({ session }) => {
  const [setLocation, { loading, error }] = useMutation<any, any>(
    UserOperations.Mutations.setLocation
  );
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  const onClick = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude.toString());
      setLongitude(position.coords.longitude.toString());
    });
    try {
      if (!latitude || !longitude) {
        return;
      }
      const { data, errors } = await setLocation({
        variables: {
          latitude: latitude,
          longitude: longitude,
        },
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (session?.user?.latitude) {
      return;
    }
    onClick();
  }, []);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="min-h-screen w-60 bg-neutral-700">
        <ConversationsWrapper session={session} />
      </div>
      <div className="flex flex-col min-h-screen flex-1 px-2">
        <Feed session={session} />
        <button onClick={onClick}>Set Location</button>
      </div>
    </div>
  );
};

export default Chat;
