import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Penduduk = db.define("Penduduk", {
  jumlah_kk: {
    type: DataTypes.INTEGER,
    defaultValue: 108,
  },
  jumlah_laki: {
    type: DataTypes.INTEGER,
    defaultValue: 569,
  },
  jumlah_perempuan: {
    type: DataTypes.INTEGER,
    defaultValue: 400,
  },
}, {
  tableName: "penduduk",
});

export default Penduduk;
