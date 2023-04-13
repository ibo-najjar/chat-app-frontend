import React from "react";

interface ITextSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  lines?: number;
}

const TextSkeleton: React.FC<ITextSkeletonProps> = ({
  width,
  height,
  className,
  lines,
}) => {
  return (
    <>
      {Array.from(Array(lines || 1)).map((_, i) => (
        <div
          className={`animate-pulse bg-neutral-700 ` + className}
          style={{ width: width, height: height }}
          key={i}
        ></div>
      ))}
    </>
  );
};

export default TextSkeleton;
