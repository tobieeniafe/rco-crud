import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    items: {
      type: []
    }
  },
  { timestamps: true },
);

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
