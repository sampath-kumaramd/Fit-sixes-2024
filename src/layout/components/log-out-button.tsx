'use client';

import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components';
import api from '@/utils/api';

export default function LogOutButton() {
  const router = useRouter();

  const handleLogOut = async () => {
    const accessToken = localStorage.getItem('accessToken');

    console.log(accessToken);
    
    if (!accessToken) {
      return;
    }
    
    try {
      const response = await api.post('/api/v1/auth/logout/', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('companyData');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button 
      variant="outline" 
      className="text-white border-white hover:bg-white hover:text-darkBlue bg-darkBlue" 
      onClick={handleLogOut}
    >
      <LogOutIcon className="w-4 h-4" /> 
    </Button>
  );
}
