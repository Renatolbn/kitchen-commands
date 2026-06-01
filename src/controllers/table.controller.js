import Table from "../models/table.js";

const getAll = async (req, res) => {
  try {
    const table = await Table.find().sort({ number: 1 });
    res.json(table);
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }

    res.status(500).json({ error: "Erro ao buscar mesa" });
  }
};

const create = async (req, res) => {
  try {
    const table = await Table.create(req.body);
    res.status(201).json(table);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erro ao criar mesa" });
  }
};

const update = async (req, res) => {
  try {
    const table = await Table.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!table) return res.status(404).json({ error: "Mesa não encontrada" });
    res.status(200).json(table);
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }

    res.status(500).json({ error: "Erro ao atualizar a mesa" });
  }
};

const remove = async (req, res) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);

    if (!table) return res.status(404).json({ error: "Mesa não encontrada" });
    res.status(200).json({ message: "Mesa removida com sucesso" });
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }
    res.status(500).json({ error: "Erro ao deletar mesa" });
  }
};

const updateStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const table = await Table.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after", runValidators: true },
    );
    if (!table) return res.status(404).json({ error: "Mesa não encontrada" });
    res.status(200).json(table);
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }
    res.status(500).json({ error: "Erro ao atualizar mesa" });
  }
};

export default { getAll, create, update, remove, updateStatus };
