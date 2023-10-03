import { Router } from 'express';
import { check } from 'express-validator';
import { login, googleSigIn } from '../controller/auth.js';
import { inputValidator } from '../middlewares/input.js';

const router = Router();

router.post('/login', [
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  inputValidator
],login);

router.post('/google', [
  check('id_token', 'El token es obligatorio').not().isEmpty(),
  inputValidator
], googleSigIn)

export default router;