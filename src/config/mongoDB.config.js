import mongoose from "mongoose";

const uriMongo = process.env.URI_MONGO;

//Conexion a BD
export const connectMongoDB = async () => {
  try {
      mongoose.connect(uriMongo)
      console.log("MongoDB conectado");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}