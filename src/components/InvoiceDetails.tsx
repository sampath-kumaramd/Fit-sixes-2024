'use client';

import React from 'react';

interface InvoiceDetailsProps {
  id: string | number; // Allow for either string or number
  billTo?: {
    name: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
  }>;
  total: number;
  bankDetails: {
    accountHolder: {
      boc: string;
      commercial: string;
    };
    accountNo: {
      boc: string;
      commercial: string;
    };
    branch: {
      boc: string;
      commercial: string;
    };
    branchCode: {
      boc: string;
      commercial: string;
    };
  };
}

const BankDetails = ({
  bankDetails,
}: {
  bankDetails: InvoiceDetailsProps['bankDetails'];
}) => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <h3 className="font-bold">Bank of Ceylon</h3>
      <p>Account Holder: {bankDetails.accountHolder.boc}</p>
      <p>Account No: {bankDetails.accountNo.boc}</p>
      <p>Bank Name: Bank of Ceylon</p>
      <p>Branch: {bankDetails.branch.boc}</p>
      <p>Branch Code: {bankDetails.branchCode.boc}</p>
    </div>
    <div>
      <h3 className="font-bold">Commercial Bank</h3>
      <p>Account Holder: {bankDetails.accountHolder.commercial}</p>
      <p>Account No: {bankDetails.accountNo.commercial}</p>
      <p>Bank Name: Commercial Bank</p>
      <p>Branch: {bankDetails.branch.commercial}</p>
      <p>Branch Code: {bankDetails.branchCode.commercial}</p>
    </div>
  </div>
);

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  id,
  billTo = { name: 'N/A' }, // Provide a default value
  items,
  total,
  bankDetails,
}) => {
  // Format the invoice ID
  const formattedInvoiceId = React.useMemo(() => {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return `INV-FS24-${numericId.toString().padStart(4, '0')}`;
  }, [id]);

  // Hardcoded signatory details
  const signatory = {
    name: 'Mr. Thushan Fernando',
    position: 'Junior Treasurer',
    faculty: 'Faculty of Information Technology',
    university: 'University of Moratuwa',
  };

  return (
    <div className="mx-auto my-8 max-w-4xl">
      <div className="rounded-lg border-4 border-gray-300 bg-white p-8 font-sans shadow-lg">
        <div className="mb-6 border-b-2 border-[#030835] pb-4">
          <img
            src="/LetterHead.png"
            alt="Letter Head"
            className="mb-4 h-auto max-w-full"
          />
          <h1 className="mt-4 text-3xl font-bold text-[#030835]">INVOICE</h1>
          <p className="text-sm text-[#4B5563]">No. {formattedInvoiceId}</p>
        </div>

        <div className="mb-6 text-sm text-[#4B5563]">
          <p>Students&apos; Union,</p>
          <p>Faculty of Information Technology,</p>
          <p>University of Moratuwa,</p>
          <p>Katubedda,</p>
          <p>Moratuwa,</p>
          <p>Sri Lanka.</p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold text-[#1E40AF]">Bill To:</h2>
          <p className="text-sm text-[#4B5563]">{billTo?.name || 'N/A'}</p>
        </div>

        <div className="mb-8 rounded-lg bg-[#F3F4F6] p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-[#1E40AF]">
            Payment Details
          </h2>
          <h3 className="mb-2 text-lg font-semibold text-[#030835]">
            Invoice Items
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#E5E7EB]">
              <thead>
                <tr className="bg-[#383B5E] bg-opacity-60">
                  <th className="border border-[#E5E7EB] p-2 text-sm font-bold text-[#030835]">
                    Description
                  </th>
                  <th className="border border-[#E5E7EB] p-2 text-sm font-bold text-[#030835]">
                    Quantity
                  </th>
                  <th className="border border-[#E5E7EB] p-2 text-sm font-bold text-[#030835]">
                    Unit Price (Rs.)
                  </th>
                  <th className="border border-[#E5E7EB] p-2 text-sm font-bold text-[#030835]">
                    Total (Rs.)
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-[#E5E7EB] p-2 text-xs">
                      {item.description}
                    </td>
                    <td className="border border-[#E5E7EB] p-2 text-right text-xs">
                      {item.quantity}
                    </td>
                    <td className="border border-[#E5E7EB] p-2 text-right text-xs">
                      {item.unit_price.toLocaleString()}
                    </td>
                    <td className="border border-[#E5E7EB] p-2 text-right text-xs">
                      {item.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td
                    colSpan={3}
                    className="border border-[#E5E7EB] p-2 text-xs"
                  >
                    Total
                  </td>
                  <td className="border border-[#E5E7EB] p-2 text-right text-xs">
                    {total.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mb-2 mt-6 text-lg font-semibold text-[#030835]">
            Bank Details
          </h3>
          <BankDetails bankDetails={bankDetails} />

          {/* <h3 className="mb-2 mt-6 text-lg font-semibold text-[#030835]">
            Signatory Details
          </h3> */}
          <div className="mt-8 border-t-2 pt-4">
            <p className="text-sm font-semibold">{signatory.name}</p>
            <p className="text-sm">
              {signatory.position} | Students&apos; Union
            </p>
            <p className="text-sm">{signatory.faculty}</p>
            <p className="text-sm">{signatory.university}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
