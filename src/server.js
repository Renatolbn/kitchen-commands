require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app.js");

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Banco conectado");

 const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (err) {
    console.error("Erro na conexão:", err.message);
  }
}

start();
