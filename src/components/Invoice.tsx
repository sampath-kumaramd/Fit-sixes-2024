// 'use client';

// import React from 'react';

// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Font,
//   Image,
// } from '@react-pdf/renderer';
// import { z } from 'zod';

// // Register custom fonts
// Font.register({
//   family: 'Roboto',
//   fonts: [
//     {
//       src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
//       fontWeight: 300,
//     },
//     {
//       src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
//       fontWeight: 400,
//     },
//     {
//       src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
//       fontWeight: 500,
//     },
//     {
//       src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
//       fontWeight: 700,
//     },
//   ],
// });

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     backgroundColor: '#FFFFFF',
//     padding: 30,
//     fontFamily: 'Roboto',
//   },
//   header: {
//     marginBottom: 20,
//     borderBottomWidth: 2,
//     borderBottomColor: '#3B82F6',
//     paddingBottom: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 700,
//     color: '#1E40AF',
//   },
//   teamCard: {
//     marginBottom: 30,
//     borderRadius: 5,
//     padding: 15,
//     backgroundColor: '#F3F4F6',
//   },
//   teamName: {
//     fontSize: 20,
//     fontWeight: 700,
//     marginBottom: 5,
//     color: '#1E40AF',
//   },
//   teamInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   teamGender: {
//     fontSize: 14,
//     color: '#4B5563',
//   },
//   table: {
//     display: 'flex',
//     flexDirection: 'column',
//     width: 'auto',
//     borderStyle: 'solid',
//     borderColor: '#E5E7EB',
//     borderWidth: 1,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//   },
//   tableRow: {
//     margin: 'auto',
//     flexDirection: 'row',
//   },
//   tableColHeader: {
//     width: '33.33%',
//     borderStyle: 'solid',
//     borderColor: '#E5E7EB',
//     borderBottomColor: '#3B82F6',
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     backgroundColor: '#EFF6FF',
//   },
//   tableCol: {
//     width: '33.33%',
//     borderStyle: 'solid',
//     borderColor: '#E5E7EB',
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//   },
//   tableCellHeader: {
//     margin: 5,
//     fontSize: 12,
//     fontWeight: 700,
//     color: '#1E40AF',
//   },
//   tableCell: {
//     margin: 5,
//     fontSize: 10,
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     marginBottom: 10,
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//   },
// });

// interface Player {
//   name: string;
//   nic: string;
//   contactNumber: string;
// }

// interface Team {
//   name: string;
//   gender: string;
//   players: Player[];
// }

// const teamSchema = z.object({
//   name: z.string(),
//   gender: z.string(),
//   players: z.array(
//     z.object({
//       name: z.string(),
//       nic: z.string(),
//       contactNumber: z.string(),
//     })
//   ),
// });

// const InvoicePDF = ({ teams }: { teams: z.infer<typeof teamSchema>[] }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text style={styles.title}>Invoice</Text>
//         <Text style={{ fontSize: 14, marginBottom: 10 }}>
//           Date: {new Date().toLocaleDateString()}
//         </Text>
//         <Text style={{ fontSize: 14, marginBottom: 20 }}>
//           Invoice Number: INV-{Math.floor(Math.random() * 10000)}
//         </Text>

//         <View style={styles.table}>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>Team Name</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>Gender</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>Amount</Text>
//             </View>
//           </View>
//           {teams.map((team, index) => (
//             <View style={styles.tableRow} key={index}>
//               <View style={styles.tableCol}>
//                 <Text style={styles.tableCell}>{team.name}</Text>
//               </View>
//               <View style={styles.tableCol}>
//                 <Text style={styles.tableCell}>{team.gender}</Text>
//               </View>
//               <View style={styles.tableCol}>
//                 <Text style={styles.tableCell}>$100.00</Text>
//               </View>
//             </View>
//           ))}
//         </View>

//         <Text style={{ fontSize: 14, marginTop: 20, textAlign: 'right' }}>
//           Total Amount: ${teams.length * 100}.00
//         </Text>
//       </View>
//     </Page>
//   </Document>
// );

// export default InvoicePDF;
