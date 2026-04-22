const getAll = (req, res) => res.json({ message: "getAll" });
const updateStatus = (req, res) => res.json({ message: "updateStatus" });
const remove = (req, res) => res.json({ message: "remove" });

export default { getAll, updateStatus, remove };
