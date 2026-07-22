// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const multer = require("multer");
// const path = require("path");
// const { updateProfile, uploadAvatar } = require("../controllers/profileController");

// // multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, path.join(__dirname, "..", "uploads", "avatars")),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${req.user.id}_${Date.now()}${ext}`);
//   }
// });
// const upload = multer({ storage });

// router.put("/update", auth, updateProfile);
// router.post("/avatar", auth, upload.single("avatar"), uploadAvatar);

// module.exports = router;





// import express from "express";
// import multer from "multer";
// import User from "../models/User.js";
// import { verifyToken } from "./authMiddleware.js";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// // Update profile
// router.put("/update", verifyToken, async (req, res) => {
//   const { name, phone } = req.body;
//   const user = await User.findById(req.user.id);
//   user.name = name;
//   user.phone = phone;
//   await user.save();
//   res.json(user);
// });

// // Upload avatar
// router.post("/avatar", verifyToken, upload.single("avatar"), async (req, res) => {
//   const user = await User.findById(req.user.id);
//   user.avatar = req.file.filename;
//   await user.save();
//   res.json({ success: true });
// });

// export default router;










import express from "express";
import multer from "multer";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Update profile
router.put("/update", authMiddleware, async (req, res) => {
  const { name, phone } = req.body;
  const user = await User.findById(req.user.id);
  user.name = name;
  user.phone = phone;
  await user.save();
  res.json(user);
});

// Upload avatar
router.post("/avatar", authMiddleware, upload.single("avatar"), async (req, res) => {
  const user = await User.findById(req.user.id);
  user.avatar = req.file.filename;
  await user.save();
  res.json({ success: true });
});

export default router;