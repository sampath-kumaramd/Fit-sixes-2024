'use client';

import { forwardRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  isSingle?: boolean;
  disableLink?: boolean;
  logoSize?: 'small' | 'large';
}

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    { href = '/', isSingle = true, disableLink = false, className, logoSize = 'large', ...props },
    ref
  ) => {
    const singleLogo = (
      <Image src="/logo/logo-light.svg" alt="logo" width={logoSize === 'large' ? 150 : 25} height={logoSize === 'large' ? 150 : 25} />
    );

    const fullLogo = (
      <Image src="/logo/logo-light.svg" alt="logo" width={53} height={53} />
    );

    const logo = isSingle ? singleLogo : fullLogo;

    if (disableLink) {
      return (
        <div
          ref={ref}
          className={cn('inline-flex items-center', className)}
          {...props}
        >
          {logo}
        </div>
      );
    }
    return (
      <Link href={href} className={cn('inline-flex items-center', className)}>
        <div ref={ref} {...props}>
          {logo}
        </div>
      </Link>
    );
  }
);

Logo.displayName = 'Logo';
