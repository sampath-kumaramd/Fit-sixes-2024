import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

interface EmailVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailVerificationDialog: React.FC<EmailVerificationDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md">
        <h3 className="text-xl font-bold mb-4 ">Email Verification Required! 🔒</h3>
        <p className="mb-6">
          Your email address has not been verified. Please check your email for a verification link or contact support for assistance.
        </p>

        <div className="flex justify-end gap-8">
              <Link href="/contact-us">
              <Button variant="outline">
                Contact Us
              </Button>
              </Link>
                  
        <button
          onClick={onClose}
          className=" bg-darkBlue text-white px-4 py-2 rounded hover:bg-blue-900 "
        >
          Close
        </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationDialog;
