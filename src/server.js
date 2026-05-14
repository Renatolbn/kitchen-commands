import "dotenv/config";
import { connect } from "mongoose";
import app from "./app.js";

async function start() {
  try {
    await connect(process.env.MONGO_URI);
    console.log("Banco conectado");

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI não definida no .env");
    }

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (err) {
    console.error("Erro na conexão:", err.message);
  }
}

start();
