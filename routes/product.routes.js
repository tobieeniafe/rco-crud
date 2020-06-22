import express from 'express';
import { productValidation, validateToken } from '../helpers/middleware';
import { productSchema } from '../schemas/product.schema';
import ProductController from '../controllers/product.controllers';

const router = express.Router();

router.post('/add', productValidation(productSchema), ProductController.add);

router.put('/update', productValidation(productSchema), ProductController.update);

router.get('/all', validateToken(), ProductController.getAll);

router.get('/:refNo', validateToken(), ProductController.get);

router.delete('/delete/:refNo', validateToken(), ProductController.delete);

module.exports = router;
