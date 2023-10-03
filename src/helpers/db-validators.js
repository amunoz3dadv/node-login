import Role from '../models/role.js';
import User from '../models/user.js'

const isRoleValid = async (rol = '') => {
  const roleExist = await Role.findOne({ rol });
  if (!roleExist) {
    throw new Error(`El rol ${rol} no existe`);
  }
}

const isEmailExist = async (email) => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error('El email ingresado ya existe.');
  }
}

const isExistUserWithId = async (id) => {
  const existUser = await User.findById(id);
  if(!existUser){
    throw new Error(`No existe un usuario con el id ${id}`);
  }
}

export {
  isEmailExist,
  isRoleValid,
  isExistUserWithId
}