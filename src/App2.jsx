// import React from "react";
// import jsPDF from "jspdf";
// import "./BostonLabReceipt.css";

// function BostonLabReceipt() {
//   const orderData = {
//     company: {
//       name: "TOKIYO",
//       tin: "0038389744",
//       phone: "+251 (0)91 148 6008",
//       address: "TOKIYO",
//     },
//     customer: {
//       name: "TOKIYO",
//       tin: "0000000000",
//       address: "TOKIYO",
//     },
//     receiptTitle: "TOKIYO",
//     items: [
//       { description: "COVID-19 TEST", unit: "Person", qty: 1, unitPrice: 1200 },
//       { description: "Blood Test - Complete Count", unit: "Person", qty: 2, unitPrice: 500 },
//       { description: "Urine Analysis", unit: "Person", qty: 1, unitPrice: 400 },
//       { description: "X-Ray Scan", unit: "Scan", qty: 1, unitPrice: 1500 }
     

      
//     ],
    
//     payment: {
//       method: "Cash",
//       amountWords: "Eight Thousand Six Hundred Birr",
//       subtotal: 8600,
//       vat: "-",
//       total: 8600,
//     },
//   };

//   const printAsPDF = () => {
//     const pdfStyle = document.createElement("style");
//     pdfStyle.innerHTML = `
//       @media print {
//         body {
//           width: 100%;
//           font-size: 12px;
//           margin: 0;
//           padding: 0;
//         }
//         .receipt {
//           width: 100%;
//           max-width: 100%;
//           font-size: 12px;
//           border: none;
//           padding: 10px;
//         }
//         .print-btn, .pos-print-btn {
//           display: none;
//         }
//         @page {
//           size: A4;
//           margin: 0;
//         }
//       }
//     `;
//     document.head.appendChild(pdfStyle);
//     window.print();
//     document.head.removeChild(pdfStyle);
//   };

//   const printForPOS = () => {
//     const doc = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: [80, 90], // Width of 55mm, height can be adjusted as needed
//     });

//     doc.setFontSize(8); // Adjust font size to fit within 55mm width

//     let yOffset = 10;

//     // Add content to the PDF
//     doc.text(`Receipt: ${orderData.receiptTitle}`, 5, yOffset);
//     yOffset += 5;
//     doc.text(`Bill to: ${orderData.customer.name}`, 5, yOffset);
//     yOffset += 5;
//     doc.text(`TIN: ${orderData.customer.tin}`, 5, yOffset);
//     yOffset += 5;
//     doc.text(`Address: ${orderData.customer.address}`, 5, yOffset);
//     yOffset += 10;

//     orderData.items.forEach((item, index) => {
//       const line = `${index + 1}. ${item.description} - ${item.qty} ${item.unit} x ${item.unitPrice} = ${
//         item.qty * item.unitPrice
//       }`;
//       doc.text(line, 5, yOffset);
//       yOffset += 5;
//     });

//     yOffset += 5;
//     doc.text(`Payment Method: ${orderData.payment.method}`, 5, yOffset);
//     yOffset += 5;
//     doc.text(`Amount in Words: ${orderData.payment.amountWords}`, 5, yOffset);
//     yOffset += 5;
//     doc.text(`Subtotal: ${orderData.payment.subtotal}`, 5, yOffset);
//     yOffset += 5;
//     doc.text(`VAT: ${orderData.payment.vat}`, 5, yOffset);
//     yOffset += 5;
//     doc.text(`Grand Total: ${orderData.payment.total}`, 5, yOffset);
//     yOffset += 5;
//     doc.text(`Prepared by: Abninesh Hail`, 5, yOffset);

//     // Save the PDF
//     doc.save("receipt.pdf");
//   };

//   return (
//     <div>
//       <div className="receipt">
//         <div className="watermark">Attachment</div>
//         <div className="content">
//           <div className="title">{orderData.receiptTitle}</div>
//           <div className="section">
//             <table>
//               <tbody>
//                 <tr>
//                   <td><strong>Bill to</strong></td>
//                   <td>{orderData.customer.name}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>TIN</strong></td>
//                   <td>{orderData.customer.tin}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Address</strong></td>
//                   <td>{orderData.customer.address}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <div className="section">
//             <table>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Description</th>
//                   <th>Unit</th>
//                   <th>Qty</th>
//                   <th>Unit Price</th>
//                   <th>Line Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orderData.items.map((item, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{item.description}</td>
//                     <td>{item.unit}</td>
//                     <td>{item.qty}</td>
//                     <td>{item.unitPrice}</td>
//                     <td>{item.qty * item.unitPrice}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="payment-info">
//             <div>
//               <strong>Payment Method:</strong> {orderData.payment.method}
//               <br />
//               <strong>Amount in Words:</strong> {orderData.payment.amountWords}
//             </div>
//             <table style={{ width: "50%" }}>
//               <tbody>
//                 <tr>
//                   <td><strong>Subtotal</strong></td>
//                   <td>{orderData.payment.subtotal}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>VAT</strong></td>
//                   <td>{orderData.payment.vat}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Grand Total</strong></td>
//                   <td>{orderData.payment.total}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <div className="signature">
//             <div>Prepared by: Abninesh Hail</div>
//           </div>
//         </div>
//       </div>

//       <button className="print-btn" onClick={printAsPDF}>
//         Print as PDF
//       </button>
//       <button className="pos-print-btn" onClick={printForPOS}>
//         Print for POS (55mm)
//       </button>
//     </div>
//   );
// }

// export default BostonLabReceipt;





