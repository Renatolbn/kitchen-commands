import Category from "../models/category.js";

const getAll = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
};

const create = async (req, res) => {
  try {
    const categories = await Category.create(req.body);
    res.status(201).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar categorias" });
  }
};

const update = async (req, res) => {
  try {
    const categories = await Category.findByIdAndUpdate(
      req.params.id, // qual documento atualizar
      req.body, // com quais dados
      { new: true, runValidators: true }, // opções
    );

    if (!categories)
      return res.status(404).json({ error: "Categoria não encontrada" });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar categorias" });
  }
};

const remove = async (req, res) => {
  try {
    const categories = await Category.findByIdAndDelete(req.params.id);
    
    if (!categories)
      return res.status(404).json({ error: "Categoria não encontrada" });
    res.status(200).json({ message: "Categoria removida com sucesso"});
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar categorias" });
  }
};

export default { getAll, create, update, remove };
