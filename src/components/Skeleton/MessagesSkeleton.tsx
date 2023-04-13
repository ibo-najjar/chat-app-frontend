import React from "react";
import TextSkeleton from "./TextSkeleton";

const MessagesSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index}>
          <div className="w-full flex space-x-3 px-3 py-1 items-center hover:bg-secondary group">
            <TextSkeleton width="40px" height="40px" className="rounded-full" />

            <div className="flex flex-col space-y-1 w-full max-w-3xl">
              <TextSkeleton width="50%" height="24px" className="rounded-xl" />
            </div>
          </div>
          <div className="w-full flex space-x-3 px-3 py-1 items-center hover:bg-secondary group">
            <TextSkeleton width="40px" height="40px" className="rounded-full" />

            <div className="flex flex-col space-y-1 w-full max-w-3xl">
              <TextSkeleton width="50%" height="24px" className="rounded-xl" />
            </div>
          </div>
          <div className="w-full flex space-x-3 px-3 py-1 items-center hover:bg-secondary group">
            <TextSkeleton width="40px" height="40px" className="rounded-full" />

            <div className="flex flex-col space-y-1 w-full max-w-3xl">
              <div className="flex space-x-4 w-full items-center">
                <TextSkeleton
                  width="90px"
                  height="24px"
                  className="rounded-xl"
                />
                <TextSkeleton
                  width="70px"
                  height="16px"
                  className="rounded-xl"
                />
              </div>

              <TextSkeleton width="50%" height="24px" className="rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MessagesSkeleton;
