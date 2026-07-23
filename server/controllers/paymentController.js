// const User = require("../models/User");
// const Stripe = require("stripe");
// const stripe = new Stripe(process.env.STRIPE_SECRET);

// exports.addMoney = async (req, res) => {
//   try {
//     const { amount, userId, token } = req.body;

//     const charge = await stripe.charges.create({
//       amount: amount * 100, // in paise
//       currency: "inr",
//       source: token.id,
//       description: "Wallet recharge"
//     });

//     const user = await User.findById(userId);
//     user.walletBalance += Number(amount);
//     await user.save();

//     res.json({ success: true, walletBalance: user.walletBalance });
//   } catch (err) {
//     res.status(500).json({ message: "Payment failed", error: err.message });
//   }
// };





// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// // const Purchase = require("./models/Purchase");
// const Purchase = require("../models/purchase");

// const User = require("../models/User");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// const PRODUCTS = [
//   { id:1, name:"AI Robot 1", amount:100, validityDays:2, totalProfit:30, dailyProfit:15 },
//   { id:2, name:"AI Robot 2", amount:500, validityDays:5, totalProfit:125, dailyProfit:25 },
//   { id:3, name:"AI Robot 3", amount:1200, validityDays:15, totalProfit:450, dailyProfit:30 },
//   { id:4, name:"AI Robot 4", amount:2400, validityDays:30, totalProfit:1350, dailyProfit:45 },
//   { id:5, name:"AI Robot 5", amount:4980, validityDays:45, totalProfit:2220, dailyProfit:49.3333333 },
//   { id:6, name:"AI Robot 6", amount:9850, validityDays:60, totalProfit:8150, dailyProfit:135.8333333 },
//   { id:7, name:"AI Robot 7", amount:15600, validityDays:90, totalProfit:24900, dailyProfit:276.6666667 },
//   { id:8, name:"AI Robot 8", amount:22450, validityDays:120, totalProfit:60960, dailyProfit:508 },
//   { id:9, name:"AI Robot 9", amount:35000, validityDays:150, totalProfit:97500, dailyProfit:650 },
//   { id:10, name:"AI Robot 10", amount:55800, validityDays:180, totalProfit:134200, dailyProfit:745.5555556 }
// ];

// // create Razorpay order
// exports.createOrder = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const options = {
//       amount: product.amount * 100, // paise
//       currency: "INR",
//       receipt: `order_rcpt_${Date.now()}`
//     };
//     const order = await razorpay.orders.create(options);
//     return res.json({ order, product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // verify payment and create purchase record
// exports.verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId } = req.body;

//     // verify signature
//     const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest('hex');

//     if (generated_signature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid signature" });
//     }

//     // product
//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     if (!req.user) return res.status(401).json({ message: "Login required" });

//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const startDate = new Date();
//     const expiryDate = new Date(startDate.getTime() + product.validityDays * 24*60*60*1000);

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
//       razorpayPaymentId: razorpay_payment_id
//     });

//     return res.json({ success: true, purchase });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // wallet & purchases
// exports.getWallet = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Login required" });
//     const user = await User.findById(req.user.id).lean();
//     const purchases = await Purchase.find({ user: user._id }).sort({ createdAt: -1 }).lean();
//     return res.json({ walletBalance: user.walletBalance || 0, purchases });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };





// paymentController.js

// 












// import Razorpay from "razorpay";
// import crypto from "crypto";
// import Purchase from "../models/purchase.js";
// import User from "../models/User.js";

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Products list
// const PRODUCTS = [
//   { id: 1, name: "AI Robot 1", amount: 100, validityDays: 2, totalProfit: 30, dailyProfit: 15 },
//   { id: 2, name: "AI Robot 2", amount: 500, validityDays: 5, totalProfit: 125, dailyProfit: 25 },
//   { id: 3, name: "AI Robot 3", amount: 1200, validityDays: 15, totalProfit: 450, dailyProfit: 30 },
//   { id: 4, name: "AI Robot 4", amount: 2400, validityDays: 30, totalProfit: 1350, dailyProfit: 45 },
//   { id: 5, name: "AI Robot 5", amount: 4980, validityDays: 45, totalProfit: 2220, dailyProfit: 49.33 },
//   { id: 6, name: "AI Robot 6", amount: 9850, validityDays: 60, totalProfit: 8150, dailyProfit: 135.83 },
//   { id: 7, name: "AI Robot 7", amount: 15600, validityDays: 90, totalProfit: 24900, dailyProfit: 276.66 },
//   { id: 8, name: "AI Robot 8", amount: 22450, validityDays: 120, totalProfit: 60960, dailyProfit: 508 },
//   { id: 9, name: "AI Robot 9", amount: 35000, validityDays: 150, totalProfit: 97500, dailyProfit: 650 },
//   { id: 10, name: "AI Robot 10", amount: 55800, validityDays: 180, totalProfit: 134200, dailyProfit: 745.55 }
// ];

