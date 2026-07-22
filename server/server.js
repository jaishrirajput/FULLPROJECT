// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/auth");
// const paymentRoutes = require("./routes/payment");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// connectDB(process.env.MONGO_URI).then(() => {
//   app.use("/api/auth", authRoutes);
//   app.use("/api/payment", paymentRoutes);

//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });



// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const connectDB = require("./config/db");

// const authRoutes = require("./routes/auth");
// const profileRoutes = require("./routes/profile");
// const paymentRoutes = require("./routes/payment");
// const adminRoutes = require("./routes/admin");
// const distributeJob = require("./cron/distributeProfit");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // serve uploaded avatars
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const PORT = process.env.PORT || 5000;

// connectDB(process.env.MONGO_URI).then(() => {
//   app.use("/api/auth", authRoutes);
//   app.use("/api/profile", profileRoutes);
//   app.use("/api/payment", paymentRoutes);
//   app.use("/api/admin", adminRoutes);

//   // start cron job
//   distributeJob.start();

//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch(err => {
//   console.error("DB connection failed:", err);
// });


// server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(express.json());

// // CORS setup
// app.use(cors({
//   origin: "https://fullproject-two.vercel.app", // frontend URL
//   credentials: true
// }));

// // Routes
// const paymentRoutes = require("./routes/payment");
// const authRoutes = require("./routes/auth"); // agar alag auth routes hai
// app.use("/api/payment", paymentRoutes);
// app.use("/api/auth", authRoutes);

// // MongoDB connect
// const mongoURI = process.env.MONGO_URI;
// if (!mongoURI) {
//   console.error("Error: MONGO_URI is not defined in environment variables.");
//   process.exit(1);
// }

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch(err => {
//   console.error("MongoDB connection error:", err);
//   process.exit(1);
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Routes
// const paymentRoutes = require("./routes/payment");
// app.use("/api/payment", paymentRoutes);

// const PORT = process.env.PORT || 5000;

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });
// })
// .catch((err) => {
//     console.log("MongoDB connection error:", err);
// });





// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import paymentRoutes from "./routes/payment.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/payment", paymentRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });









// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const paymentRoutes = require("./routes/payment");
// const authMiddleware = require("./middleware/auth");

// dotenv.config();
// const app = express();
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("✅ MongoDB connected"))
//     .catch(err => console.error(err));

// // Routes
// app.use("/api/payment", authMiddleware, paymentRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








// server.js

// const express = require("express");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const app = express();
// app.use(express.json());

// // routes import karo
// const paymentRoutes = require("./routes/payment");
// // example: app.use("/api/payment", paymentRoutes);

// app.use("/api/payment", paymentRoutes);

// // MongoDB connect
// const mongoURI = process.env.MONGO_URI;
// if (!mongoURI) {
//   console.error("Error: MONGO_URI is not defined in environment variables.");
//   process.exit(1); // stop server if no URI
// }

// mongoose
//   .connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   });

// // PORT setup
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });







// server.js

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(express.json());

// // CORS setup
// app.use(cors({
//   origin: "https://fullproject-two.vercel.app", // yaha tumhara frontend URL
//   credentials: true
// }));

// // Routes import
// const paymentRoutes = require("./routes/payment");
// const authRoutes = require("./routes/auth"); // agar auth route alag hai
// app.use("/api/payment", paymentRoutes);
// app.use("/api/auth", authRoutes); // agar auth endpoints backend me hain

// // MongoDB connection
// const mongoURI = process.env.MONGO_URI;
// if (!mongoURI) {
//   console.error("Error: MONGO_URI is not defined in environment variables.");
//   process.exit(1);
// }

// mongoose
//   .connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   });

// // PORT setup
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });











//after deploy











// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");

// const app = express();
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// const MONGO_URI = "your_mongo_connection_string";
// const JWT_SECRET = "your_jwt_secret";

// mongoose.connect(MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.error(err));

// app.use(cors({ origin: true, credentials: true }));

// // User model
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   phone: String,
//   password: String,
//   avatar: String,
//   walletBalance: { type: Number, default: 0 },
// });
// const User = mongoose.model("User", UserSchema);

