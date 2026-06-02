import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getAll = async (req, res) => {
  try {
    const user = await User.find().sort({
      email: 1,
    });
    res.json(user);
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }

    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

const create = async (req, res) => {
  const { email, password, role } = req.body;

  const validations = {
    kitchen: /^\d{6,}$/, //Mínimo 6 caracteres e só números
    waiter: /^[A-Za-z\d]{8,}$/, //Mínimo 8 caracteres e Letras e números
    admin:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/ /*Mínimo 10 caracteres e Letra maiúscula, minúscula, número e caractere especial*/,
  };

  if (!validations[role]) {
    return res.status(400).json({ error: "Role inválido" });
  }

  if (!validations[role].test(password)) {
    return res.status(400).json({ error: "Senha inválida para esse perfil" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ email, password: hashedPassword, role });
    res.status(201).json({ _id: user._id, email: user.email, role: user.role });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erro ao criar usuário e senha" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, // payload
      process.env.JWT_SECRET, // secret
      { expiresIn: "1d" }, // expira em 1 dia
    );
    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Usuário inválido" });
  }
};

const remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.status(200).json({ message: "Usuário removido com sucesso" });
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }

    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};
export default { getAll, create, login, remove };
