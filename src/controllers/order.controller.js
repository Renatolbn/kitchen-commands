import Order from "../models/order.js";
import OrderItem from "../models/orderItem.js";
import Table from "../models/table.js";

const getAll = async (req, res) => {
  try {
    const order = await Order.find().populate(["table", "items"]);
    res.json(order);
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }
    res.status(500).json({ error: "Erro ao buscar comanda" });
  }
};

const create = async (req, res) => {
  try {
    const { table, items } = req.body;

    const orderItems = await OrderItem.insertMany(items);

    const order = await Order.create({
      table,
      items: orderItems.map((item) => item._id),
    });

    await Table.findByIdAndUpdate(table, { status: "busy" }); //altera o campo status da mesa para "busy" (ocupada) logo após a criação do pedido.
    res.status(201).json(order);
    
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }

    res.status(500).json({ error: "Erro ao criar pedido" });
  }
};

const update = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!order) return res.status(404).json({ error: "Pedido não encontrado" });
    res.status(200).json(order);
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }

    res.status(500).json({ error: "Erro ao atualizar pedido" });
  }
};
const remove = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) return res.status(404).json({ error: "Pedido não encontrado" });
    res.status(200).json({ message: "Pedido removido com sucesso" });
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }
    res.status(500).json({ error: "Erro ao deletar pedido" });
  }
};

const updateStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after", runValidators: true },
    );

    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    if (status === "closed") {
      await order.populate({
        path: "items",
        populate: {
          path: "menuItem",
        },
      });

      const total = order.items.reduce((acc, item) => {
        return acc + item.quantity * item.menuItem.price;
      }, 0);

      order.totalAmount = total;

      await order.save();

      await Table.findByIdAndUpdate(order.table, {
        status: "free",
      });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error(err.message);

    if (err.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }
    res.status(500).json({ error: "Erro ao atualizar o pedido" });
  }
};

export default { getAll, create, update, remove, updateStatus };
