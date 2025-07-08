import { DataTypes } from "sequelize";
import db from "../config/database.js";

const StrukturalDesa = db.define("StrukturalDesa", {
  jabatan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    defaultValue: "https://via.placeholder.com/150",
  },
  image_public_id: { // ← Tambahan
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: "struktural_desa",
  timestamps: true,
});

export default StrukturalDesa;