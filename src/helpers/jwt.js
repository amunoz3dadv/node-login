import jwt from "jsonwebtoken"

const generateJWT = async (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '4h'
    }, (err, token) => {
      if(err){
        reject('no se pudo generar el token');
      }else{
        resolve(token);
      }
    });
  });
}

export {
  generateJWT
}