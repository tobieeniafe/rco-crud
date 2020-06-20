import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    refNo: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