// // Create Razorpay order
// export const createOrder = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const options = {
//       amount: product.amount * 100, // paise
//       currency: "INR",
//       receipt: `order_rcpt_${Date.now()}`
//     };

//     const order = await razorpay.orders.create(options);
//     res.json({ order, product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Verify payment and create purchase record
// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId } = req.body;

//     // Verify signature
//     const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest('hex');

//     if (generated_signature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid signature" });
//     }

//     // Product check
//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     if (!req.user) return res.status(401).json({ message: "Login required" });

//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const startDate = new Date();
//     const expiryDate = new Date(startDate.getTime() + product.validityDays * 24*60*60*1000);

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
//       razorpayPaymentId: razorpay_payment_id
//     });

//     res.json({ success: true, purchase });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get wallet and purchases
// export const getWallet = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Login required" });
//     const user = await User.findById(req.user.id).lean();
//     const purchases = await Purchase.find({ user: user._id }).sort({ createdAt: -1 }).lean();
//     res.json({ walletBalance: user.walletBalance || 0, purchases });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };











// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const Purchase = require("../models/purchase");
// const User = require("../models/User");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// const PRODUCTS = [
//   { id:1, name:"AI Robot 1", amount:100, validityDays:2, totalProfit:30, dailyProfit:15 },
//   { id:2, name:"AI Robot 2", amount:500, validityDays:5, totalProfit:125, dailyProfit:25 },
//   { id:3, name:"AI Robot 3", amount:1200, validityDays:15, totalProfit:450, dailyProfit:30 },
//   { id:4, name:"AI Robot 4", amount:2400, validityDays:30, totalProfit:1350, dailyProfit:45 },
//   { id:5, name:"AI Robot 5", amount:4980, validityDays:45, totalProfit:2220, dailyProfit:49.33 },
//   { id:6, name:"AI Robot 6", amount:9850, validityDays:60, totalProfit:8150, dailyProfit:135.83 },
//   { id:7, name:"AI Robot 7", amount:15600, validityDays:90, totalProfit:24900, dailyProfit:276.66 },
//   { id:8, name:"AI Robot 8", amount:22450, validityDays:120, totalProfit:60960, dailyProfit:508 },
//   { id:9, name:"AI Robot 9", amount:35000, validityDays:150, totalProfit:97500, dailyProfit:650 },
//   { id:10, name:"AI Robot 10", amount:55800, validityDays:180, totalProfit:134200, dailyProfit:745.55 }
// ];

// exports.createOrder = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const options = { amount: product.amount*100, currency:"INR", receipt:`order_rcpt_${Date.now()}` };
//     const order = await razorpay.orders.create(options);
//     res.json({ order, product });
//   } catch(err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId } = req.body;
//     const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest('hex');

//     if (generated_signature !== razorpay_signature)
//       return res.status(400).json({ message:"Invalid signature" });

//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message:"Invalid product" });

//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message:"User not found" });

//     const startDate = new Date();
//     const expiryDate = new Date(startDate.getTime() + product.validityDays*24*60*60*1000);

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
//       razorpayPaymentId: razorpay_payment_id
//     });

//     res.json({ success:true, purchase });
//   } catch(err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getWallet = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).lean();
//     const purchases = await Purchase.find({ user:user._id }).sort({ createdAt:-1 }).lean();
//     res.json({ walletBalance:user.walletBalance||0, purchases });
//   } catch(err) {
//     res.status(500).json({ message: err.message });
//   }
// };








// const Razorpay = require("razorpay"); // not needed for dummy
// const crypto = require("crypto");
// const Purchase = require("../models/purchase");
// const User = require("../models/User");

