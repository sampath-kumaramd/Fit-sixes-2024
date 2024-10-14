import React from 'react';

interface InvoiceProps {
  invoiceNumber: string;
  senderAddress: string[];
  items: { description: string; price: number }[];
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifscCode: string;
  };
  signatory: {
    name: string;
    title: string;
    department: string;
    institution: string;
    signatureImageUrl: string; // Added for signature image
  };
}

const Invoice: React.FC<InvoiceProps> = ({
  invoiceNumber,
  senderAddress,
  items,
  bankDetails,
  signatory,
}) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mx-auto max-w-3xl bg-white p-8 shadow-lg">
      {/* Header Image */}
      <div className="mb-8">
        <img
          src="/api/placeholder/800/200"
          alt="Header"
          className="h-auto w-full"
        />
      </div>

      {/* Invoice Details */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">
          INVOICE No. {invoiceNumber}
        </h2>
        <h3 className="mb-2 font-semibold">Sender:</h3>
        {senderAddress.map((line, index) => (
          <p key={index} className="mb-1">
            {line}
          </p>
        ))}
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <h3 className="mb-2 font-semibold">Items:</h3>
        <table className="mb-4 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-right">Price (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="p-2">{item.description}</td>
                <td className="p-2 text-right">{item.price.toFixed(2)}</td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="p-2 text-right">Total:</td>
              <td className="p-2 text-right">{total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bank Details */}
      <div className="mb-8">
        <h3 className="mb-2 font-semibold">Bank Details:</h3>
        <table className="w-full">
          <tbody>
            {Object.entries(bankDetails).map(([key, value]) => (
              <tr key={key}>
                <td className="p-1 font-medium">{key}</td>
                <td className="p-1">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signature */}
      <div className="mt-16">
        <img
          src={signatory.signatureImageUrl}
          alt={`Signature of ${signatory.name}`}
          className="mb-2 h-16 w-auto"
        />
        <p>{signatory.name}</p>
        <p>{signatory.title}</p>
        <p>{signatory.department}</p>
        <p>{signatory.institution}</p>
      </div>
    </div>
  );
};

export default Invoice;
