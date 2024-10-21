'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components';

interface MainHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  closeMenu?: () => void;
}

export function MainHeader({
  className,
  closeMenu,
  ...props
}: MainHeaderProps) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(pathname === '/auth/dashboard');
  }, [pathname]);

  const routes = [
    {
      href: `/`,
      label: 'Home',
      active: pathname === `/` || pathname === `/`,
    },
    {
      href: `/about`,
      label: 'About',
      active: pathname === `/about`,
    },
    {
      href: `/contact-us`,
      label: 'Contact Us',
      active: pathname === `/contact-us`,
    },

    //  ROUTES FOR AUTH
    {
      href: isAuthenticated ? '/' : '/auth/sign-in',
      label: isAuthenticated ? 'Sign Out' : 'Sign In',
      active: pathname === '/auth/sign-in',
    },
  ];

  const handleSignOut = () => {
    // Clear local storage
    localStorage.clear();

    // Clear cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });

    // Redirect to home page
    router.push('/');
    closeMenu?.();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div {...props} className={className}>
        {routes.map((route) => (
          <motion.div key={route.href} variants={itemVariants}>
            <Button
              onClick={() => {
                if (isAuthenticated && route.label === 'Sign Out') {
                  handleSignOut();
                } else {
                  router.push(route.href);
                  closeMenu?.();
                }
              }}
              variant={'link'}
              className={`${
                route.active
                  ? 'underline decoration-yellow underline-offset-8'
                  : ''
              } w-full justify-start`}
            >
              <div
                className={`${route.active ? 'text-yellow' : 'text-white'} text-base`}
              >
                {route.label}
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
