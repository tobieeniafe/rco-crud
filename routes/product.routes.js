import express from 'express';
import { schemaValidation } from '../helpers/middleware';
import { productSchema } from '../schemas/product.schema';
import ProductController from '../controllers/product.controllers';

const router = express.Router();

router.post('/add', schemaValidation(productSchema), ProductController.add);

router.put('/update', schemaValidation(productSchema), ProductController.update);

router.get('/all', ProductController.getAll);

router.get('/:refNo', ProductController.get);

router.delete('/delete/:refNo', ProductController.delete);

module.exports = router;
