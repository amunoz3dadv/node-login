import jwt from "jsonwebtoken"
import User from '../models/user.js';

const validateJWT = async (req, res, next) => {

  const token = req.header('x-token');

  if(!token){
    return res.status(401).json({
      message: 'No hay token en la peticion'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findById(uid);

    if(!user || !user.state){
      res.status(401).json({
        message: 'Usuario invalido o deshabilitado'
      })
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({
      message: 'Token invalido'
    })
  }

}

export  {
  validateJWT
}