// const express = require("express");
// const { addMoney } = require("../controllers/paymentController");
// const router = express.Router();

// router.post("/add-money", addMoney);

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const paymentController = require("../controllers/paymentController");

// router.post("/create-order", auth, paymentController.createOrder);
// router.post("/verify-payment", auth, paymentController.verifyPayment);
// router.get("/wallet", auth, paymentController.getWallet);

// module.exports = router;




// const express = require("express");
// const router = express.Router();
// const { createOrder, fetchPayment } = require("../controllers/paymentController");

// // Routes
// router.post("/order", createOrder);
// router.get("/payment/:id", fetchPayment);

// module.exports = router;









// import express from "express";
// import { createOrder, paymentVerification } from "../controllers/paymentController.js";

// const router = express.Router();

// // Create order
// router.post("/order", createOrder);

// // Verify payment
// router.post("/verify", paymentVerification);

// export default router;







// const express = require("express");
// const router = express.Router();
// const paymentController = require("../controllers/paymentController");

// router.post("/create-order", paymentController.createOrder);
// router.post("/verify-payment", paymentController.verifyPayment);
// router.get("/wallet", paymentController.getWallet);

// module.exports = router;








// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth"); // JWT middleware
// const paymentController = require("../controllers/paymentController");

// router.post("/create-order", auth, paymentController.createOrder);
// router.post("/verify-payment", auth, paymentController.verifyPayment);
// router.get("/wallet", auth, paymentController.getWallet);

// module.exports = router;






//after deploy

// import express from "express";
// import Razorpay from "razorpay";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const router = express.Router();

// const rzp = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Auth middleware
// const auth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });
//   try {
//     req.user = jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// // Create order
// router.post("/create-order", auth, async (req, res) => {
//   const { productId } = req.body;
//   if (!productId) return res.status(400).json({ message: "Product ID required" });

//   // Product prices same as frontend
//   const products = {
//     1: 100, 2: 500, 3: 1200, 4: 2400, 5: 4980,
//     6: 9850, 7: 15600, 8: 22450, 9: 35000, 10: 55800
//   };

//   const amount = products[productId];
//   if (!amount) return res.status(400).json({ message: "Invalid product" });

//   try {
//     const order = await rzp.orders.create({
//       amount: amount * 100, // in paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`
//     });

//     res.json({ order, key_id: process.env.RAZORPAY_KEY_ID });
//   } catch (err) {
//     res.status(500).json({ message: "Order creation failed", error: err.message });
//   }
// });

// // Verify payment
// router.post("/verify-payment", auth, async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//   if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//     return res.status(400).json({ message: "Incomplete payment data" });
//   }

//   // For simplicity, not verifying signature here (add HMAC verification in production)
//   // Update user's wallet or purchase history
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.wallet = (user.wallet || 0) - 0; // optional: add payment logic
//     await user.save();

//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ message: "Payment verification failed" });
//   }
// });

// export default router;





// import express from "express";
// import Razorpay from "razorpay";
// import dotenv from "dotenv";
// import { verifyToken } from "./authMiddleware.js";

// dotenv.config();
// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // Create order
// router.post("/create-order", verifyToken, async (req, res) => {
//   const { productId } = req.body;
//   const amount = productId * 100; // Example, change as per product
//   try {
//     const order = await razorpay.orders.create({
//       amount,
//       currency: "INR",
//       receipt: `receipt_order_${Date.now()}`
//     });
//     res.json({ order, key_id: process.env.RAZORPAY_KEY_ID });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Order creation failed" });
//   }
// });

// // Verify payment
// router.post("/verify-payment", verifyToken, async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//   // TODO: add verification logic
//   res.json({ success: true });
// });

// export default router;






// import express from 'express';
// import Razorpay from 'razorpay';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const router = express.Router();

// // Middleware
// const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ message: 'No token' });
//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id);
//     next();
//   } catch {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// // Razorpay instance
// const rzp = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // Create order
// router.post('/create-order', authMiddleware, async (req, res) => {
//   const { productId } = req.body;
//   const amount = productId * 100; // example price mapping
//   try {
//     const order = await rzp.orders.create({
//       amount,
//       currency: 'INR',
//       receipt: `order_rcpt_${Date.now()}`
//     });
//     res.json({ order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Order creation failed' });
//   }
// });

// // Verify payment
// router.post('/verify-payment', authMiddleware, async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//   // signature verification can be added here
//   res.json({ message: 'Payment verified' });
// });

// export default router;




// import express from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import dotenv from "dotenv";
// import authMiddleware from "./authMiddleware.js"; // <-- make sure ye file exist karti ho
// import Purchase from "../models/Purchase.js";
// import User from "../models/User.js";

