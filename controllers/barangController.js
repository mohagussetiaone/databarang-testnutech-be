const db = require("../db/db");
const upload = require("../uploads/upload");

const isNamaBarangUnique = async (nama_barang) => {
  try {
    const query = "SELECT COUNT(*) FROM barang WHERE nama_barang = $1";
    const { rows } = await db.query(query, [nama_barang]);
    return rows[0].count === "0";
  } catch (error) {
    throw error;
  }
};

const createBarang = async (req, res) => {
  const { nama_barang, harga_beli, harga_jual, stok } = req.body;
  const foto_barang = req.file.filename;

  try {
    const isUnique = await isNamaBarangUnique(nama_barang);
    if (!isUnique) {
      return res.status(400).json({ message: "Nama barang harus unik" });
    }

    const query = "INSERT INTO barang (nama_barang, harga_beli, harga_jual, stok, foto_barang) VALUES ($1, $2, $3, $4, $5)";
    await db.query(query, [nama_barang, harga_beli, harga_jual, stok, foto_barang]);
    res.status(201).json({ message: "Barang berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat menambahkan barang", error: error.message });
  }
};

const getBarang = async (req, res) => {
  try {
    const query = "SELECT * FROM barang";
    const { rows } = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil daftar barang", error: error.message });
  }
};

const getBarangById = async (req, res) => {
  const id = req.params.id;

  try {
    const query = "SELECT * FROM barang WHERE id = $1";
    const { rows } = await db.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Barang tidak ditemukan" });
    }
    const barangDetail = rows[0];
    res.status(200).json(barangDetail);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil detail barang", error: error.message });
  }
};

const deleteBarang = async (req, res) => {
  const id = req.params.id;

  try {
    const query = "DELETE FROM barang WHERE id = $1";
    await db.query(query, [id]);
    res.status(200).json({ message: "Barang berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat menghapus barang", error: error.message });
  }
};

const updateBarang = async (req, res) => {
  const id = req.params.id;
  const { nama_barang, harga_beli, harga_jual, stok } = req.body;
  const foto_barang = req.file.filename;

  try {
    const query = "UPDATE barang SET nama_barang = $1, harga_beli = $2, harga_jual = $3, stok = $4, foto_barang = $5 WHERE id = $6";
    await db.query(query, [nama_barang, harga_beli, harga_jual, stok, foto_barang, id]);
    res.status(200).json({ message: "Barang berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat memperbarui barang", error: error.message });
  }
};

module.exports = {
  createBarang,
  getBarang,
  getBarangById,
  updateBarang,
  deleteBarang,
};