// // Auth middleware
// const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token" });
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = await User.findById(decoded.id);
//     next();
//   } catch {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// // ------------------ Auth Routes ------------------
// // Register
// app.post("/api/auth/register", async (req, res) => {
//   const { name, email, phone, password } = req.body;
//   try {
//     const user = await User.create({ name, email, phone, password });
//     const token = jwt.sign({ id: user._id }, JWT_SECRET);
//     res.json({ token, user });
//   } catch (err) { res.status(400).json({ message: "User exists or invalid data" }); }
// });

// // Login
// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email, password });
//   if (!user) return res.status(401).json({ message: "Invalid credentials" });
//   const token = jwt.sign({ id: user._id }, JWT_SECRET);
//   res.json({ token, user });
// });

// // Get profile
// app.get("/api/auth/me", authMiddleware, async (req, res) => {
//   res.json(req.user);
// });

// // ------------------ Profile Routes ------------------
// // Update profile
// app.put("/api/profile/update", authMiddleware, async (req, res) => {
//   const { name, phone } = req.body;
//   req.user.name = name || req.user.name;
//   req.user.phone = phone || req.user.phone;
//   await req.user.save();
//   res.json({ message: "Profile updated", user: req.user });
// });

// // Upload avatar
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, req.user._id + path.extname(file.originalname))
// });
// const upload = multer({ storage });
// app.post("/api/profile/avatar", authMiddleware, upload.single("avatar"), async (req, res) => {
//   req.user.avatar = `/uploads/${req.file.filename}`;
//   await req.user.save();
//   res.json({ message: "Avatar uploaded", avatar: req.user.avatar });
// });

// // ------------------ Payment Routes ------------------
// app.post("/api/payment/create-order", authMiddleware, async (req, res) => {
//   // Dummy implementation
//   res.json({ order: { id: "order_123", amount: 100, currency: "INR" } });
// });
// app.post("/api/payment/verify-payment", authMiddleware, async (req, res) => {
//   res.json({ message: "Payment verified" });
// });
// app.get("/api/payment/wallet", authMiddleware, async (req, res) => {
//   res.json({ walletBalance: req.user.walletBalance, purchases: [] });
// });

// app.listen(5000, () => console.log("Server running on port 5000"));












// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const path = require("path");

// const app = express();
// app.use(express.json());

// // CORS - allow frontend
// app.use(cors({
//   origin: ["https://fullproject-two.vercel.app"], // tumhare Vercel frontend URL
//   credentials: true,
// }));

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// // MongoDB connect
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch((err) => console.error("MongoDB connection error:", err));

// // User schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   phone: String,
//   password: String,
//   avatar: String,
//   walletBalance: { type: Number, default: 0 },
// });

// const User = mongoose.model("User", userSchema);

// // Middleware to verify JWT
// const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id);
//     if (!req.user) return res.status(401).json({ message: "Unauthorized" });
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// // ===== AUTH ROUTES =====

// // Register
// app.post("/api/auth/register", async (req, res) => {
//   const { name, email, phone, password } = req.body;
//   try {
//     const hashed = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, phone, password: hashed });
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     res.json({ user, token });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Login
// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: "Invalid password" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     res.json({ user, token });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get current user
// app.get("/api/auth/me", authMiddleware, async (req, res) => {
//   res.json(req.user);
// });

// // ===== PROFILE ROUTES =====

// // Update profile
// app.put("/api/profile/update", authMiddleware, async (req, res) => {
//   const { name, phone } = req.body;
//   req.user.name = name;
//   req.user.phone = phone;
//   await req.user.save();
//   res.json({ message: "Profile updated" });
// });

// // Upload avatar
// app.post("/api/profile/avatar", authMiddleware, upload.single("avatar"), async (req, res) => {
//   if (!req.file) return res.status(400).json({ message: "File missing" });
//   req.user.avatar = `/uploads/${req.file.filename}`;
//   await req.user.save();
//   res.json({ message: "Avatar uploaded", avatar: req.user.avatar });
// });

