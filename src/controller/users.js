import User from '../models/user.js'
import { encryptPassword } from '../helpers/password.js';

const getAll = async (req, res) => {
  try{
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .limit(Number(limit))
        .skip(Number(from))
    ])

    return res.status(200).json({ 
      total,
      users
    });
  }catch(error){
    return res.status(400).json({
      message: error.message
    });
  }
}

const create = async (req, res) => {
  try{
    const {  name, email, password, rol } = req.body
    const user = new User({ name, password,rol,email });

    /** Encrypt password */
    user.password = encryptPassword(password);
    
    await user.save();

    return res.status(200).json({ user });

  } catch(error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, password, google, correo, ...rest } = req.body;

    //TODO validate in db

    if(password){
      rest.password = encryptPassword(password);
    }

    const user = await User.findByIdAndUpdate(id, rest);
    user.save();
    return res.status(200).json(user);

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

const deleteById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, { state: false });

    return res.status(200).json({
      user,
      message: 'usuario eliminado correctamente'
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

export {
  getAll,
  create,
  update,
  deleteById
}