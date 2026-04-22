const getAll = (req, res) => res.json({ message: "getAll" });
const create = (req, res) => res.json({ message: "create" });
const update = (req, res) => res.json({ message: "update" });
const remove = (req, res) => res.json({ message: "remove" });
const toggleAvailability = (req, res) =>
  res.json({ message: "toggleAvailability" });

export default { getAll, create, update, remove, toggleAvailability };
