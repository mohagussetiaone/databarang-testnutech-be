import express from "express";
import upload from "./uploads/upload";
import { createBarang, getBarang, getBarangById, updateBarang, deleteBarang } from "./controllers/barangController";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/barang", upload.single("foto_barang"), createBarang);
app.get("/barang", getBarang);
app.get("/barang/:id", getBarangById);
app.put("/barang/:id", upload.single("foto_barang"), updateBarang);
app.delete("/barang/:id", deleteBarang);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
