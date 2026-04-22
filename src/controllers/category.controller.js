const getAll = (req, res) => res.json({ message: 'getAll' })
const create = (req, res) => res.json({ message: 'create' })
const update = (req, res) => res.json({ message: 'update' })
const remove = (req, res) => res.json({ message: 'remove' })

export default { getAll, create, update, remove }