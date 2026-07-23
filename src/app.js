// 1. importa o express e rotas
import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import categoryRoutes from "./routes/category.routes.js";
import menuItemRoutes from "./routes/menuItem.routes.js";
import tableRoutes from "./routes/table.routes.js";
import orderRoutes from "./routes/order.routes.js";
import orderItemRoutes from "./routes/orderItem.routes.js";
import userRoutes from "./routes/user.routes.js";
import authMiddleware from "./middlewares/auth.middleware.js";

// 2. cria o app
const app = express();

//middleware express json
app.use(
  cors({
    origin: "http://localhost:5173", // URL do frontend
    credentials: true, // permite envio de cookies
  }),
);
app.use(cookieParser());
app.use(json());
app.use("/api/users", userRoutes); // público

app.use("/api/categories", categoryRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);

// 3. exporta
export default app;
