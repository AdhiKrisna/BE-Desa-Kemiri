import db from "./database.js";
import PendudukModel from "../models/pendudukModel.js";
import StrukturalModel from "../models/strukturalModel.js";
import PotensiWisataModel from "../models/potensiWisataModel.js";
import InformasiModel from "../models/informasiModel.js";

const association = async () => {
    try {
        await db.sync({ alter: true });
        console.log("All models synced");

        // Insert default data penduduk
        const pendudukCount = await PendudukModel.count();
        if (pendudukCount === 0) {
            const defaultLaki = 569;
            const defaultPerempuan = 400;
            const total = defaultLaki + defaultPerempuan;

            await PendudukModel.create({
                jumlah_kk: 108,
                jumlah_laki: defaultLaki,
                jumlah_perempuan: defaultPerempuan,
                data_penduduk: total
            });
            console.log("Default data penduduk inserted");
        }

        // Insert default struktural desa
        const strukturalCount = await StrukturalModel.count();
        if (strukturalCount === 0) {
            await StrukturalModel.bulkCreate([
                { jabatan: "Kepala Desa", nama: "I Made Suta", image_url: "https://...", role: 1 },
                { jabatan: "Sekretaris Desa", nama: "Ni Kadek Rini", image_url: "https://...", role: 0 },
                { jabatan: "Bendahara", nama: "I Wayan Agus", image_url: "https://...", role: 0 }
            ]);
            console.log("Default struktural desa inserted");
        }

        // Insert default potensi wisata
        const wisataCount = await PotensiWisataModel.count();
        if (wisataCount === 0) {
            await PotensiWisataModel.create({
                judul: "Air Terjun Kemiri",
                deskripsi: "Wisata alam dengan pemandangan indah.",
                image_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
                image_public_id: "sample"
            });
            console.log("Default potensi wisata inserted");
        }

        // Insert default informasi
        const infoCount = await InformasiModel.count();
        if (infoCount === 0) {
            await InformasiModel.create({
                judul: "Bersih Desa",
                deskripsi: "Kegiatan bersih desa akan dilaksanakan minggu depan.",
                image_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
                image_public_id: "sample"
            });
            console.log("Default informasi inserted");
        }

    } catch (err) {
        console.error("Association error:", err);
    }
};

export default association;
