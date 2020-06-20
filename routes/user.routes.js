import express from 'express';
import { registerSchema, loginSchema } from '../schemas/user.schema';
import { schemaValidation } from '../helpers/middleware';
import UserController from '../controllers/user.controllers';

const router = express.Router();

router.post('/register', schemaValidation(registerSchema), UserController.register);

router.post('/login', schemaValidation(loginSchema), UserController.login);

module.exports = router;
