'use client';


import { motion } from 'framer-motion';
import {
    useParams,
    usePathname,
    useRouter,
} from 'next/navigation';

import { Button } from '@/components';

interface MainHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
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

  const routes = [
    {
      href: `/`,
      label: 'Home',
      active:
        pathname === `/` || pathname === `/`,
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

 // ROUTES FOR AUTH
    // {
    //   href: `/auth/sign-in`,
    //   label: 'Sign In',
    //   active: pathname === `/auth/sign-in`,
    // },
  ];

  const router = useRouter();

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div {...props} className={className}>
        {routes.map((route) => (
          <motion.div
            key={route.href}
            variants={itemVariants}
          >
            <Button
              onClick={() => {
                router.push(route.href);
                closeMenu?.();
              }}
              variant={'link'}
              className={`${
                route.active
                  ? 'underline decoration-yellow underline-offset-8'
                  : ''
              } w-full justify-start`}
            >
              <div className={`${route.active ? 'text-yellow' : 'text-white'} text-base`}>{route.label}</div>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}