import { ReactNode, Suspense } from "react";

export default function Container(props: { children: ReactNode }) {
  const { children } = props;
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

export function Loading() {
  return (
    <div className="w-full h-full flex space-x-2 justify-center items-center bg-white dark:invert">
      <div className="h-3 w-3 bg-black rounded-full animate-loading [animation-delay:-0.3s]"></div>
      <div className="h-3 w-3 bg-black rounded-full animate-loading [animation-delay:-0.15s]"></div>
      <div className="h-3 w-3 bg-black rounded-full animate-loading"></div>
    </div>
  );
}