// // ===== PAYMENT ROUTES (placeholder) =====
// app.post("/api/payment/create-order", authMiddleware, (req, res) => {
//   res.json({ message: "Order creation route - integrate Razorpay here" });
// });

// app.post("/api/payment/verify-payment", authMiddleware, (req, res) => {
//   res.json({ message: "Payment verification route - integrate Razorpay here" });
// });

// // ===== STATIC FILES =====
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import paymentRoutes from "./routes/payment.js";
// import authRoutes from "./routes/auth.js";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.error("MongoDB connection error:", err));

// app.use("/api/auth", authRoutes);
// app.use("/api/payment", paymentRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import mongoose from 'mongoose';

// import authRoutes from './routes/auth.js';
// import paymentRoutes from './routes/payment.js';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/payment', paymentRoutes);

// const PORT = process.env.PORT || 5000;

// // MongoDB connect
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error(err));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// server.js
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// import authRoutes from "./routes/auth.js";
// import paymentRoutes from "./routes/payment.js";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/payment", paymentRoutes);

// // MongoDB connection
// const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern-auth";
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.log("❌ MongoDB connection error:", err));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });







// import dotenv from "dotenv";
// dotenv.config();  // <-- sabse pehle


// // server.js
// import express from "express";
// import cors from "cors";

// import mongoose from "mongoose";

// // Routes
// import authRoutes from "./routes/auth.js";
// import paymentRoutes from "./routes/payment.js";
// import profileRoutes from "./routes/profile.js";

// dotenv.config(); // Load .env file

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/profile", profileRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("Server is running ✅");
// });

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, { 
//       useNewUrlParser: true, 
//       useUnifiedTopology: true 
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.log("❌ MongoDB connection error:", err));

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });







// // server.jsimport express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// // Routes import
// import authRoutes from "./routes/auth.js";
// import paymentRoutes from "./routes/payment.js";

// dotenv.config(); // load .env file

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/payment", paymentRoutes);

// app.get("/", (req, res) => {
//   res.send("✅ Server is running...");
// });

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB error:", err));

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });








// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth.js";
// import paymentRoutes from "./routes/payment.js";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/payment", paymentRoutes);

// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.log(err));

// app.listen(PORT, () => console.log(`🚀 Server running ${PORT}`));






// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth.js";
// import paymentRoutes from "./routes/payment.js";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/payment", paymentRoutes);

// // ✅ YE NAYA TEST ROUTE ADD KAREN (YAHI PE)
// app.get("/api/test", (req, res) => {
//   res.json({
//     razorpayKeyId: process.env.RAZORPAY_KEY_ID ? "Set" : "Not Set",
//     razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET ? "Set" : "Not Set",
//     nodeEnv: process.env.NODE_ENV,
//     allEnvKeys: Object.keys(process.env).filter(key => 
//       key.includes("RAZOR") || key.includes("razor")
//     )
//   });
// });

// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.log(err));

// app.listen(PORT, () => console.log(`🚀 Server running ${PORT}`));









// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth.js";
// import paymentRoutes from "./routes/payment.js";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/payment", paymentRoutes);

// // ✅ SIMPLE TEST ROUTE (ERROR FREE)
// app.get("/api/test", (req, res) => {
//   try {
//     res.json({
//       status: "Server is working",
//       razorpayKeyId: process.env.RAZORPAY_KEY_ID ? "Present" : "Missing",
//       razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET ? "Present" : "Missing"
//     });
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch(err => {
//     console.log("MongoDB connection error:", err);
//     // Server still start even if MongoDB fails
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} (without DB)`));
//   });












import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payment.js";
import profileRoutes from "./routes/profile.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);

// ✅ SIMPLE TEST ROUTE (ERROR FREE)
app.get("/api/test", (req, res) => {
  try {
    res.json({
      status: "Server is working",
      razorpayKeyId: process.env.RAZORPAY_KEY_ID ? "Present" : "Missing",
      razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET ? "Present" : "Missing"
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.log("MongoDB connection error:", err);
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} (without DB)`));
  });