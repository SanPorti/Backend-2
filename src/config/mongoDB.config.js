import mongoose from "mongoose";

//Conexion a BD
export const connectMongoDB = async () => {
  try {
      mongoose.connect("mongodb+srv://admin:12345@cluster0.etdwv.mongodb.net/")
      console.log("MongoDB conectado");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}