import TextSkeleton from "./TextSkeleton";

const ConversationSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          className="flex items-center space-x-2 py-2 px-3 cursor-pointer hover:bg-secondary flex-shrink-0"
          key={index}
        >
          <TextSkeleton width="40px" height="40px" className="rounded-full" />
          <div className="flex-1 flex flex-col space-y-1">
            <TextSkeleton width="50%" height="15px" className="rounded-xl" />
            <TextSkeleton width="75%" height="13px" className="rounded-xl" />
          </div>
        </div>
      ))}
    </>
  );
};

export default ConversationSkeleton;