// // Dummy Razorpay object to avoid real API calls
// const razorpay = {
//   orders: {
//     create: async (options) => {
//       return {
//         id: "order_dummy_id",
//         amount: options.amount,
//         currency: options.currency,
//         receipt: options.receipt,
//         status: "created",
//       };
//     },
//   },
// };

// // Example PRODUCTS array
// const PRODUCTS = [
//   { id:1, name:"AI Robot 1", amount:100, validityDays:2, totalProfit:30, dailyProfit:15 },
//   { id:2, name:"AI Robot 2", amount:500, validityDays:5, totalProfit:125, dailyProfit:25 },
//   { id:3, name:"AI Robot 3", amount:1200, validityDays:15, totalProfit:450, dailyProfit:30 },
//   { id:4, name:"AI Robot 4", amount:2400, validityDays:30, totalProfit:1350, dailyProfit:45 },
//   { id:5, name:"AI Robot 5", amount:4980, validityDays:45, totalProfit:2220, dailyProfit:49.33 },
//   { id:6, name:"AI Robot 6", amount:9850, validityDays:60, totalProfit:8150, dailyProfit:135.83 },
//   { id:7, name:"AI Robot 7", amount:15600, validityDays:90, totalProfit:24900, dailyProfit:276.66 },
//   { id:8, name:"AI Robot 8", amount:22450, validityDays:120, totalProfit:60960, dailyProfit:508 },
//   { id:9, name:"AI Robot 9", amount:35000, validityDays:150, totalProfit:97500, dailyProfit:650 },
//   { id:10, name:"AI Robot 10", amount:55800, validityDays:180, totalProfit:134200, dailyProfit:745.55 }
// ];

// // Create Razorpay order
// exports.createOrder = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const options = {
//       amount: product.amount * 100,
//       currency: "INR",
//       receipt: `order_rcpt_${Date.now()}`
//     };
//     const order = await razorpay.orders.create(options);
//     return res.json({ order, product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Verify payment (dummy, always success)
// exports.verifyPayment = async (req, res) => {
//   try {
//     const { productId } = req.body;

//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     if (!req.user) return res.status(401).json({ message: "Login required" });

//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const startDate = new Date();
//     const expiryDate = new Date(startDate.getTime() + product.validityDays * 24*60*60*1000);

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
//       razorpayOrderId: "dummy_order_id",
//       razorpayPaymentId: "dummy_payment_id"
//     });

//     return res.json({ success: true, purchase });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get wallet & purchases
// exports.getWallet = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Login required" });
//     const user = await User.findById(req.user.id).lean();
//     const purchases = await Purchase.find({ user: user._id }).sort({ createdAt: -1 }).lean();
//     return res.json({ walletBalance: user.walletBalance || 0, purchases });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };









//after deploy

// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const Purchase = require("../models/purchase");
// const User = require("../models/User");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// const PRODUCTS = [
//   { id:1, name:"AI Robot 1", amount:100, validityDays:2, totalProfit:30, dailyProfit:15 },
//   { id:2, name:"AI Robot 2", amount:500, validityDays:5, totalProfit:125, dailyProfit:25 },
//   { id:3, name:"AI Robot 3", amount:1200, validityDays:15, totalProfit:450, dailyProfit:30 },
//   { id:4, name:"AI Robot 4", amount:2400, validityDays:30, totalProfit:1350, dailyProfit:45 },
//   { id:5, name:"AI Robot 5", amount:4980, validityDays:45, totalProfit:2220, dailyProfit:49.33 },
//   { id:6, name:"AI Robot 6", amount:9850, validityDays:60, totalProfit:8150, dailyProfit:135.83 },
//   { id:7, name:"AI Robot 7", amount:15600, validityDays:90, totalProfit:24900, dailyProfit:276.66 },
//   { id:8, name:"AI Robot 8", amount:22450, validityDays:120, totalProfit:60960, dailyProfit:508 },
//   { id:9, name:"AI Robot 9", amount:35000, validityDays:150, totalProfit:97500, dailyProfit:650 },
//   { id:10, name:"AI Robot 10", amount:55800, validityDays:180, totalProfit:134200, dailyProfit:745.55 }
// ];

