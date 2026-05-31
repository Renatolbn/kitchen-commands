import OrderItem from "../models/orderItem.js";

const getAll = async (req, res) => {
  try {
    const orderItem = await OrderItem.find().populate("menuItem", "name price");
    res.json(orderItem);
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({
        error: "ID inválido"});
    }
     res.status(500).json({ error: "Erro ao buscar item da comanda" });
  }
};
const updateStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const orderItem = await OrderItem.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );
    if (!orderItem) return res.status(404).json({ error: "Item do pedido não encontrado" });
    res.status(200).json(orderItem);
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }
    res.status(500).json({ error: "Erro ao atualizar o item do pedido" });
  }
};

const remove = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByIdAndDelete(req.params.id);

    if (!orderItem) return res.status(404).json({ error: "Item do pedido não encontrado" });
    res.status(200).json({ message: "Item do pedido removido com sucesso" });
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }
    res.status(500).json({ error: "Erro ao deletar item do pedido" });
  }
};

export default { getAll, updateStatus, remove };
