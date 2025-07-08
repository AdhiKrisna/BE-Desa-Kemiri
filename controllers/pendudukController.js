import Penduduk from "../models/pendudukModel.js";

// GET data penduduk (hanya 1 baris)
export const getPenduduk = async (req, res) => {
  try {
    let data = await Penduduk.findOne();
    if (!data) {
      data = await Penduduk.create(); // insert default jika belum ada
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE data penduduk
export const updatePenduduk = async (req, res) => {
  try {
    const { jumlah_kk, jumlah_laki, jumlah_perempuan } = req.body;
    const data = await Penduduk.findOne();
    if (!data) return res.status(404).json({ message: "Data penduduk belum tersedia" });
    
    await data.update({ jumlah_kk, jumlah_laki, jumlah_perempuan });
    res.json({ message: "Data penduduk berhasil diperbarui", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
