import Product from '../models/product.model';
import { ErrorHandler } from '../helpers/errorHandler';

export const getProductByRefNo = async (refNo) => Product.findOne({ refNo });
export const getUserById = async (id) => Product.findById(id);

export const addProduct = async (product) => {
  const existingProduct = await getProductByRefNo(product.refNo).catch((error) => {
    throw new ErrorHandler(500, 'Internal Server Error', error);
  });

  if (existingProduct) {
    throw new ErrorHandler(412, 'Product already exists');
  }

  try {
    return new Product({ ...product }).save();
  } catch (error) {
    throw new ErrorHandler(400, 'Error saving product', error);
  }
};

export const updateProduct = async (updatedProduct) => {
  const product = await getProductByRefNo(updatedProduct.refNo).catch((error) => {
    throw new ErrorHandler(500, 'Internal Server Error', error);
  });
  try {
    return Product.findOneAndUpdate({ refNo: product.refNo }, updatedProduct);
  } catch (error) {
    throw new ErrorHandler(400, 'Error updating product', error);
  }
};

export const getAllProducts = async () => Product.find();

export const deleteProduct = async (refNo) => {
  const product = await getProductByRefNo(refNo).catch((error) => {
    throw new ErrorHandler(500, 'Internal Server Error', error);
  });
  return Product.findOneAndDelete({ refNo: product.refNo });
};
