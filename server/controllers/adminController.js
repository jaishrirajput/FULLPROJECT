// const Purchase = require("./models/Purchase");
// const Purchase = require("./models/purchase");

// const User = require("../models/User");

// // manual run distribution (for testing)
// exports.runDistributionNow = async (req, res) => {
//   try {
//     const activePurchases = await Purchase.find({ active: true });
//     for (const p of activePurchases) {
//       if (p.remainingDays <= 0) {
//         p.active = false;
//         await p.save();
//         continue;
//       }
//       await User.findByIdAndUpdate(p.user, { $inc: { walletBalance: p.dailyProfit } });
//       p.remainingDays = p.remainingDays - 1;
//       if (p.remainingDays <= 0) p.active = false;
//       await p.save();
//     }
//     return res.json({ success: true, message: "Distribution executed" });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };




//final deply

// const Purchase = require("./models/purchase");
// const User = require("../models/User");

// // Manual run distribution (for testing/admin)
// exports.runDistributionNow = async (req, res) => {
//   try {
//     const activePurchases = await Purchase.find({ active: true });

//     for (const purchase of activePurchases) {
//       if (purchase.remainingDays <= 0) {
//         purchase.active = false;
//         await purchase.save();
//         continue;
//       }

//       await User.findByIdAndUpdate(
//         purchase.user,
//         { $inc: { walletBalance: purchase.dailyProfit } },
//         { new: true }
//       );

//       purchase.remainingDays -= 1;

//       if (purchase.remainingDays <= 0) purchase.active = false;

//       await purchase.save();
//     }

//     return res.json({
//       success: true,
//       message: "Profit distribution executed successfully",
//     });
//   } catch (err) {
//     console.error("Distribution error:", err);
//     return res.status(500).json({ message: err.message });
//   }
// };




// import User from "../models/User.js";
// import Purchase from "../models/Purchase.js";

// // Manual run distribution
// export const runDistributionNow = async (req, res) => {
//   try {
//     const activePurchases = await Purchase.find({ active: true });
//     for (const p of activePurchases) {
//       if (p.remainingDays <= 0) {
//         p.active = false;
//         await p.save();
//         continue;
//       }
//       await User.findByIdAndUpdate(p.user, { $inc: { walletBalance: p.dailyProfit } });
//       p.remainingDays = p.remainingDays - 1;
//       if (p.remainingDays <= 0) p.active = false;
//       await p.save();
//     }
//     return res.json({ success: true, message: "Distribution executed" });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };








import User from "../models/User.js";
import Purchase from "../models/Purchase.js";

// Manual run distribution
export const runDistributionNow = async (req, res) => {
  try {
    const activePurchases = await Purchase.find({ active: true });

    for (const p of activePurchases) {
      if (p.remainingDays <= 0) {
        p.active = false;
        await p.save();
        continue;
      }

      p.remainingDays = p.remainingDays - 1;

      // Credit daily profit
      let amountToCredit = p.dailyProfit;

      // ✅ On the last day, also return the principal (invested amount)
      if (p.remainingDays <= 0) {
        amountToCredit += p.amount;
        p.active = false;
      }

      await User.findByIdAndUpdate(p.user, { $inc: { walletBalance: amountToCredit } });
      await p.save();
    }

    return res.json({ success: true, message: "Distribution executed" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};