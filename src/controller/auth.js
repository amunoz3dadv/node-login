import User from '../models/user.js';
import { validatePassword } from '../helpers/password.js';
import { generateJWT } from '../helpers/jwt.js';
import { googleVerify } from '../helpers/google.js';

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try{

    const user = await User.findOne({ email });

    if(!user){
      return res.status(400).json({
        message: 'user o Password incorrectos'
      });
    }

    const isValidPassword = validatePassword(password, user.password);

    if (!user.state || !isValidPassword) {
      return res.status(400).json({
        message: 'user o Password incorrectos'
      });
    }

    const token = await generateJWT(user.id);

    return res.status(200).json({
      user,
      token
    })
  }catch(error){
    console.log(error)
    return res.status(500).json({
      message: 'Error, contacte al administrador'
    });
  }

}

const googleSigIn = async (req, res) => {

  const { id_token } = req.body;

  try {
    const { email, name, img } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: ':P',
        img,
        google: true,
        rol: 'USER'
      };

      user = new User(data);
      await user.save();
    }

    if (!user.state) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado'
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });

  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: 'Token de Google no es válido'
    })

  }
} 


export {
  login,
  googleSigIn
}