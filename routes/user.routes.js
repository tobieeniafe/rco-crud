import express from 'express';
import { registerSchema, loginSchema } from '../schemas/user.schema';
import { userValidation } from '../helpers/middleware';
import UserController from '../controllers/user.controllers';

const router = express.Router();

router.post('/register', userValidation(registerSchema), UserController.register);

router.post('/login', userValidation(loginSchema), UserController.login);

module.exports = router;