// // Create Razorpay order
// exports.createOrder = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const options = { amount: product.amount * 100, currency: "INR", receipt: `order_rcpt_${Date.now()}` };
//     const order = await razorpay.orders.create(options);
//     res.json({ order, product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Verify payment
// exports.verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId } = req.body;
//     const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest('hex');

//     if (generated_signature !== razorpay_signature) return res.status(400).json({ message: "Invalid signature" });

//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     if (!req.user) return res.status(401).json({ message: "Login required" });
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const startDate = new Date();
//     const expiryDate = new Date(startDate.getTime() + product.validityDays * 24*60*60*1000);

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
//       razorpayPaymentId: razorpay_payment_id
//     });

//     res.json({ success: true, purchase });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Wallet
// exports.getWallet = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Login required" });
//     const user = await User.findById(req.user.id).lean();
//     const purchases = await Purchase.find({ user: user._id }).sort({ createdAt: -1 }).lean();
//     res.json({ walletBalance: user.walletBalance || 0, purchases });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };









// server/controllers/paymentController.js
// const Razorpay = require("razorpay");
// const Purchase = require("./models/Purchase");
// const crypto = require("crypto");
// const User = require("../models/User");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Example product list (same as backend)
// const PRODUCTS = [
//   { id:1, name:"AI Robot 1", amount:100, validityDays:2, totalProfit:30, dailyProfit:15 },
//   { id:2, name:"AI Robot 2", amount:500, validityDays:5, totalProfit:125, dailyProfit:25 },
//   { id:3, name:"AI Robot 3", amount:1200, validityDays:15, totalProfit:450, dailyProfit:30 },
//   { id:4, name:"AI Robot 4", amount:2400, validityDays:30, totalProfit:1350, dailyProfit:45 },
//  {  id:5, name:"AI Robot 5", amount:4980, validityDays:45, totalProfit:2220, dailyProfit:49.33 },
//  { id:6, name:"AI Robot 6", amount:9850, validityDays:60, totalProfit:8150, dailyProfit:135.83 },
//  { id:7, name:"AI Robot 7", amount:15600, validityDays:90, totalProfit:24900, dailyProfit:276.66 },
//  { id:8, name:"AI Robot 8", amount:22450, validityDays:120, totalProfit:60960, dailyProfit:508 },
//  { id:9, name:"AI Robot 9", amount:35000, validityDays:150, totalProfit:97500, dailyProfit:650 },
//  { id:10, name:"AI Robot 10", amount:55800, validityDays:180, totalProfit:134200, dailyProfit:745.55 }

// ];

// // Create Razorpay order (called by frontend)
// exports.createOrder = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const options = {
//       amount: product.amount * 100, // paise
//       currency: "INR",
//       receipt: `order_rcpt_${Date.now()}`
//     };

//     const order = await razorpay.orders.create(options);
//     return res.json({ order, product });
//   } catch (err) {
//     console.error("createOrder error:", err);
//     return res.status(500).json({ message: "Order creation failed" });
//   }
// };

// // Verify payment (called by frontend after checkout)
// exports.verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId } = req.body;
//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({ message: "Missing payment fields" });
//     }

//     // verify signature
//     const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest('hex');

//     if (generated_signature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid signature" });
//     }

//     // create purchase record + credit user (example)
//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     if (!req.user) return res.status(401).json({ message: "Login required" });
//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const startDate = new Date();
//     const expiryDate = new Date(startDate.getTime() + product.validityDays * 24*60*60*1000);

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
//       razorpayPaymentId: razorpay_payment_id
//     });

//     return res.json({ success: true, purchase });
//   } catch (err) {
//     console.error("verifyPayment error:", err);
//     return res.status(500).json({ message: "Verification failed" });
//   }
// };

// // Wallet / purchases
// exports.getWallet = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Login required" });
//     const user = await User.findById(req.user._id).lean();
//     const purchases = await Purchase.find({ user: user._id }).sort({ createdAt: -1 }).lean();
//     return res.json({ walletBalance: user.walletBalance || 0, purchases });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch wallet" });
//   }
// };







//final deplpyment

// const Razorpay = require("razorpay");
// const Purchase = require("../models/Purchase");
// const crypto = require("crypto");
// const User = require("../models/User");

// // Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Product list (example)
// const PRODUCTS = [
//   { id:1, name:"AI Robot 1", amount:100, validityDays:2, totalProfit:30, dailyProfit:15 },
//   { id:2, name:"AI Robot 2", amount:500, validityDays:5, totalProfit:125, dailyProfit:25 },
//   { id:3, name:"AI Robot 3", amount:1200, validityDays:15, totalProfit:450, dailyProfit:30 },
//   { id:4, name:"AI Robot 4", amount:2400, validityDays:30, totalProfit:1350, dailyProfit:45 },
//   { id:5, name:"AI Robot 5", amount:4980, validityDays:45, totalProfit:2220, dailyProfit:49.33 },
//   { id:6, name:"AI Robot 6", amount:9850, validityDays:60, totalProfit:8150, dailyProfit:135.83 },
//   { id:7, name:"AI Robot 7", amount:15600, validityDays:90, totalProfit:24900, dailyProfit:276.66 },
//   { id:8, name:"AI Robot 8", amount:22450, validityDays:120, totalProfit:60960, dailyProfit:508 },
//   { id:9, name:"AI Robot 9", amount:35000, validityDays:150, totalProfit:97500, dailyProfit:650 },
//   { id:10, name:"AI Robot 10", amount:55800, validityDays:180, totalProfit:134200, dailyProfit:745.55 }
// ];

// // Create Razorpay order
// exports.createOrder = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Login required" });

//     const { productId } = req.body;
//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const options = {
//       amount: product.amount * 100, // in paise
//       currency: "INR",
//       receipt: `order_rcpt_${Date.now()}`
//     };

//     const order = await razorpay.orders.create(options);
//     return res.json({ order, key_id: process.env.RAZORPAY_KEY_ID });
//   } catch (err) {
//     console.error("createOrder error:", err);
//     return res.status(500).json({ message: "Order creation failed" });
//   }
// };

// // Verify payment
// exports.verifyPayment = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Login required" });

//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId } = req.body;
//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
//       return res.status(400).json({ message: "Missing payment fields" });

//     // Signature verification
//     const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest('hex');

//     if (generated_signature !== razorpay_signature)
//       return res.status(400).json({ message: "Invalid signature" });

//     // Purchase record + user update
//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const startDate = new Date();
//     const expiryDate = new Date(startDate.getTime() + product.validityDays * 24*60*60*1000);

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
//       razorpayPaymentId: razorpay_payment_id
//     });

//     // Optional: update wallet immediately if needed
//     user.walletBalance = (user.walletBalance || 0);
//     await user.save();

//     return res.json({ success: true, purchase });
//   } catch (err) {
//     console.error("verifyPayment error:", err);
//     return res.status(500).json({ message: "Payment verification failed" });
//   }
// };

// // Fetch wallet & purchases
// exports.getWallet = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Login required" });
//     const user = await User.findById(req.user._id).lean();
//     const purchases = await Purchase.find({ user: user._id }).sort({ createdAt: -1 }).lean();
//     return res.json({ walletBalance: user.walletBalance || 0, purchases });
//   } catch (err) {
//     console.error("getWallet error:", err);
//     res.status(500).json({ message: "Failed to fetch wallet" });
//   }
// };





import Razorpay from "razorpay";
import crypto from "crypto";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const PRODUCTS = [
  { id:1, name:"AI Robot 1", amount:100, validityDays:2, totalProfit:30, dailyProfit:15 },
  { id:2, name:"AI Robot 2", amount:500, validityDays:5, totalProfit:125, dailyProfit:25 },
  { id:3, name:"AI Robot 3", amount:1200, validityDays:15, totalProfit:450, dailyProfit:30 },
  { id:4, name:"AI Robot 4", amount:2400, validityDays:30, totalProfit:1350, dailyProfit:45 },
  { id:5, name:"AI Robot 5", amount:4980, validityDays:45, totalProfit:2220, dailyProfit:49.33 },
  { id:6, name:"AI Robot 6", amount:9850, validityDays:60, totalProfit:8150, dailyProfit:135.83 },
  { id:7, name:"AI Robot 7", amount:15600, validityDays:90, totalProfit:24900, dailyProfit:276.66 },
  { id:8, name:"AI Robot 8", amount:22450, validityDays:120, totalProfit:60960, dailyProfit:508 },
  { id:9, name:"AI Robot 9", amount:35000, validityDays:150, totalProfit:97500, dailyProfit:650 },
  { id:10, name:"AI Robot 10", amount:55800, validityDays:180, totalProfit:134200, dailyProfit:745.55 }
];

