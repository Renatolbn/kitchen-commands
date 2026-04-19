require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app.js");

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Banco conectado");
    app.listen(process.env.PORT, () =>
      console.log(`Servidor rodando na porta ${process.env.PORT}`),
    );
  } catch (err) {
    console.error("Ërro na conexão");
  }
}

start();
