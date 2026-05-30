import Category from "../models/category.js";

const getAll = async (req, res) => {
  try {
    const category = await Category.find().sort({ name: 1 });
    res.json(category);
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }

    res.status(500).json({ error: "Erro ao buscar categoria" });
  }
};

const create = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erro ao criar categoria" });
  }
};

const update = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category)
      return res.status(404).json({ error: "Categoria não encontrada" });
    res.status(200).json(category);
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }

    res.status(500).json({ error: "Erro ao atualizar categoria" });
  }
};

const remove = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category)
      return res.status(404).json({ error: "Categoria não encontrada" });
    res.status(200).json({ message: "Categoria removida com sucesso" });
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }

    res.status(500).json({ error: "Erro ao deletar categoria" });
  }
};

export default { getAll, create, update, remove };
