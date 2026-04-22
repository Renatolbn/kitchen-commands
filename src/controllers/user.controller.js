const getAll = (req, res) => res.json({ message: "getAll" });
const create = (req, res) => res.json({ message: "create" });
const login = (req, res) => res.json({ message: "login" });
const remove = (req, res) => res.json({ message: "remove" });

export default { getAll, create, login, remove };
