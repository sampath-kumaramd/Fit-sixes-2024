'use client';

import React from 'react';

interface InvoiceDetailsProps {
  invoiceNumber: string;
  billTo: {
    name: string;
    address: string[];
  };
  packageInfo: {
    item: string;
    price: number;
  };
  bankDetails: {
    accountHolder: string;
    accountNo: string;
    bankName: string;
    branch: string;
    branchCode: string;
  };
  signatory: {
    name: string;
    position: string;
    faculty: string;
    university: string;
  };
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  invoiceNumber,
  billTo,
  packageInfo,
  bankDetails,
  signatory,
}) => {
  return (
    <div className="mx-auto my-8 max-w-2xl rounded-lg border-4 border-gray-300 bg-white p-8 shadow-lg">
      <div className="mb-4 text-right">
        <img
          src="/LetterHead.png"
          alt="Letter Head"
          className="mb-4 h-auto max-w-full"
        />
        <h1 className="text-xl font-bold">INVOICE No. {invoiceNumber}</h1>
      </div>

      <div className="mb-6">
        <p>Students&apos; Union,</p>
        <p>Faculty of Information Technology,</p>
        <p>University of Moratuwa,</p>
        <p>Katubedda,</p>
        <p>Moratuwa,</p>
        <p>Sri Lanka.</p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 font-bold">Bill To:</h2>
        <p>{billTo.name}</p>
        {billTo.address.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="mb-2 font-bold">Payment Details</h2>
        <h3 className="mb-2 font-semibold">Package Information</h3>
        <table className="mb-4 w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-right">Price (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">{packageInfo.item}</td>
              <td className="border p-2 text-right">
                {packageInfo.price.toLocaleString()}
              </td>
            </tr>
            <tr className="font-bold">
              <td className="border p-2">Sub Total</td>
              <td className="border p-2 text-right">
                {packageInfo.price.toLocaleString()}
              </td>
            </tr>
            <tr className="font-bold">
              <td className="border p-2">Total</td>
              <td className="border p-2 text-right">
                {packageInfo.price.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="mb-2 font-semibold">Bank Details</h3>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="border p-2 font-semibold">Account Holder</td>
              <td className="border p-2">{bankDetails.accountHolder}</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">Account No.</td>
              <td className="border p-2">{bankDetails.accountNo}</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">Bank Name</td>
              <td className="border p-2">{bankDetails.bankName}</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">Branch</td>
              <td className="border p-2">{bankDetails.branch}</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">Branch Code</td>
              <td className="border p-2">{bankDetails.branchCode}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <div className="mb-2 w-64 border-b border-black"></div>
        <p className="font-semibold">{signatory.name}</p>
        <p>{signatory.position} | Students&apos; Union</p>
        <p>{signatory.faculty}</p>
        <p>{signatory.university}</p>
      </div>
    </div>
  );
};

export default InvoiceDetails;
