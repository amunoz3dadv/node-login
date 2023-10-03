import mongoose from "mongoose"
import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

export const dbConnection = async () => {
  try{
    const url = process.env.MONGO_URL;
    await mongoose.connect(url);

    console.log('online bd')

  }catch(error){
    console.error(error);
    throw new Error('Error al iniciar la base de datos');
  }
}