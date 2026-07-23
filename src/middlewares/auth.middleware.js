import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

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
