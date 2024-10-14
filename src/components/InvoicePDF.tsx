// 'use client';

// import React from 'react';

// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Font,
//   pdf,
// } from '@react-pdf/renderer';

// // Register custom font
// Font.register({
//   family: 'Roboto',
//   src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
// });

// const styles = StyleSheet.create({
//   page: {
//     fontFamily: 'Roboto',
//     fontSize: 12,
//     padding: 30,
//   },
//   header: {
//     marginBottom: 20,
//   },
//   invoiceNumber: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'right',
//   },
//   address: {
//     marginBottom: 20,
//   },
//   billTo: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   table: {
//     display: 'flex',
//     width: 'auto',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//   },
//   tableRow: {
//     margin: 'auto',
//     flexDirection: 'row',
//   },
//   tableCol: {
//     width: '50%',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//   },
//   tableCell: {
//     margin: 5,
//     fontSize: 10,
//   },
//   tableCellLeft: {
//     margin: 5,
//     fontSize: 10,
//     textAlign: 'left',
//   },
//   tableCellRight: {
//     margin: 5,
//     fontSize: 10,
//     textAlign: 'right',
//   },
//   signature: {
//     marginTop: 50,
//   },
//   signatureLine: {
//     width: 200,
//     borderBottomWidth: 1,
//     borderBottomColor: '#000000',
//     marginBottom: 5,
//   },
// });

// interface InvoicePDFProps {
//   invoiceNumber: string;
//   billTo: {
//     name: string;
//     address: string[];
//   };
//   packageInfo: {
//     item: string;
//     price: number;
//   };
//   bankDetails: {
//     accountHolder: string;
//     accountNo: string;
//     bankName: string;
//     branch: string;
//     branchCode: string;
//   };
//   signatory: {
//     name: string;
//     position: string;
//     faculty: string;
//     university: string;
//   };
// }

// const InvoicePDF: React.FC<InvoicePDFProps> = ({
//   invoiceNumber,
//   billTo,
//   packageInfo,
//   bankDetails,
//   signatory,
// }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.header}>
//         <Text style={styles.invoiceNumber}>INVOICE No. {invoiceNumber}</Text>
//       </View>

//       <View style={styles.address}>
//         <Text>Students&apos; Union,</Text>
//         <Text>Faculty of Information Technology,</Text>
//         <Text>University of Moratuwa,</Text>
//         <Text>Katubedda,</Text>
//         <Text>Moratuwa,</Text>
//         <Text>Sri Lanka.</Text>
//       </View>

//       <View style={styles.billTo}>
//         <Text style={styles.sectionTitle}>Bill To:</Text>
//         <Text>{billTo.name}</Text>
//         {billTo.address.map((line, index) => (
//           <Text key={index}>{line}</Text>
//         ))}
//       </View>

//       <View>
//         <Text style={styles.sectionTitle}>Payment Details</Text>
//         <Text style={[styles.sectionTitle, { fontSize: 12 }]}>
//           Package Information
//         </Text>
//         <View style={styles.table}>
//           <View style={styles.tableRow}>
//             <View style={[styles.tableCol, { backgroundColor: '#e4e4e4' }]}>
//               <Text style={styles.tableCellLeft}>Item</Text>
//             </View>
//             <View style={[styles.tableCol, { backgroundColor: '#e4e4e4' }]}>
//               <Text style={styles.tableCellRight}>Price (Rs.)</Text>
//             </View>
//           </View>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCellLeft}>{packageInfo.item}</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCellRight}>
//                 {packageInfo.price.toLocaleString()}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCol}>
//               <Text style={[styles.tableCellLeft, { fontWeight: 'bold' }]}>
//                 Sub Total
//               </Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={[styles.tableCellRight, { fontWeight: 'bold' }]}>
//                 {packageInfo.price.toLocaleString()}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCol}>
//               <Text style={[styles.tableCellLeft, { fontWeight: 'bold' }]}>
//                 Total
//               </Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={[styles.tableCellRight, { fontWeight: 'bold' }]}>
//                 {packageInfo.price.toLocaleString()}
//               </Text>
//             </View>
//           </View>
//         </View>

//         <Text style={[styles.sectionTitle, { fontSize: 12, marginTop: 20 }]}>
//           Bank Details
//         </Text>
//         <View style={styles.table}>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCellLeft}>Account Holder</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCellLeft}>
//                 {bankDetails.accountHolder}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCellLeft}>Account No.</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCellLeft}>{bankDetails.accountNo}</Text>
//             </View>
//           </View>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCellLeft}>Bank Name</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCellLeft}>{bankDetails.bankName}</Text>
//             </View>
//           </View>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCellLeft}>Branch</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCellLeft}>{bankDetails.branch}</Text>
//             </View>
//           </View>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCellLeft}>Branch Code</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCellLeft}>{bankDetails.branchCode}</Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       <View style={styles.signature}>
//         <View style={styles.signatureLine} />
//         <Text>{signatory.name}</Text>
//         <Text>{signatory.position} | Students&apos; Union</Text>
//         <Text>{signatory.faculty}</Text>
//         <Text>{signatory.university}</Text>
//       </View>
//     </Page>
//   </Document>
// );

// export default InvoicePDF;

// // Function to generate and download PDF
// export const generateInvoicePDF = async (invoiceData: InvoicePDFProps) => {
//   const blob = await pdf(<InvoicePDF {...invoiceData} />).toBlob();
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = `Invoice_${invoiceData.invoiceNumber}.pdf`;
//   link.click();
//   URL.revokeObjectURL(url);
// };
