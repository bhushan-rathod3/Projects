import React from "react";

type SkeletonProps = {
  count: number;
};

export const Skeleton: React.FC<SkeletonProps> = ({ count }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-loader" />
      ))}
    </div>
  );
};
