import { Schema, model } from "mongoose";

const enumRol = {
  values: ['ADMIN, USER'],
  message: 'Rol is required'
}

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique:true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  rol: {
    type: String,
    required: [true, 'El rol es obligatorio'],
  },
  img: {
    type: String
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

UserSchema.methods.toJSON = function () {
  const { password, __v, _id, ...user} = this.toObject();
  user.uid = _id;
  return user;
}

export default model('User', UserSchema);
