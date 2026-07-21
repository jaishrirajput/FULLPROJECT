// import axios from "axios";

// const API = axios.create({ baseURL: "https://fullproject-9.onrender.com/api/payment" });

// export const addMoney = (data) => API.post("/add-money", data).then(res => res.data);








//after deploy

// import axios from "axios";

// // Backend ka base URL
// const API_URL = "https://fullproject-9.onrender.com/api/payment";

// const API = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// // Create Razorpay order
// export const createOrder = async (productId, token) => {
//   const res = await API.post(
//     "/create-order",
//     { productId },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return res.data;
// };

// // Verify payment
// export const verifyPayment = async (paymentData, token) => {
//   const res = await API.post(
//     "/verify-payment",
//     paymentData,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return res.data;
// };

// // Get wallet & purchases
// export const getWallet = async (token) => {
//   const res = await API.get("/wallet", { headers: { Authorization: `Bearer ${token}` } });
//   return res.data;
// };






//after deploy 5

// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE || "https://api.airobotsmarketplace.in/api";
// const RZP_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

// const PRODUCTS = {
//   1: { id: 1, name: "AI Robot 1", price: 100 },
//   2: { id: 2, name: "AI Robot 2", price: 500 },
//   3: { id: 3, name: "AI Robot 3", price: 1200 },
//   4: { id: 4, name: "AI Robot 4", price: 2400 },
//   5: { id: 5, name: "AI Robot 5", price: 4980 },
//   6: { id: 6, name: "AI Robot 6", price: 9850 },
//   7: { id: 7, name: "AI Robot 7", price: 15600 },
//   8: { id: 8, name: "AI Robot 8", price: 22450 },
//   9: { id: 9, name: "AI Robot 9", price: 35000 },
//   10: { id: 10, name: "AI Robot 10", price: 55800 },
// };

// export default function PaymentPage() {
//   const { id } = useParams();
//   const product = PRODUCTS[id];
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   const handlePay = async () => {
//     if (!product) return;
//     if (!token) {
//       alert("Please login first");
//       navigate("/auth");
//       return;
//     }

//     try {
//       setLoading(true);
//       // 1) Create order on backend
//       const res = await axios.post(
//         `${API_BASE}/api/payment/create-order`,
//         { productId: product.id },
//         { headers }
//       );

//       const order = res.data?.order;
//       if (!order || !order.amount) {
//         alert("Invalid order response from server");
//         return;
//       }

//       // 2) Razorpay checkout
//       const options = {
//         key: RZP_KEY || res.data.key_id || "",
//         amount: order.amount,
//         currency: order.currency || "INR",
//         name: product.name,
//         description: `Purchase ${product.name}`,
//         order_id: order.id,
//         handler: async (response) => {
//           try {
//             await axios.post(
//               `${API_BASE}/api/payment/verify-payment`,
//               {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 productId: product.id
//               },
//               { headers }
//             );
//             alert("Payment successful");
//             navigate("/success");
//           } catch (err) {
//             console.error("Payment verification error:", err);
//             alert("Payment verification failed");
//             navigate("/cancel");
//           }
//         },
//         prefill: {
//           name: localStorage.getItem("name") || "",
//           email: localStorage.getItem("email") || ""
//         },
//         theme: { color: "#0b74de" }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Order creation error:", err);
//       alert(err.response?.data?.message || "Order creation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!product) return <div style={{ padding: 24 }}>Product not found</div>;

//   return (
//     <div style={{ padding: 24, maxWidth: 720, margin: "40px auto", background: "#fff", borderRadius: 8 }}>
//       <h2>{product.name}</h2>
//       <p style={{ fontSize: 20, fontWeight: 700 }}>Price: ₹{product.price}</p>
//       <button
//         onClick={handlePay}
//         disabled={loading}
//         style={{ marginTop: 12, padding: "10px 14px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: 8 }}
//       >
//         {loading ? "Processing..." : `Pay ₹${product.price}`}
//       </button>
//     </div>
//   );
// }














import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://api.airobotsmarketplace.in/api";
const RZP_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

const PRODUCTS = {
  1: { id: 1, name: "AI Robot 1", price: 100 },
  2: { id: 2, name: "AI Robot 2", price: 500 },
  3: { id: 3, name: "AI Robot 3", price: 1200 },
  4: { id: 4, name: "AI Robot 4", price: 2400 },
  5: { id: 5, name: "AI Robot 5", price: 4980 },
  6: { id: 6, name: "AI Robot 6", price: 9850 },
  7: { id: 7, name: "AI Robot 7", price: 15600 },
  8: { id: 8, name: "AI Robot 8", price: 22450 },
  9: { id: 9, name: "AI Robot 9", price: 35000 },
  10: { id: 10, name: "AI Robot 10", price: 55800 },
};

export default function PaymentPage() {
  const { id } = useParams();
  const product = PRODUCTS[id];
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const handlePay = async () => {
    if (!product) return;
    if (!token) {
      alert("Please login first");
      navigate("/auth");
      return;
    }

    try {
      setLoading(true);
      // 1) Create order on backend
      const res = await axios.post(
        `${API_BASE}/payment/create-order`,
        { productId: product.id },
        { headers }
      );

      const order = res.data?.order;
      if (!order || !order.amount) {
        alert("Invalid order response from server");
        return;
      }

      // 2) Razorpay checkout
      const options = {
        key: RZP_KEY || res.data.key_id || "",
        amount: order.amount,
        currency: order.currency || "INR",
        name: product.name,
        description: `Purchase ${product.name}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            await axios.post(
              `${API_BASE}/payment/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                productId: product.id
              },
              { headers }
            );
            alert("Payment successful");
            navigate("/success");
          } catch (err) {
            console.error("Payment verification error:", err);
            alert("Payment verification failed");
            navigate("/cancel");
          }
        },
        prefill: {
          name: localStorage.getItem("name") || "",
          email: localStorage.getItem("email") || ""
        },
        theme: { color: "#0b74de" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Order creation error:", err);
      alert(err.response?.data?.message || "Order creation failed");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div style={{ padding: 24 }}>Product not found</div>;

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "40px auto", background: "#fff", borderRadius: 8 }}>
      <h2>{product.name}</h2>
      <p style={{ fontSize: 20, fontWeight: 700 }}>Price: ₹{product.price}</p>
      <button
        onClick={handlePay}
        disabled={loading}
        style={{ marginTop: 12, padding: "10px 14px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: 8 }}
      >
        {loading ? "Processing..." : `Pay ₹${product.price}`}
      </button>
    </div>
  );
}





