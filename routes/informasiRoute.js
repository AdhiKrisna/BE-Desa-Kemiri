import express from "express";
import uploadInformasi from "../middlewares/uploadInformasi.js";
import {
  getAllInformasi,
  getInformasiById,
  createInformasi,
  updateInformasi,
  deleteInformasi
} from "../controllers/informasiController.js";

const router = express.Router();

router.get("/", getAllInformasi);
router.get("/:id", getInformasiById);
router.post("/", uploadInformasi.single("image"), createInformasi);
router.put("/:id", uploadInformasi.single("image"), updateInformasi);
router.delete("/:id", deleteInformasi);

export default router;
