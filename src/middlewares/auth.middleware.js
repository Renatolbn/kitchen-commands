import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log("middleware chamado:", req.method, req.path);
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoder = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoder;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ error: "Token inválido" });
  }
};

export default authMiddleware;
