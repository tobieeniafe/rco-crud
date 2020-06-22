import Cart from '../models/cart.model';
import { ErrorHandler } from '../helpers/errorHandler';

export const getCartrById = async (id) => Cart.findById(id);

export const addToCart = async (item) => {
  const existingCart = await getCartrById(item.cartId).catch((error) => {
    throw new ErrorHandler(500, 'Internal Server Error', error);
  });

  if (existingCart) {
    // add item to cart
  }

  try {
    return new Cart({ ...product }).save();
  } catch (error) {
    throw new ErrorHandler(400, 'Error saving product', error);
  }
};