export const createOrder = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = PRODUCTS.find(p => p.id === Number(productId));
    if (!product) return res.status(400).json({ message: "Invalid product" });

    const options = { amount: product.amount*100, currency:"INR", receipt:`order_rcpt_${Date.now()}` };
    const order = await razorpay.orders.create(options);
    res.json({ order, product });
  } catch (err) {
    res.status(500).json({ message:"Order creation failed" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) 
      return res.status(400).json({ message:"Missing payment fields" });

    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) 
      return res.status(400).json({ message:"Invalid signature" });

    const product = PRODUCTS.find(p => p.id === Number(productId));
    if (!product) return res.status(400).json({ message:"Invalid product" });

    const startDate = new Date();
    const expiryDate = new Date(startDate.getTime() + product.validityDays*24*60*60*1000);

    const purchase = await Purchase.create({
      user: req.user._id,
      productId: product.id,
      productName: product.name,
      amount: product.amount,
      startDate,
      expiryDate,
      totalProfit: product.totalProfit,
      dailyProfit: product.dailyProfit,
      remainingDays: product.validityDays,
      active: true,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id
    });

    res.json({ success:true, purchase });
  } catch (err) {
    res.status(500).json({ message:"Verification failed" });
  }
};

export const getWallet = async (req,res) => {
  try {
    const user = await User.findById(req.user._id).lean();
    const purchases = await Purchase.find({ user: user._id }).sort({ createdAt:-1 }).lean();
    res.json({ walletBalance: user.walletBalance||0, purchases });
  } catch(err) {
    res.status(500).json({ message:"Failed to fetch wallet" });
  }
};




















// import Razorpay from "razorpay";
// import crypto from "crypto";
// import Purchase from "../models/Purchase.js";
// import User from "../models/User.js";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// const PRODUCTS = [
//   { id:1, name:"AI Robot 1", amount:100, validityDays:2, totalProfit:30, dailyProfit:15 },
//   { id:2, name:"AI Robot 2", amount:500, validityDays:5, totalProfit:125, dailyProfit:25 },
//   { id:3, name:"AI Robot 3", amount:1200, validityDays:15, totalProfit:450, dailyProfit:30 },
//   { id:4, name:"AI Robot 4", amount:2400, validityDays:30, totalProfit:1350, dailyProfit:45 },
//   { id:5, name:"AI Robot 5", amount:4980, validityDays:45, totalProfit:2220, dailyProfit:49.33 },
//   { id:6, name:"AI Robot 6", amount:9850, validityDays:60, totalProfit:8150, dailyProfit:135.83 },
//   { id:7, name:"AI Robot 7", amount:15600, validityDays:90, totalProfit:24900, dailyProfit:276.66 },
//   { id:8, name:"AI Robot 8", amount:22450, validityDays:120, totalProfit:60960, dailyProfit:508 },
//   { id:9, name:"AI Robot 9", amount:35000, validityDays:150, totalProfit:97500, dailyProfit:650 },
//   { id:10, name:"AI Robot 10", amount:55800, validityDays:180, totalProfit:134200, dailyProfit:745.55 }
// ];

// export const createOrder = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const options = { amount: product.amount*100, currency:"INR", receipt:`order_rcpt_${Date.now()}` };
//     const order = await razorpay.orders.create(options);
//     res.json({ order, product });
//   } catch (err) {
//     res.status(500).json({ message:"Order creation failed" });
//   }
// };

// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId } = req.body;
//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) 
//       return res.status(400).json({ message:"Missing payment fields" });

//     const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest('hex');

//     if (generated_signature !== razorpay_signature) 
//       return res.status(400).json({ message:"Invalid signature" });

//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message:"Invalid product" });

//     const startDate = new Date();
//     const expiryDate = new Date(startDate.getTime() + product.validityDays*24*60*60*1000);