// dotenv.config();

// const router = express.Router();

// // Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Debugging - check env keys
// if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//   console.error("❌ Razorpay keys missing. Check .env file!");
// }

// // Example products
// const PRODUCTS = [
//   { id: 1, name: "AI Robot 1", amount: 100, validityDays: 2, totalProfit: 30, dailyProfit: 15 },
//   { id: 2, name: "AI Robot 2", amount: 500, validityDays: 5, totalProfit: 125, dailyProfit: 25 },
// ];

// // ✅ Create Razorpay Order
// router.post("/create-order", authMiddleware, async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = PRODUCTS.find((p) => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const options = {
//       amount: product.amount * 100, // amount in paise
//       currency: "INR",
//       receipt: `order_rcpt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     return res.json({ order, product });
//   } catch (err) {
//     console.error("createOrder error:", err);
//     return res.status(500).json({ message: "Order creation failed" });
//   }
// });

// // ✅ Verify Razorpay Payment
// router.post("/verify-payment", authMiddleware, async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId } = req.body;

//     const generated_signature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest("hex");

//     if (generated_signature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid signature" });
//     }

//     const product = PRODUCTS.find((p) => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const startDate = new Date();
//     const expiryDate = new Date(startDate.getTime() + product.validityDays * 24 * 60 * 60 * 1000);

//     const purchase = await Purchase.create({
//       user: user._id,
//       productId: product.id,
//       productName: product.name,
//       amount: product.amount,
//       startDate,
//       expiryDate,
//       totalProfit: product.totalProfit,
//       dailyProfit: product.dailyProfit,
//       remainingDays: product.validityDays,
//       active: true,
//       razorpayOrderId: razorpay_order_id,
//       razorpayPaymentId: razorpay_payment_id,
//     });

//     return res.json({ success: true, purchase });
//   } catch (err) {
//     console.error("verifyPayment error:", err);
//     return res.status(500).json({ message: "Payment verification failed" });
//   }
// });

// export default router;








// import express from "express";
// import Razorpay from "razorpay";
// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// dotenv.config();

// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Auth middleware
// const authMiddleware = async (req, res, next) => {
//   const auth = req.headers.authorization;
//   if (!auth) return res.status(401).json({ message: "Unauthorized" });
//   const token = auth.split(" ")[1];
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(payload.id);
//     next();
//   } catch {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

// // Create order
// router.post("/create-order", authMiddleware, async (req, res) => {
//   const { productId } = req.body;
//   const products = {
//     1: { name: "AI Robot 1", price: 100 },
//     2: { name: "AI Robot 2", price: 500 },
//   };
//   const product = products[productId];
//   if (!product) return res.status(400).json({ message: "Invalid product" });

//   const options = {
//     amount: product.price * 100, // in paise
//     currency: "INR",
//     receipt: `order_rcpt_${Date.now()}`,
//   };

//   try {
//     const order = await razorpay.orders.create(options);
//     res.json({ order, key_id: process.env.RAZORPAY_KEY_ID });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Order creation failed" });
//   }
// });

// export default router;





//final deploymenrt

// import express from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // ✅ Create Razorpay Order
// router.post("/create-order", authMiddleware, async (req, res) => {
//   try {
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const options = {
//       amount: req.body.amount * 100, // amount in paisa
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: "Payment order creation failed", error });
//   }
// });

// // ✅ Verify Razorpay Payment
// router.post("/verify-payment", authMiddleware, async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature === razorpay_signature) {
//       res.json({ success: true, message: "Payment verified successfully" });
//     } else {
//       res.status(400).json({ success: false, message: "Invalid signature" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Payment verification failed", error });
//   }
// });

// export default router;












// import express from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // ❌ REMOVE THIS - Yaha se razorpay instance mat banao
// // const razorpay = new Razorpay({ ... });

// // ✅ Create Razorpay Order
// router.post("/create-order", authMiddleware, async (req, res) => {
//   try {
//     console.log("🔹 Create order request from user:", req.user._id);
//     console.log("🔹 Request body:", req.body);
//     console.log("🔹 Razorpay keys:", {
//       keyId: process.env.RAZORPAY_KEY_ID ? "Present" : "Missing",
//       keySecret: process.env.RAZORPAY_KEY_SECRET ? "Present" : "Missing"
//     });

//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.error("❌ Razorpay keys not configured");
//       return res.status(500).json({ 
//         message: "Payment service not configured properly" 
//       });
//     }

