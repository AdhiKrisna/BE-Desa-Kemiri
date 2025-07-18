import Informasi from "../models/informasiModel.js";
import cloudinary from "../config/cloudinary.js";

// GET semua informasi
export const getAllInformasi = async (req, res) => {
  try {
    const data = await Informasi.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by ID
export const getInformasiById = async (req, res) => {
  try {
    const data = await Informasi.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE informasi
export const createInformasi = async (req, res) => {
  try {
    const { judul, deskripsi } = req.body;
    if (!req.file) return res.status(400).json({ message: "Gambar wajib diupload" });

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "desa_kemiri/informasi"
    });

    const newData = await Informasi.create({
      judul,
      deskripsi,
      image_url: upload.secure_url,
      image_public_id: upload.public_id
    });

    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE informasi
export const updateInformasi = async (req, res) => {
  try {
    const { judul, deskripsi } = req.body;
    const data = await Informasi.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });

    if (req.file) {
      if (data.image_public_id) {
        await cloudinary.uploader.destroy(data.image_public_id);
      }
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "desa_kemiri/informasi"
      });
      await data.update({
        image_url: upload.secure_url,
        image_public_id: upload.public_id
      });
    }

    await data.update({ judul, deskripsi });
    res.json({ message: "Data berhasil diperbarui", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE informasi
export const deleteInformasi = async (req, res) => {
  try {
    const data = await Informasi.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });

    if (data.image_public_id) {
      await cloudinary.uploader.destroy(data.image_public_id);
    }
    await data.destroy();
    res.json({ message: "Data berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
