import express from "express";
import cors from "cors";
import api from "./api/routes/index";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", api);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
