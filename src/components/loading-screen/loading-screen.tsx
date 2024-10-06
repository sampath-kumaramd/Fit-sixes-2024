'use client';

import * as React from 'react';

import { createPortal } from 'react-dom';

import { cn } from "@/lib/utils";

import { Progress } from '../ui/progress';



interface LoadingScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  portal?: boolean;
}

export function LoadingScreen({ portal, className, ...props }: LoadingScreenProps) {
  const content = (
    <div
      className={cn(
        "fixed inset-0 z-50 px-5 w-full flex-grow min-h-screen flex items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <Progress className="w-full max-w-[360px]" value={33} />
    </div>
  );

  if (portal && typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }

  return content;
}