const express = require("express");
const upload = require("./uploads/upload.js");
const { createBarang, getBarang, getBarangById, updateBarang, deleteBarang } = require("./controllers/barangController");

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
