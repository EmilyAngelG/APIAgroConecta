const express = require("express");
require("dotenv").config();
const cadastroRoutes = require("./routes/cadastroRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const reservaRoutes = require("./routes/reservaRoutes");

const app = express();
app.use(express.json());

app.use("/api/cadastros", cadastroRoutes);
app.use("/api/produtos", produtoRoutes);
app.use("/api/reservas", reservaRoutes);

module.exports = app;
