
// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const adminController = require("../controllers/adminController");

// router.post("/run-distribution", auth, adminController.runDistributionNow);

// module.exports = router;









import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { runDistributionNow } from "../controllers/adminController.js";

const router = express.Router();

router.post("/run-distribution", authMiddleware, adminMiddleware, runDistributionNow);

export default router;