//     // ✅ Razorpay instance yaha banao, jab keys available hain
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     if (!req.body.amount || req.body.amount <= 0) {
//       return res.status(400).json({ 
//         message: "Invalid amount" 
//       });
//     }

//     const options = {
//       amount: req.body.amount * 100, // amount in paisa
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     console.log("✅ Order created successfully:", order.id);
    
//     res.json(order);
    
//   } catch (error) {
//     console.error("❌ Order creation error:", error.message);
//     console.error("Stack trace:", error.stack);
//     res.status(500).json({ 
//       message: "Payment order creation failed", 
//       error: error.message 
//     });
//   }
// });

// // ✅ Verify Razorpay Payment
// router.post("/verify-payment", authMiddleware, async (req, res) => {
//   try {
//     console.log("🔹 Payment verification request from user:", req.user._id);
    
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Missing payment details" 
//       });
//     }

//     if (!process.env.RAZORPAY_KEY_SECRET) {
//       return res.status(500).json({ 
//         success: false, 
//         message: "Payment service not configured" 
//       });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature === razorpay_signature) {
//       console.log("✅ Payment verified successfully");
//       res.json({ success: true, message: "Payment verified successfully" });
//     } else {
//       console.error("❌ Invalid signature");
//       res.status(400).json({ success: false, message: "Invalid signature" });
//     }
//   } catch (error) {
//     console.error("❌ Payment verification error:", error.message);
//     res.status(500).json({ 
//       message: "Payment verification failed", 
//       error: error.message 
//     });
//   }
// });

// export default router;








// import express from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // ✅ Product list backend mein
// const PRODUCTS = [
//   { id: 1, name: "AI Robot 1", amount: 100 },
//   { id: 2, name: "AI Robot 2", amount: 500 },
//   { id: 3, name: "AI Robot 3", amount: 1200 },
//   { id: 4, name: "AI Robot 4", amount: 2400 },
//   { id: 5, name: "AI Robot 5", amount: 4980 },
//   { id: 6, name: "AI Robot 6", amount: 9850 },
//   { id: 7, name: "AI Robot 7", amount: 15600 },
//   { id: 8, name: "AI Robot 8", amount: 22450 },
//   { id: 9, name: "AI Robot 9", amount: 35000 },
//   { id: 10, name: "AI Robot 10", amount: 55800 }
// ];

// // ✅ Create Razorpay Order
// router.post("/create-order", authMiddleware, async (req, res) => {
//   try {
//     console.log("🔹 Create order request from user:", req.user._id);
//     console.log("🔹 Request body:", req.body);

//     const { productId } = req.body;

//     // ✅ Product ID se amount nikalo
//     const product = PRODUCTS.find(p => p.id === Number(productId));
    
//     if (!product) {
//       console.error("❌ Invalid product ID:", productId);
//       return res.status(400).json({ 
//         message: "Invalid product selected" 
//       });
//     }

//     console.log("✅ Product found:", product);

//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.error("❌ Razorpay keys not configured");
//       return res.status(500).json({ 
//         message: "Payment service not configured properly" 
//       });
//     }

//     // ✅ Razorpay instance
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const options = {
//       amount: product.amount * 100, // ✅ Product ka amount use karo
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//       notes: {
//         productId: product.id,
//         productName: product.name
//       }
//     };

//     const order = await razorpay.orders.create(options);
//     console.log("✅ Order created successfully:", order.id);
    
//     res.json({
//       ...order,
//       product: product // ✅ Product info bhi bhejo
//     });
    
//   } catch (error) {
//     console.error("❌ Order creation error:", error.message);
//     console.error("Stack trace:", error.stack);
//     res.status(500).json({ 
//       message: "Payment order creation failed", 
//       error: error.message 
//     });
//   }
// });

// // ✅ Verify Razorpay Payment
// router.post("/verify-payment", authMiddleware, async (req, res) => {
//   try {
//     console.log("🔹 Payment verification request from user:", req.user._id);
    
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Missing payment details" 
//       });
//     }

//     if (!process.env.RAZORPAY_KEY_SECRET) {
//       return res.status(500).json({ 
//         success: false, 
//         message: "Payment service not configured" 
//       });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature === razorpay_signature) {
//       console.log("✅ Payment verified successfully");
//       res.json({ success: true, message: "Payment verified successfully" });
//     } else {
//       console.error("❌ Invalid signature");
//       res.status(400).json({ success: false, message: "Invalid signature" });
//     }
//   } catch (error) {
//     console.error("❌ Payment verification error:", error.message);
//     res.status(500).json({ 
//       message: "Payment verification failed", 
//       error: error.message 
//     });
//   }
// });

// export default router;















// import express from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // ✅ PRODUCTS array yaha define karo
// const PRODUCTS = [
//   { id: 1, name: "AI Robot 1", amount: 100 },
//   { id: 2, name: "AI Robot 2", amount: 500 },
//   { id: 3, name: "AI Robot 3", amount: 1200 },
//   { id: 4, name: "AI Robot 4", amount: 2400 },
//   { id: 5, name: "AI Robot 5", amount: 4980 },
//   { id: 6, name: "AI Robot 6", amount: 9850 },
//   { id: 7, name: "AI Robot 7", amount: 15600 },
//   { id: 8, name: "AI Robot 8", amount: 22450 },
//   { id: 9, name: "AI Robot 9", amount: 35000 },
//   { id: 10, name: "AI Robot 10", amount: 55800 }
// ];

// // ✅ Create Razorpay Order
// router.post("/create-order", authMiddleware, async (req, res) => {
//   try {
//     console.log("🔹 Create order request from user:", req.user._id);
//     console.log("🔹 Request body:", req.body);
//     console.log("🔹 Razorpay keys:", {
//       keyId: process.env.RAZORPAY_KEY_ID ? "Present" : "Missing",
//       keySecret: process.env.RAZORPAY_KEY_SECRET ? "Present" : "Missing"
//     });

//     const { productId } = req.body;

//     // ✅ Debug log
//     console.log("🔹 Looking for product ID:", productId, "Type:", typeof productId);
//     console.log("🔹 Available products:", PRODUCTS.length);

//     // ✅ Product find karo
//     const product = PRODUCTS.find(p => p.id === Number(productId));
    
//     if (!product) {
//       console.error("❌ Invalid product ID:", productId);
//       console.error("❌ Available product IDs:", PRODUCTS.map(p => p.id));
//       return res.status(400).json({ 
//         message: "Invalid product selected",
//         productId: productId,
//         availableIds: PRODUCTS.map(p => p.id)
//       });
//     }

//     console.log("✅ Product found:", product);

//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.error("❌ Razorpay keys not configured");
//       return res.status(500).json({ 
//         message: "Payment service not configured properly" 
//       });
//     }

//     // ✅ Razorpay instance
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const options = {
//       amount: product.amount * 100,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//       notes: {
//         productId: product.id,
//         productName: product.name
//       }
//     };

//     console.log("🔹 Creating Razorpay order with options:", options);

//     const order = await razorpay.orders.create(options);
//     console.log("✅ Order created successfully:", order.id);
    
//     res.json({
//       ...order,
//       product: product
//     });
    
//   } catch (error) {
//     console.error("❌ Order creation error:", error.message);
//     console.error("❌ Full error:", error);
//     res.status(500).json({ 
//       message: "Payment order creation failed", 
//       error: error.message 
//     });
//   }
// });

// // ✅ Verify Razorpay Payment
// router.post("/verify-payment", authMiddleware, async (req, res) => {
//   try {
//     console.log("🔹 Payment verification request from user:", req.user._id);
//     console.log("🔹 Verification body:", req.body);
    
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       console.error("❌ Missing payment details");
//       return res.status(400).json({ 
//         success: false, 
//         message: "Missing payment details" 
//       });
//     }

//     if (!process.env.RAZORPAY_KEY_SECRET) {
//       console.error("❌ Razorpay secret not configured");
//       return res.status(500).json({ 
//         success: false, 
//         message: "Payment service not configured" 
//       });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     console.log("🔹 Expected signature:", expectedSignature);
//     console.log("🔹 Received signature:", razorpay_signature);

//     if (expectedSignature === razorpay_signature) {
//       console.log("✅ Payment verified successfully");
//       res.json({ success: true, message: "Payment verified successfully" });
//     } else {
//       console.error("❌ Invalid signature - payment verification failed");
//       res.status(400).json({ success: false, message: "Invalid signature" });
//     }
//   } catch (error) {
//     console.error("❌ Payment verification error:", error.message);
//     console.error("❌ Full error:", error);
//     res.status(500).json({ 
//       message: "Payment verification failed", 
//       error: error.message 
//     });
//   }
// });

// export default router;







//OR UPDATE


// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // ✅ PRODUCTS array
// const PRODUCTS = [
//   { id: 1, name: "AI Robot 1", amount: 100 },
//   { id: 2, name: "AI Robot 2", amount: 500 },
//   { id: 3, name: "AI Robot 3", amount: 1200 },
//   { id: 4, name: "AI Robot 4", amount: 2400 },
//   { id: 5, name: "AI Robot 5", amount: 4980 },
//   { id: 6, name: "AI Robot 6", amount: 9850 },
//   { id: 7, name: "AI Robot 7", amount: 15600 },
//   { id: 8, name: "AI Robot 8", amount: 22450 },
//   { id: 9, name: "AI Robot 9", amount: 35000 },
//   { id: 10, name: "AI Robot 10", amount: 55800 }
// ];

// // ✅ Temporary storage for pending payments (in production, use database)
// const pendingPayments = [];

// // ✅ Submit Transaction ID (User submits UTR after payment)
// router.post("/submit-transaction", authMiddleware, async (req, res) => {
//   try {
//     const { productId, transactionId, amount } = req.body;

//     console.log("🔹 Transaction submission from user:", req.user._id);
//     console.log("🔹 Transaction details:", { productId, transactionId, amount });

//     if (!transactionId || !productId || !amount) {
//       return res.status(400).json({ 
//         message: "Missing required fields" 
//       });
//     }

//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) {
//       return res.status(400).json({ message: "Invalid product" });
//     }

//     // ✅ Check duplicate transaction ID
//     const exists = pendingPayments.find(p => p.transactionId === transactionId);
//     if (exists) {
//       return res.status(400).json({ 
//         message: "Transaction ID already submitted" 
//       });
//     }

//     // ✅ Store pending payment
//     const payment = {
//       userId: req.user._id.toString(),
//       userName: req.user.name,
//       userEmail: req.user.email,
//       productId: product.id,
//       productName: product.name,
//       amount: product.amount,
//       transactionId: transactionId,
//       status: "pending", // pending, verified, rejected
//       submittedAt: new Date(),
//     };

//     pendingPayments.push(payment);

//     console.log("✅ Payment submitted for verification:", payment);
//     console.log("📊 Total pending payments:", pendingPayments.length);

//     res.json({ 
//       success: true, 
//       message: "Payment submitted successfully! Admin will verify soon.",
//       payment: payment
//     });

//   } catch (error) {
//     console.error("❌ Submit transaction error:", error);
//     res.status(500).json({ 
//       message: "Failed to submit payment", 
//       error: error.message 
//     });
//   }
// });

// // ✅ Get all pending payments (Admin only - add admin middleware later)
// router.get("/pending-payments", authMiddleware, async (req, res) => {
//   try {
//     console.log("🔹 Fetching pending payments");
    
//     res.json({ 
//       success: true,
//       payments: pendingPayments,
//       count: pendingPayments.length
//     });

//   } catch (error) {
//     console.error("❌ Fetch payments error:", error);
//     res.status(500).json({ message: "Failed to fetch payments" });
//   }
// });

// // ✅ Verify payment (Admin only - add admin middleware later)
// router.post("/verify-payment-manual", authMiddleware, async (req, res) => {
//   try {
//     const { transactionId, status } = req.body; // status: "verified" or "rejected"

//     console.log("🔹 Manual verification:", { transactionId, status });

//     const payment = pendingPayments.find(p => p.transactionId === transactionId);
    
//     if (!payment) {
//       return res.status(404).json({ message: "Payment not found" });
//     }

//     payment.status = status;
//     payment.verifiedAt = new Date();
//     payment.verifiedBy = req.user._id.toString();

//     console.log(`✅ Payment ${status}:`, payment);

//     res.json({ 
//       success: true,
//       message: `Payment ${status} successfully`,
//       payment: payment
//     });

//   } catch (error) {
//     console.error("❌ Verify payment error:", error);
//     res.status(500).json({ message: "Verification failed" });
//   }
// });

// export default router;








//edit

// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // ✅ PRODUCTS array
// const PRODUCTS = [
//   { id: 1, name: "AI Robot 1", amount: 100 },
//   { id: 2, name: "AI Robot 2", amount: 500 },
//   { id: 3, name: "AI Robot 3", amount: 1200 },
//   { id: 4, name: "AI Robot 4", amount: 2400 },
//   { id: 5, name: "AI Robot 5", amount: 4980 },
//   { id: 6, name: "AI Robot 6", amount: 9850 },
//   { id: 7, name: "AI Robot 7", amount: 15600 },
//   { id: 8, name: "AI Robot 8", amount: 22450 },
//   { id: 9, name: "AI Robot 9", amount: 35000 },
//   { id: 10, name: "AI Robot 10", amount: 55800 }
// ];

// // ✅ Temporary storage for pending payments (in production, use database)
// const pendingPayments = [];

// // ✅ Submit Transaction ID (User submits UTR after payment)
// router.post("/submit-transaction", authMiddleware, async (req, res) => {
//   try {
//     const { productId, transactionId, amount } = req.body;

//     console.log("🔹 Transaction submission from user:", req.user._id);
//     console.log("🔹 Transaction details:", { productId, transactionId, amount });

//     if (!transactionId || !productId || !amount) {
//       return res.status(400).json({ 
//         message: "Missing required fields" 
//       });
//     }

//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) {
//       return res.status(400).json({ message: "Invalid product" });
//     }

//     // ✅ Check duplicate transaction ID
//     const exists = pendingPayments.find(p => p.transactionId === transactionId);
//     if (exists) {
//       return res.status(400).json({ 
//         message: "Transaction ID already submitted" 
//       });
//     }

//     // ✅ Store pending payment
//     const payment = {
//       userId: req.user._id.toString(),
//       userName: req.user.name,
//       userEmail: req.user.email,
//       productId: product.id,
//       productName: product.name,
//       amount: product.amount,
//       transactionId: transactionId,
//       status: "pending", // pending, verified, rejected
//       submittedAt: new Date(),
//     };

//     pendingPayments.push(payment);

//     console.log("✅ Payment submitted for verification:", payment);
//     console.log("📊 Total pending payments:", pendingPayments.length);

//     res.json({ 
//       success: true, 
//       message: "Payment submitted successfully! Admin will verify soon.",
//       payment: payment
//     });

//   } catch (error) {
//     console.error("❌ Submit transaction error:", error);
//     res.status(500).json({ 
//       message: "Failed to submit payment", 
//       error: error.message 
//     });
//   }
// });

// // ✅ Get all pending payments (Admin only - add admin middleware later)
// router.get("/pending-payments", authMiddleware, async (req, res) => {
//   try {
//     console.log("🔹 Fetching pending payments");
    
//     res.json({ 
//       success: true,
//       payments: pendingPayments,
//       count: pendingPayments.length
//     });

//   } catch (error) {
//     console.error("❌ Fetch payments error:", error);
//     res.status(500).json({ message: "Failed to fetch payments" });
//   }
// });

// // ✅ Verify payment (Admin only - add admin middleware later)
// router.post("/verify-payment-manual", authMiddleware, async (req, res) => {
//   try {
//     const { transactionId, status } = req.body; // status: "verified" or "rejected"

//     console.log("🔹 Manual verification:", { transactionId, status });

//     const payment = pendingPayments.find(p => p.transactionId === transactionId);
    
//     if (!payment) {
//       return res.status(404).json({ message: "Payment not found" });
//     }

//     payment.status = status;
//     payment.verifiedAt = new Date();
//     payment.verifiedBy = req.user._id.toString();

//     console.log(`✅ Payment ${status}:`, payment);

//     res.json({ 
//       success: true,
//       message: `Payment ${status} successfully`,
//       payment: payment
//     });

//   } catch (error) {
//     console.error("❌ Verify payment error:", error);
//     res.status(500).json({ message: "Verification failed" });
//   }
// });

// // ✅ Get user's own purchases
// router.get("/my-purchases", authMiddleware, async (req, res) => {
//   try {
//     console.log("🔹 Fetching purchases for user:", req.user._id);
    
//     // Filter purchases by user ID
//     const userPurchases = pendingPayments.filter(
//       p => p.userId === req.user._id.toString()
//     );

//     res.json({ 
//       success: true,
//       purchases: userPurchases,
//       count: userPurchases.length
//     });

//   } catch (error) {
//     console.error("❌ Fetch user purchases error:", error);
//     res.status(500).json({ message: "Failed to fetch purchases" });
//   }
// });

// export default router;










//withdrall

// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import adminMiddleware from "../middleware/adminMiddleware.js";

// const router = express.Router();

// const PRODUCTS = [
//   { id: 1, name: "AI Robot 1", amount: 100 },
//   { id: 2, name: "AI Robot 2", amount: 500 },
//   { id: 3, name: "AI Robot 3", amount: 1200 },
//   { id: 4, name: "AI Robot 4", amount: 2400 },
//   { id: 5, name: "AI Robot 5", amount: 4980 },
//   { id: 6, name: "AI Robot 6", amount: 9850 },
//   { id: 7, name: "AI Robot 7", amount: 15600 },
//   { id: 8, name: "AI Robot 8", amount: 22450 },
//   { id: 9, name: "AI Robot 9", amount: 35000 },
//   { id: 10, name: "AI Robot 10", amount: 55800 }
// ];

// const pendingPayments = [];
// const withdrawalRequests = [];

// // ✅ Submit Transaction ID (User submits after payment)
// router.post("/submit-transaction", authMiddleware, async (req, res) => {
//   try {
//     const { productId, transactionId, amount } = req.body;

//     console.log("🔹 Transaction submission from user:", req.user._id);
//     console.log("🔹 Transaction details:", { productId, transactionId, amount });

//     if (!transactionId || !productId || !amount) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) {
//       return res.status(400).json({ message: "Invalid product" });
//     }

//     const exists = pendingPayments.find(p => p.transactionId === transactionId);
//     if (exists) {
//       return res.status(400).json({ message: "Transaction ID already submitted" });
//     }

//     const payment = {
//       userId: req.user._id.toString(),
//       userName: req.user.name,
//       userEmail: req.user.email,
//       productId: product.id,
//       productName: product.name,
//       amount: product.amount,
//       transactionId: transactionId,
//       status: "pending",
//       submittedAt: new Date(),
//     };

//     pendingPayments.push(payment);

//     console.log("✅ Payment submitted for verification:", payment);

//     res.json({ 
//       success: true, 
//       message: "Payment submitted successfully! Admin will verify soon.",
//       payment: payment
//     });

//   } catch (error) {
//     console.error("❌ Submit transaction error:", error);
//     res.status(500).json({ message: "Failed to submit payment", error: error.message });
//   }
// });

// // ✅ Get user's own purchases
// router.get("/my-purchases", authMiddleware, async (req, res) => {
//   try {
//     console.log("🔹 Fetching purchases for user:", req.user._id);
    
//     const userPurchases = pendingPayments.filter(
//       p => p.userId === req.user._id.toString()
//     );

//     res.json({ 
//       success: true,
//       purchases: userPurchases,
//       count: userPurchases.length
//     });

//   } catch (error) {
//     console.error("❌ Fetch user purchases error:", error);
//     res.status(500).json({ message: "Failed to fetch purchases" });
//   }
// });

// // ✅ Submit Withdrawal Request
// router.post("/withdrawal-request", authMiddleware, async (req, res) => {
//   try {
//     const { amount } = req.body;

//     console.log("🔹 Withdrawal request from user:", req.user._id);
//     console.log("🔹 Amount:", amount);

//     if (!amount || amount <= 0) {
//       return res.status(400).json({ message: "Invalid amount" });
//     }

//     if (req.user.walletBalance < amount) {
//       return res.status(400).json({ message: "Insufficient balance" });
//     }

//     const withdrawal = {
//       userId: req.user._id.toString(),
//       userName: req.user.name,
//       userEmail: req.user.email,
//       amount: amount,
//       bankAccountNumber: req.user.bankAccountNumber || "Not provided",
//       ifscCode: req.user.ifscCode || "Not provided",
//       accountHolderName: req.user.accountHolderName || req.user.name,
//       status: "pending",
//       requestedAt: new Date()
//     };

//     withdrawalRequests.push(withdrawal);

//     console.log("✅ Withdrawal request submitted:", withdrawal);

//     res.json({ 
//       success: true, 
//       message: "Withdrawal request submitted! Admin will process soon.",
//       withdrawal: withdrawal
//     });

//   } catch (error) {
//     console.error("❌ Withdrawal request error:", error);
//     res.status(500).json({ message: "Failed to submit withdrawal request" });
//   }
// });

// // ✅ Get all pending payments (ADMIN ONLY)
// router.get("/pending-payments", authMiddleware, adminMiddleware, async (req, res) => {
//   try {
//     console.log("🔹 Admin fetching pending payments");
    
//     res.json({ 
//       success: true,
//       payments: pendingPayments,
//       count: pendingPayments.length
//     });

//   } catch (error) {
//     console.error("❌ Fetch payments error:", error);
//     res.status(500).json({ message: "Failed to fetch payments" });
//   }
// });

// // ✅ Get all withdrawal requests (ADMIN ONLY)
// router.get("/withdrawal-requests", authMiddleware, adminMiddleware, async (req, res) => {
//   try {
//     console.log("🔹 Admin fetching withdrawal requests");
    
//     res.json({ 
//       success: true,
//       withdrawals: withdrawalRequests,
//       count: withdrawalRequests.length
//     });

//   } catch (error) {
//     console.error("❌ Fetch withdrawals error:", error);
//     res.status(500).json({ message: "Failed to fetch withdrawals" });
//   }
// });

// // ✅ Verify payment (ADMIN ONLY)
// router.post("/verify-payment-manual", authMiddleware, adminMiddleware, async (req, res) => {
//   try {
//     const { transactionId, status } = req.body;

//     console.log("🔹 Admin manual verification:", { transactionId, status });

//     const payment = pendingPayments.find(p => p.transactionId === transactionId);
    
//     if (!payment) {
//       return res.status(404).json({ message: "Payment not found" });
//     }

//     payment.status = status;
//     payment.verifiedAt = new Date();
//     payment.verifiedBy = req.user._id.toString();

//     console.log(`✅ Payment ${status} by admin:`, req.user.email);

//     res.json({ 
//       success: true,
//       message: `Payment ${status} successfully`,
//       payment: payment
//     });

//   } catch (error) {
//     console.error("❌ Verify payment error:", error);
//     res.status(500).json({ message: "Verification failed" });
//   }
// });

// // ✅ Approve/Reject Withdrawal (ADMIN ONLY)
// router.post("/process-withdrawal", authMiddleware, adminMiddleware, async (req, res) => {
//   try {
//     const { userId, amount, status } = req.body;

//     console.log("🔹 Admin processing withdrawal:", { userId, amount, status });

//     const withdrawal = withdrawalRequests.find(
//       w => w.userId === userId && w.amount === amount && w.status === "pending"
//     );
    
//     if (!withdrawal) {
//       return res.status(404).json({ message: "Withdrawal request not found" });
//     }

//     withdrawal.status = status;
//     withdrawal.processedAt = new Date();
//     withdrawal.processedBy = req.user._id.toString();

//     console.log(`✅ Withdrawal ${status} by admin:`, req.user.email);

//     res.json({ 
//       success: true,
//       message: `Withdrawal ${status} successfully`,
//       withdrawal: withdrawal
//     });

//   } catch (error) {
//     console.error("❌ Process withdrawal error:", error);
//     res.status(500).json({ message: "Processing failed" });
//   }
// });

// export default router;










import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { createOrder, verifyPayment, getWallet } from "../controllers/paymentController.js";

const router = express.Router();

const withdrawalRequests = [];

// ✅ Razorpay: Create Order
router.post("/create-order", authMiddleware, createOrder);

// ✅ Razorpay: Verify Payment
router.post("/verify-payment", authMiddleware, verifyPayment);

// ✅ Get user's wallet + purchases
router.get("/wallet", authMiddleware, getWallet);

// ✅ Submit Withdrawal Request
router.post("/withdrawal-request", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    console.log("🔹 Withdrawal request from user:", req.user._id);
    console.log("🔹 Amount:", amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    if (req.user.walletBalance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const withdrawal = {
      userId: req.user._id.toString(),
      userName: req.user.name,
      userEmail: req.user.email,
      amount: amount,
      bankAccountNumber: req.user.bankAccountNumber || "Not provided",
      ifscCode: req.user.ifscCode || "Not provided",
      accountHolderName: req.user.accountHolderName || req.user.name,
      status: "pending",
      requestedAt: new Date()
    };

    withdrawalRequests.push(withdrawal);

    console.log("✅ Withdrawal request submitted:", withdrawal);

    res.json({ 
      success: true, 
      message: "Withdrawal request submitted! Admin will process soon.",
      withdrawal: withdrawal
    });

  } catch (error) {
    console.error("❌ Withdrawal request error:", error);
    res.status(500).json({ message: "Failed to submit withdrawal request" });
  }
});

// ✅ Get all withdrawal requests (ADMIN ONLY)
router.get("/withdrawal-requests", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log("🔹 Admin fetching withdrawal requests");
    
    res.json({ 
      success: true,
      withdrawals: withdrawalRequests,
      count: withdrawalRequests.length
    });

  } catch (error) {
    console.error("❌ Fetch withdrawals error:", error);
    res.status(500).json({ message: "Failed to fetch withdrawals" });
  }
});

// ✅ Approve/Reject Withdrawal (ADMIN ONLY)
router.post("/process-withdrawal", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { userId, amount, status } = req.body;

    console.log("🔹 Admin processing withdrawal:", { userId, amount, status });

    const withdrawal = withdrawalRequests.find(
      w => w.userId === userId && w.amount === amount && w.status === "pending"
    );
    
    if (!withdrawal) {
      return res.status(404).json({ message: "Withdrawal request not found" });
    }

    withdrawal.status = status;
    withdrawal.processedAt = new Date();
    withdrawal.processedBy = req.user._id.toString();

    console.log(`✅ Withdrawal ${status} by admin:`, req.user.email);

    res.json({ 
      success: true,
      message: `Withdrawal ${status} successfully`,
      withdrawal: withdrawal
    });

  } catch (error) {
    console.error("❌ Process withdrawal error:", error);
    res.status(500).json({ message: "Processing failed" });
  }
});

export default router;