'use client';
import { Portal } from '@radix-ui/react-select';

import { cn } from '@/lib/utils';

import { AnimateLogo1 } from '../animate';

// ----------------------------------------------------------------------

interface SplashScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  portal?: boolean;
}

export function SplashScreen({
  portal = true,
  className,
  ...props
}: SplashScreenProps) {
  const content = (
    <div className="overflow-hidden">
      <div
        className={cn(
          'fixed inset-0 z-[9998] flex items-center justify-center bg-darkBlue',
          className
        )}
        {...props}
      >
        <AnimateLogo1 />
      </div>
    </div>
  );

  if (portal) {
    return <Portal>{content}</Portal>;
  }

  return content;
}
