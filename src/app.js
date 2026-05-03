// 1. importa o express e rotas
import express, { json } from "express";
import categoryRoutes from "./routes/category.routes.js";
import menuItemRoutes from "./routes/menuItem.routes.js";
import tableRoutes from "./routes/table.routes.js";
import orderRoutes from "./routes/order.routes.js";
import orderItemRoutes from "./routes/orderItem.routes.js";
import userRoutes from "./routes/user.routes.js";

// 2. cria o app
const app = express();

//middleware express json
app.use(json());
app.use('/api/categories', categoryRoutes);
app.use('/api/menu-items', menuItemRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/users', userRoutes);

// 3. exporta
export default app;
