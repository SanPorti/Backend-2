import mongoose from "mongoose";
import dotenv from "dotenv"; 

dotenv.config();

const uriConexion = process.env.URI_MONGO; 

//Conexion a BD
export const connectMongoDB = async () => {
  try {
      mongoose.connect(uriConexion)
      console.log("MongoDB conectado");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}