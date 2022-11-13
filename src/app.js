import express from "express";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routers.js";

const app = express();

console.log("server iniciado");

app.use(express.json());
app.use("/api", employeesRoutes);
app.use(indexRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
});


export default app;