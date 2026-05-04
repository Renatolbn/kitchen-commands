import MenuItem from "../models/menuItem.js";

const getAll = async (req, res) => {
  try {
    const menuItem = await MenuItem.find().populate("category", "name"); // popular o campo category trazendo apenas o nome da categoria.
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar item do menu" });
  }
};

const create = async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body);
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar item do menu" });
  }
};

const update = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!menuItem)
      return res.status(404).json({ error: "Item do menu não encontrado" });
    res.status(200).json(menuItem);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar item do menu" });
  }
};

const remove = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem)
      return res.status(404).json({ error: "Item do menu não encontrado" });
    res.status(200).json({ message: "Item do menu removido com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar item do menu" });
  }
};

const toggleAvailability = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ error: "Item do menu não encontrado" });
    }

    menuItem.available = !menuItem.available;

    await menuItem.save();

    res.status(200).json(menuItem);
  } catch (err) {
    res.status(500).json({ error: "Erro ao alterar disponibilidade do item" });
  }
};

export default { getAll, create, update, remove, toggleAvailability };
