import { Router } from 'express';
import { check } from 'express-validator'
import { create, deleteById, getAll, update } from '../controller/users.js';
import { isRoleValid, isEmailExist, isExistUserWithId } from '../helpers/db-validators.js';
import { inputValidator, validateJWT, isAdminRole, isInRoleGroup } from '../middlewares/index.js';

const router = Router();

router.get('/get-all', getAll);

router.post('/create', [ 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email ingresado no es valido').not().isEmpty().isEmail().custom(isEmailExist),
    check('password', 'El password debe contener minimo de 8 caracteres').isLength({min: 6}),
    check('rol', 'El rol es invalido').custom(isRoleValid),
    inputValidator
  ],create
);

router.put('/update/:id', [
  check('id', 'No es un id valido').isMongoId().custom(isExistUserWithId),
  check('rol', 'El rol es invalido').custom(isRoleValid),
  inputValidator
] 
,update);

router.delete('/delete/:id', [
  validateJWT,
  isInRoleGroup('ADMIN', 'USER'),
  check('id', 'No es un id valido').isMongoId().custom(isExistUserWithId),
  inputValidator
],deleteById);

export default router;