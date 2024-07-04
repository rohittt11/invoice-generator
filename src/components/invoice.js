import React from "react";
import jsPDF from "jspdf";

const Invoice = ({
  sellerDetails,
  placeOfSupply,
  billingDetails,
  shippingDetails,
  placeOfDelivery,
  orderDetails,
  invoiceDetails,
  reverseCharge,
  itemDetails,
  companyLogo,
  signatureImage,
}) => {
  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const calculateNetAmount = (unitPrice, quantity, discount) => {
      return unitPrice * quantity - discount;
    };

    const calculateTaxAmount = (netAmount, taxRate, isInterState) => {
      if (isInterState) {
        return netAmount * taxRate;
      } else {
        return {
          cgst: netAmount * (taxRate / 2),
          sgst: netAmount * (taxRate / 2),
        };
      }
    };

    const calculateTotalAmount = (netAmount, taxAmount, isInterState) => {
      if (isInterState) {
        return netAmount + taxAmount;
      } else {
        return netAmount + taxAmount.cgst + taxAmount.sgst;
      }
    };

    const isInterState = placeOfSupply !== placeOfDelivery;
    const taxRate = 0.18; // 18%

    // Add company logo
    if (companyLogo) {
      doc.addImage(companyLogo, "PNG", 10, 10, 50, 20);
    }

    // Add seller details
    doc.setFontSize(12);
    doc.text("Seller Details:", 10, 40);
    doc.text(sellerDetails.name, 10, 45);
    doc.text(sellerDetails.address, 10, 50);
    doc.text(
      `${sellerDetails.city}, ${sellerDetails.state}, ${sellerDetails.pincode}`,
      10,
      55
    );
    doc.text(`PAN No.: ${sellerDetails.panNo}`, 10, 60);
    doc.text(`GST Registration No.: ${sellerDetails.gstRegNo}`, 10, 65);

    // Add place of supply
    doc.text("Place of Supply:", 120, 40);
    doc.text(placeOfSupply, 120, 45);

    // Add billing details
    doc.text("Billing Details:", 10, 75);
    doc.text(billingDetails.name, 10, 80);
    doc.text(billingDetails.address, 10, 85);
    doc.text(
      `${billingDetails.city}, ${billingDetails.state}, ${billingDetails.pincode}`,
      10,
      90
    );
    doc.text(`State/UT Code: ${billingDetails.stateUTCode}`, 10, 95);

    // Add shipping details
    doc.text("Shipping Details:", 120, 75);
    doc.text(shippingDetails.name, 120, 80);
    doc.text(shippingDetails.address, 120, 85);
    doc.text(
      `${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.pincode}`,
      120,
      90
    );
    doc.text(`State/UT Code: ${shippingDetails.stateUTCode}`, 120, 95);

    // Add place of delivery
    doc.text("Place of Delivery:", 120, 105);
    doc.text(placeOfDelivery, 120, 110);

    // Add order details
    doc.text("Order Details:", 10, 105);
    doc.text(`Order No.: ${orderDetails.orderNo}`, 10, 110);
    doc.text(`Order Date: ${orderDetails.orderDate}`, 10, 115);

    // Add invoice details
    doc.text("Invoice Details:", 10, 125);
    doc.text(`Invoice No.: ${invoiceDetails.invoiceNo}`, 10, 130);
    doc.text(`Invoice Date: ${invoiceDetails.invoiceDate}`, 10, 135);

    // Add reverse charge
    doc.text(`Reverse Charge: ${reverseCharge ? "Yes" : "No"}`, 10, 145);

    // Add item details table
    let startY = 155;
    doc.setFillColor(230); // Light gray background for the table header
    doc.setTextColor(0); // Black text color for table header
    doc.rect(10, startY, 190, 10, "F"); // Table header background
    doc.text("Description", 12, startY + 8);
    doc.text("Unit Price", 58, startY + 8);
    doc.text("Quantity", 78, startY + 8);
    doc.text("Discount", 98, startY + 8);
    doc.text("Net Amount", 118, startY + 8);
    doc.text("Tax Rate", 141, startY + 8);
    doc.text("Tax Amount", 164, startY + 8);
    doc.text("Total Amount", 186, startY + 8);
    doc.setFontSize(10);

    startY += 10;

    itemDetails.forEach((item, index) => {
      const netAmount = calculateNetAmount(
        item.unitPrice,
        item.quantity,
        item.discount
      );
      const taxAmount = calculateTaxAmount(netAmount, taxRate, isInterState);
      const totalAmount = calculateTotalAmount(
        netAmount,
        taxAmount,
        isInterState
      );

      doc.rect(10, startY, 190, 10); // Table row border
      doc.text(item.description, 12, startY + 8);
      doc.text(item.unitPrice.toString(), 58, startY + 8);
      doc.text(item.quantity.toString(), 78, startY + 8);
      doc.text(item.discount.toString(), 98, startY + 8);
      doc.text(netAmount.toFixed(2), 118, startY + 8);
      doc.text((taxRate * 100).toFixed(2) + "%", 141, startY + 8);
      if (isInterState) {
        doc.text(taxAmount.toFixed(2), 164, startY + 8);
      } else {
        doc.text(
          `${taxAmount.cgst.toFixed(2)} (CGST), ${taxAmount.sgst.toFixed(
            2
          )} (SGST)`,
          164,
          startY + 8
        );
      }
      doc.text(totalAmount.toFixed(2), 186, startY + 8);

      startY += 10;
    });

    // Add signature image
    if (signatureImage) {
      doc.addImage(signatureImage, "PNG", 140, startY + 10, 50, 20);
      doc.text(`For ${sellerDetails.name}:`, 140, startY + 35);
      doc.text("Authorised Signatory", 140, startY + 40);
    }

    // Save the PDF
    doc.save("invoice.pdf");
  };

  return (
    <div>
      <div className="invoice-preview bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Invoice Preview</h1>
        <p>(Check console for detailed invoice PDF output)</p>
      </div>
      <button onClick={generatePDF} className="mt-4 btn btn-primary">
        Generate PDF
      </button>
    </div>
  );
};

export default Invoice;
