import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { HiLogout } from "react-icons/hi";

function ChatBar() {
  const router = useRouter();
  const { conversationId } = router.query;

  return (
    <div className="h-20 flex justify-center items-center  px-4 pt-7">
      <div className="flex-1 flex items-center space-x-3">
        <div className="bg-accent h-14 w-14 rounded-full"></div>
        <div className="py-5">
          <h1 className="leading-5 text-xl mt-2">{conversationId}</h1>
          <h1 className="leading-5 text-sm text-neutral-400">3 km away</h1>
        </div>
      </div>
      <button
        onClick={() => {
          signOut();
        }}
      >
        <HiLogout className="text-3xl" />
      </button>
    </div>
  );
}

export default ChatBar;
