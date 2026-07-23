// const mongoose = require("mongoose");

// const purchaseSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   productId: Number,
//   productName: String,
//   amount: Number,
//   startDate: { type: Date, default: Date.now },
//   expiryDate: Date,
//   totalProfit: Number,
//   dailyProfit: Number,
//   remainingDays: Number,
//   active: { type: Boolean, default: true },
//   razorpayOrderId: String,
//   razorpayPaymentId: String
// }, { timestamps: true });

// module.exports = mongoose.model("Purchase", purchaseSchema);







// const mongoose = require("mongoose");

// const purchaseSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   productId: Number,
//   productName: String,
//   amount: Number,
//   startDate: Date,
//   expiryDate: Date,
//   totalProfit: Number,
//   dailyProfit: Number,
//   remainingDays: Number,
//   active: Boolean,
//   razorpayOrderId: String,
//   razorpayPaymentId: String
// }, { timestamps: true });

// module.exports = mongoose.model("Purchase", purchaseSchema);




// const mongoose = require("mongoose");

// const purchaseSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   amount: { type: Number, required: true },
//   paymentId: { type: String },  // Razorpay payment ID
//   orderId: { type: String },    // Razorpay order ID
//   status: { type: String, default: "pending" }, // pending / success / failed
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Purchase", purchaseSchema);






// import mongoose from "mongoose";

// const purchaseSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     razorpayOrderId: {
//       type: String,
//       required: true,
//     },
//     razorpayPaymentId: {
//       type: String,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["created", "paid", "failed"],
//       default: "created",
//     },
//   },
//   { timestamps: true }
// );

// const Purchase = mongoose.model("Purchase", purchaseSchema);
// export default Purchase;







//final deploy

// import mongoose from "mongoose";

// const purchaseSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // User collection se reference
//       required: true,
//     },
//     razorpayOrderId: {
//       type: String,
//       required: true, // order create hone par mandatory
//     },
//     razorpayPaymentId: {
//       type: String, // payment complete hone par fill hoga
//     },
//     amount: {
//       type: Number,
//       required: true, // payment amount
//     },
//     status: {
//       type: String,
//       enum: ["created", "paid", "failed"], // order ka status
//       default: "created",
//     },
//   },
//   { timestamps: true } // createdAt aur updatedAt automatically add hote hain
// );

// const Purchase = mongoose.model("Purchase", purchaseSchema);
// export default Purchase;










import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    totalProfit: {
      type: Number,
      default: 0,
    },
    dailyProfit: {
      type: Number,
      default: 0,
    },
    remainingDays: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;
