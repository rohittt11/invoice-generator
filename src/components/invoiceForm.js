import React, { useState } from "react";
import Invoice from "./invoice";

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    sellerDetails: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      panNo: "",
      gstRegNo: "",
    },
    placeOfSupply: "",
    billingDetails: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      stateUTCode: "",
    },
    shippingDetails: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      stateUTCode: "",
    },
    placeOfDelivery: "",
    orderDetails: {
      orderNo: "",
      orderDate: "",
    },
    invoiceDetails: {
      invoiceNo: "",
      invoiceDate: "",
    },
    reverseCharge: false,
    itemDetails: [],
    companyLogo: "",
    signatureImage: "",
  });

  const [currentItem, setCurrentItem] = useState({
    description: "",
    unitPrice: 0,
    quantity: 0,
    discount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 1) {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [keys[0]]: {
          ...formData[keys[0]],
          [keys[1]]: value,
        },
      });
    }
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: value,
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      itemDetails: [...formData.itemDetails, currentItem],
    });
    setCurrentItem({
      description: "",
      unitPrice: 0,
      quantity: 0,
      discount: 0,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-red-600">
        Invoice Generator
      </h1>
      <form className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Seller Details</h2>
          <input
            type="text"
            name="sellerDetails.name"
            placeholder="Seller Name"
            value={formData.sellerDetails.name}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="sellerDetails.address"
            placeholder="Address"
            value={formData.sellerDetails.address}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="sellerDetails.city"
            placeholder="City"
            value={formData.sellerDetails.city}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="sellerDetails.state"
            placeholder="State"
            value={formData.sellerDetails.state}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="sellerDetails.pincode"
            placeholder="Pincode"
            value={formData.sellerDetails.pincode}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="sellerDetails.panNo"
            placeholder="PAN No."
            value={formData.sellerDetails.panNo}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="sellerDetails.gstRegNo"
            placeholder="GST Registration No."
            value={formData.sellerDetails.gstRegNo}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Place of Supply</h2>
          <input
            type="text"
            name="placeOfSupply"
            placeholder="Place of Supply"
            value={formData.placeOfSupply}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Billing Details</h2>
          <input
            type="text"
            name="billingDetails.name"
            placeholder="Billing Name"
            value={formData.billingDetails.name}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="billingDetails.address"
            placeholder="Address"
            value={formData.billingDetails.address}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="billingDetails.city"
            placeholder="City"
            value={formData.billingDetails.city}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="billingDetails.state"
            placeholder="State"
            value={formData.billingDetails.state}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="billingDetails.pincode"
            placeholder="Pincode"
            value={formData.billingDetails.pincode}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="billingDetails.stateUTCode"
            placeholder="State/UT Code"
            value={formData.billingDetails.stateUTCode}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Shipping Details</h2>
          <input
            type="text"
            name="shippingDetails.name"
            placeholder="Shipping Name"
            value={formData.shippingDetails.name}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="shippingDetails.address"
            placeholder="Address"
            value={formData.shippingDetails.address}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="shippingDetails.city"
            placeholder="City"
            value={formData.shippingDetails.city}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="shippingDetails.state"
            placeholder="State"
            value={formData.shippingDetails.state}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="shippingDetails.pincode"
            placeholder="Pincode"
            value={formData.shippingDetails.pincode}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="shippingDetails.stateUTCode"
            placeholder="State/UT Code"
            value={formData.shippingDetails.stateUTCode}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Place of Delivery</h2>
          <input
            type="text"
            name="placeOfDelivery"
            placeholder="Place of Delivery"
            value={formData.placeOfDelivery}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Order Details</h2>
          <input
            type="text"
            name="orderDetails.orderNo"
            placeholder="Order No."
            value={formData.orderDetails.orderNo}
            onChange={handleChange}
            className="input"
          />
          <input
            type="date"
            name="orderDetails.orderDate"
            placeholder="Order Date"
            value={formData.orderDetails.orderDate}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Invoice Details</h2>
          <input
            type="text"
            name="invoiceDetails.invoiceNo"
            placeholder="Invoice No."
            value={formData.invoiceDetails.invoiceNo}
            onChange={handleChange}
            className="input"
          />
          <input
            type="date"
            name="invoiceDetails.invoiceDate"
            placeholder="Invoice Date"
            value={formData.invoiceDetails.invoiceDate}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Reverse Charge</h2>
          <input
            type="checkbox"
            name="reverseCharge"
            checked={formData.reverseCharge}
            onChange={(e) =>
              setFormData({ ...formData, reverseCharge: e.target.checked })
            }
            className="input-checkbox"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Company Logo URL</h2>
          <input
            type="text"
            name="companyLogo"
            placeholder="Company Logo URL"
            value={formData.companyLogo}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Seller Signature URL</h2>
          <input
            type="text"
            name="signatureImage"
            placeholder="Seller Signature URL"
            value={formData.signatureImage}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Item Details</h2>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={currentItem.description}
            onChange={handleItemChange}
            className="input"
          />
          <input
            type="number"
            name="unitPrice"
            placeholder="Unit Price"
            value={currentItem.unitPrice}
            onChange={handleItemChange}
            className="input"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={currentItem.quantity}
            onChange={handleItemChange}
            className="input"
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount"
            value={currentItem.discount}
            onChange={handleItemChange}
            className="input"
          />
          <button type="button" onClick={addItem} className="btn">
            Add Item
          </button>
        </div>
      </form>
      <Invoice {...formData} />
    </div>
  );
};

export default InvoiceForm;
