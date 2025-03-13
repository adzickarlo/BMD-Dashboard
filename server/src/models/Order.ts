import mongoose, { Document, Schema } from "mongoose";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface IOrder extends Document {
  items: OrderItem[];
  totalPrice: number;
  tableNumber: number;
}

const orderSchema = new Schema<IOrder>(
  {
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    tableNumber: { type: Number, required: true }
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
