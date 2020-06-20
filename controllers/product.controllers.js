import {
  addProduct, updateProduct, deleteProduct, getProductByRefNo, getAllProducts,
} from '../services/product.service';

const ProductController = {
  add(req, res, next) {
    const product = req.locals;
    addProduct(product)
      .then(() => {
        res.status(201).json({ success: true, message: 'Product added' });
      })
      .catch((error) => next(error));
  },
  update(req, res, next) {
    const updatedproduct = req.locals;
    updateProduct(updatedproduct)
      .then((product) => {
        res.status(200).json({ success: true, message: 'product updated', updatedproduct });
      })
      .catch((error) => next(error));
  },
  getAll(req, res, next) {
    getAllProducts()
      .then((products) => {
        if (products.length > 0) {
          res.status(200).json({ success: true, products });
        } else {
          res.status(404).json({ success: true, message: 'No products available' });
        }
      })
      .catch((error) => next(error));
  },
  get(req, res, next) {
    const { refNo } = req.params;
    getProductByRefNo(refNo)
      .then((product) => {
        if (product == null) {
          res.status(404).json({ success: true, message: 'Product does not exist' });
        } else {
          res.status(200).json({ success: true, product });
        }
      })
      .catch((error) => next(error));
  },
  delete(req, res, next) {
    const { refNo } = req.params;
    deleteProduct(refNo)
      .then(() => {
        res.status(200).json({ success: true, message: 'product deleted' });
      })
      .catch((error) => next(error));
  },
};

export default ProductController;