//     const purchase = await Purchase.create({
//       user: req.user._id,
//       productId: product.id,
//       productName: product.name,
//       amount: product.amount,
//       startDate,
//       expiryDate,
//       totalProfit: product.totalProfit,
//       dailyProfit: product.dailyProfit,
//       remainingDays: product.validityDays,
//       active: true,
//       status: "paid",
//       razorpayOrderId: razorpay_order_id,
//       razorpayPaymentId: razorpay_payment_id
//     });

//     res.json({ success:true, purchase });
//   } catch (err) {
//     res.status(500).json({ message:"Verification failed" });
//   }
// };

// export const getWallet = async (req,res) => {
//   try {
//     const user = await User.findById(req.user._id).lean();
//     const purchases = await Purchase.find({ user: user._id }).sort({ createdAt:-1 }).lean();
//     res.json({ walletBalance: user.walletBalance||0, purchases });
//   } catch(err) {
//     res.status(500).json({ message:"Failed to fetch wallet" });
//   }
// };











// import Razorpay from "razorpay";
// import crypto from "crypto";
// import Purchase from "../models/Purchase.js";
// import User from "../models/User.js";

// const PRODUCTS = [
//   { id:1, name:"AI Robot 1", amount:100, validityDays:2, totalProfit:30, dailyProfit:15 },
//   { id:2, name:"AI Robot 2", amount:500, validityDays:5, totalProfit:125, dailyProfit:25 },
//   { id:3, name:"AI Robot 3", amount:1200, validityDays:15, totalProfit:450, dailyProfit:30 },
//   { id:4, name:"AI Robot 4", amount:2400, validityDays:30, totalProfit:1350, dailyProfit:45 },
//   { id:5, name:"AI Robot 5", amount:4980, validityDays:45, totalProfit:2220, dailyProfit:49.33 },
//   { id:6, name:"AI Robot 6", amount:9850, validityDays:60, totalProfit:8150, dailyProfit:135.83 },
//   { id:7, name:"AI Robot 7", amount:15600, validityDays:90, totalProfit:24900, dailyProfit:276.66 },
//   { id:8, name:"AI Robot 8", amount:22450, validityDays:120, totalProfit:60960, dailyProfit:508 },
//   { id:9, name:"AI Robot 9", amount:35000, validityDays:150, totalProfit:97500, dailyProfit:650 },
//   { id:10, name:"AI Robot 10", amount:55800, validityDays:180, totalProfit:134200, dailyProfit:745.55 }
// ];

// export const createOrder = async (req, res) => {
//   try {
//     // ✅ Razorpay instance created here, at call-time — not at module load time
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const { productId } = req.body;
//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const options = { amount: product.amount*100, currency:"INR", receipt:`order_rcpt_${Date.now()}` };
//     const order = await razorpay.orders.create(options);
//     res.json({ order, product });
//   } catch (err) {
//     res.status(500).json({ message: err.message || "Order creation failed" });
//   }
// };

// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId } = req.body;
//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) 
//       return res.status(400).json({ message:"Missing payment fields" });

//     const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest('hex');

//     if (generated_signature !== razorpay_signature) 
//       return res.status(400).json({ message:"Invalid signature" });

//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message:"Invalid product" });

//     const startDate = new Date();
//     const expiryDate = new Date(startDate.getTime() + product.validityDays*24*60*60*1000);

//     const purchase = await Purchase.create({
//       user: req.user._id,
//       productId: product.id,
//       productName: product.name,
//       amount: product.amount,
//       startDate,
//       expiryDate,
//       totalProfit: product.totalProfit,
//       dailyProfit: product.dailyProfit,
//       remainingDays: product.validityDays,
//       active: true,
//       status: "paid",
//       razorpayOrderId: razorpay_order_id,
//       razorpayPaymentId: razorpay_payment_id
//     });

//     res.json({ success:true, purchase });
//   } catch (err) {
//     res.status(500).json({ message:"Verification failed" });
//   }
// };

// export const getWallet = async (req,res) => {
//   try {
//     const user = await User.findById(req.user._id).lean();
//     const purchases = await Purchase.find({ user: user._id }).sort({ createdAt:-1 }).lean();
//     res.json({ walletBalance: user.walletBalance||0, purchases });
//   } catch(err) {
//     res.status(500).json({ message:"Failed to fetch wallet" });
//   }
// };

