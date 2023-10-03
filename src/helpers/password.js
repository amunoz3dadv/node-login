import bcryptjs from 'bcryptjs'

const encryptPassword = (password) => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
} 

const validatePassword = (password, userPassword) => {
  return bcryptjs.compareSync( password, userPassword)
} 

export {
  encryptPassword,
  validatePassword
}