import db from "./database.js";
import PendudukModel from "../models/pendudukModel.js";
import StrukturalModel from "../models/strukturalModel.js";

const association = async () => {
  try {
    await db.sync({ alter: true });
    console.log("✅ All models synced");

    // Insert default data penduduk kalau kosong
    const pendudukCount = await PendudukModel.count();
    if (pendudukCount === 0) {
      await PendudukModel.create();
      console.log("🟢 Default data penduduk inserted");
    }

    // Insert default struktural desa kalau kosong
    const strukturalCount = await StrukturalModel.count();
    if (strukturalCount === 0) {
      await StrukturalModel.bulkCreate([
        {
          jabatan: "Kepala Desa",
          nama: "I Made Suta",
          image_url: "https://via.placeholder.com/150",
          role: 1,
        },
        {
          jabatan: "Sekretaris Desa",
          nama: "Ni Kadek Rini",
          image_url: "https://via.placeholder.com/150",
          role: 0,
        },
        {
          jabatan: "Bendahara",
          nama: "I Wayan Agus",
          image_url: "https://via.placeholder.com/150",
          role: 0,
        }
      ]);
      console.log("🟢 Default struktural desa inserted");
    }
  } catch (err) {
    console.error("Association error:", err);
  }
};

export default association;
