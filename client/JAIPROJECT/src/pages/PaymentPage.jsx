// import React, { useState } from "react";
// import StripeCheckout from "react-stripe-checkout";
// import { addMoney } from "../api/payment";

// export default function PaymentPage() {
//   const [amount, setAmount] = useState(0);

//   const handleToken = async (token) => {
//     try {
//       const userId = "user_id_here"; // replace with logged in user id
//       const res = await addMoney({ amount, token, userId });
//       alert("Payment successful! New balance: " + res.walletBalance);
//     } catch (err) {
//       alert("Payment failed");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto" }}>
//       <h2>Add Money</h2>
//       <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
//       <StripeCheckout
//         stripeKey="your_public_stripe_key_here"
//         token={handleToken}
//         amount={amount * 100}
//         currency="INR"
//       />
//     </div>
//   );
// }





// import React, { useState } from "react";
// import StripeCheckout from "react-stripe-checkout";

// export default function PaymentPage() {
//   const [amount, setAmount] = useState(100);

//   const handleToken = (token) => {
//     console.log("Stripe Token:", token);
//     alert("Payment Successful!");
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>💳 Payment Page</h1>
//       <p>Enter amount and proceed to pay:</p>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         style={{ padding: "10px", margin: "10px" }}
//       />
//       <StripeCheckout
//         stripeKey="your_stripe_public_key"
//         token={handleToken}
//         amount={amount * 100}
//         name="Jai Project Payment"
//         currency="INR"
//       />
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE || "https://fullproject-9.onrender.com";
// const RZP_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

// const PRODUCTS = {
//   1:{ id:1, name:"AI Robot 1", price:100 },
//   2:{ id:2, name:"AI Robot 2", price:500 },
//   3:{ id:3, name:"AI Robot 3", price:1200 },
//   4:{ id:4, name:"AI Robot 4", price:2400 },
//   5:{ id:5, name:"AI Robot 5", price:4980 },
//   6:{ id:6, name:"AI Robot 6", price:9850 },
//   7:{ id:7, name:"AI Robot 7", price:15600 },
//   8:{ id:8, name:"AI Robot 8", price:22450 },
//   9:{ id:9, name:"AI Robot 9", price:35000 },
//   10:{ id:10, name:"AI Robot 10", price:55800 },
// };

// export default function PaymentPage(){
//   const { id } = useParams();
//   const product = PRODUCTS[id];
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   const handlePay = async () => {
//     if (!product) return;
//     const token = localStorage.getItem("token");
//     if (!token) { alert("Please login first"); navigate("/auth"); return; }

//     try {
//       setLoading(true);
//       // 1) create order
//       const orderResp = await axios.post(`${API_BASE}/api/payment/create-order`, { productId: product.id }, { headers: getAuthHeader() });
//       const { order } = orderResp.data;

//       // 2) open razorpay checkout
//       const options = {
//         key: RZP_KEY,
//         amount: order.amount,
//         currency: order.currency || "INR",
//         name: product.name,
//         description: `Purchase ${product.name}`,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             // verify on server
//             await axios.post(`${API_BASE}/api/payment/verify-payment`, {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               productId: product.id
//             }, { headers: getAuthHeader() });

//             alert("Payment successful");
//             navigate("/success");
//           } catch (err) {
//             console.error(err);
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
//       console.error(err);
//       alert(err.response?.data?.message || "Order creation failed");
//     } finally { setLoading(false); }
//   };

//   if (!product) return <div style={{padding:24}}>Product not found</div>;

//   return (
//     <div style={{padding:24, maxWidth:720, margin:"40px auto", background:"#fff", borderRadius:8}}>
//       <h2>{product.name}</h2>
//       <p style={{fontSize:20, fontWeight:700}}>Price: ₹{product.price}</p>
//       <p style={{color:"var(--muted)"}}>This product has its own validity & daily profit configured on the backend.</p>
//       <button onClick={handlePay} disabled={loading} style={{marginTop:12, padding:"10px 14px", background:"var(--primary)", color:"#fff", border:"none", borderRadius:8}}>
//         {loading ? "Processing..." : `Pay ₹${product.price}`}
//       </button>
//     </div>
//   );
// }





//after deploy

// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE;
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

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   const handlePay = async () => {
//     if (!product) return;
//     const token = localStorage.getItem("token");
//     if (!token) { alert("Please login first"); navigate("/auth"); return; }

//     try {
//       setLoading(true);
//       const orderResp = await axios.post(`${API_BASE}/api/payment/create-order`, { productId: product.id }, { headers: getAuthHeader() });
//       const { order } = orderResp.data;

//       const options = {
//         key: RZP_KEY,
//         amount: order.amount,
//         currency: order.currency || "INR",
//         name: product.name,
//         description: `Purchase ${product.name}`,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             await axios.post(`${API_BASE}/api/payment/verify-payment`, {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               productId: product.id
//             }, { headers: getAuthHeader() });

//             alert("Payment successful");
//             navigate("/success");
//           } catch (err) {
//             console.error(err);
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
//       console.error(err);
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
//       <button onClick={handlePay} disabled={loading} style={{ marginTop: 12, padding: "10px 14px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: 8 }}>
//         {loading ? "Processing..." : `Pay ₹${product.price}`}
//       </button>
//     </div>
//   );
// }









// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = "https://fullproject-9.onrender.com";
// const RZP_KEY = ""; // skip abhi, key nahi hai

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

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   const handlePay = async () => {
//     if (!product) return;
//     const token = localStorage.getItem("token");
//     if (!token) { alert("Please login first"); navigate("/auth"); return; }

//     try {
//       setLoading(true);
//       const orderResp = await axios.post(`${API_BASE}/api/payment/create-order`, { productId: product.id }, { headers: getAuthHeader() });
//       const { order } = orderResp.data;

//       const options = {
//         key: RZP_KEY,
//         amount: order.amount,
//         currency: order.currency || "INR",
//         name: product.name,
//         description: `Purchase ${product.name}`,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             await axios.post(`${API_BASE}/api/payment/verify-payment`, {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               productId: product.id
//             }, { headers: getAuthHeader() });

//             alert("Payment successful");
//             navigate("/success");
//           } catch (err) {
//             console.error(err);
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
//       console.error(err);
//       alert(err.response?.data?.message || "Order creation failed");
//     } finally { setLoading(false); }
//   };

//   if (!product) return <div style={{ padding: 24 }}>Product not found</div>;

//   return (
//     <div style={{ padding: 24, maxWidth: 720, margin: "40px auto", background: "#fff", borderRadius: 8 }}>
//       <h2>{product.name}</h2>
//       <p style={{ fontSize: 20, fontWeight: 700 }}>Price: ₹{product.price}</p>
//       <button onClick={handlePay} disabled={loading} style={{ marginTop: 12, padding: "10px 14px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: 8 }}>
//         {loading ? "Processing..." : `Pay ₹${product.price}`}
//       </button>
//     </div>
//   );
// }










// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE || "https://fullproject-9.onrender.com";
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

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   const handlePay = async () => {
//     if (!product) return;
//     const token = localStorage.getItem("token");
//     if (!token) { alert("Please login first"); navigate("/auth"); return; }

//     try {
//       setLoading(true);
//       const orderResp = await axios.post(`${API_BASE}/api/payment/create-order`, { productId: product.id }, { headers: getAuthHeader() });
//       const { order } = orderResp.data;

//       const options = {
//         key: RZP_KEY,
//         amount: order.amount,
//         currency: order.currency || "INR",
//         name: product.name,
//         description: `Purchase ${product.name}`,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             await axios.post(`${API_BASE}/api/payment/verify-payment`, {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               productId: product.id
//             }, { headers: getAuthHeader() });

//             alert("Payment successful");
//             navigate("/success");
//           } catch (err) {
//             console.error(err);
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
//       console.error(err);
//       alert(err.response?.data?.message || "Order creation failed");
//     } finally { setLoading(false); }
//   };

//   if (!product) return <div style={{ padding: 24 }}>Product not found</div>;

//   return (
//     <div style={{ padding: 24, maxWidth: 720, margin: "40px auto", background: "#fff", borderRadius: 8 }}>
//       <h2>{product.name}</h2>
//       <p style={{ fontSize: 20, fontWeight: 700 }}>Price: ₹{product.price}</p>
//       <p style={{ color: "var(--muted)" }}>This product has its own validity & daily profit configured on the backend.</p>
//       <button onClick={handlePay} disabled={loading} style={{ marginTop: 12, padding: "10px 14px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: 8 }}>
//         {loading ? "Processing..." : `Pay ₹${product.price}`}
//       </button>
//     </div>
//   );
// }











// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = "https://fullproject-9.onrender.com";
// const RZP_KEY = ""; // Abhi key nahi hai, skip karke dummy use kar sakte ho

// const PRODUCTS = {
//   1:{ id:1, name:"AI Robot 1", price:100 },
//   2:{ id:2, name:"AI Robot 2", price:500 },
//   3:{ id:3, name:"AI Robot 3", price:1200 },
//   4:{ id:4, name:"AI Robot 4", price:2400 },
//   5:{ id:5, name:"AI Robot 5", price:4980 },
//   6:{ id:6, name:"AI Robot 6", price:9850 },
//   7:{ id:7, name:"AI Robot 7", price:15600 },
//   8:{ id:8, name:"AI Robot 8", price:22450 },
//   9:{ id:9, name:"AI Robot 9", price:35000 },
//   10:{ id:10, name:"AI Robot 10", price:55800 },
// };

// export default function PaymentPage() {
//   const { id } = useParams();
//   const product = PRODUCTS[id];
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   const handlePay = async () => {
//     if (!product) return;
//     const token = localStorage.getItem("token");
//     if (!token) { alert("Please login first"); navigate("/auth"); return; }

//     try {
//       setLoading(true);
//       // 1) create order on backend
//       const orderResp = await axios.post(`${API_BASE}/api/payment/create-order`, { productId: product.id }, { headers: getAuthHeader() });
//       const { order } = orderResp.data;

//       // 2) Razorpay checkout options
//       const options = {
//         key: RZP_KEY,
//         amount: order.amount,
//         currency: order.currency || "INR",
//         name: product.name,
//         description: `Purchase ${product.name}`,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             // verify on server
//             await axios.post(`${API_BASE}/api/payment/verify-payment`, {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               productId: product.id
//             }, { headers: getAuthHeader() });

//             alert("Payment successful");
//             navigate("/success");
//           } catch (err) {
//             console.error(err);
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
//       console.error(err);
//       alert(err.response?.data?.message || "Order creation failed");
//     } finally { setLoading(false); }
//   };

//   if (!product) return <div style={{padding:24}}>Product not found</div>;

//   return (
//     <div style={{padding:24, maxWidth:720, margin:"40px auto", background:"#fff", borderRadius:8}}>
//       <h2>{product.name}</h2>
//       <p style={{fontSize:20, fontWeight:700}}>Price: ₹{product.price}</p>
//       <p style={{color:"var(--muted)"}}>This product has its own validity & daily profit configured on the backend.</p>
//       <button onClick={handlePay} disabled={loading} style={{marginTop:12, padding:"10px 14px", background:"var(--primary)", color:"#fff", border:"none", borderRadius:8}}>
//         {loading ? "Processing..." : `Pay ₹${product.price}`}
//       </button>
//     </div>
//   );
// }















// client/JAIPROJECT/src/pages/PaymentPage.jsx
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE || "https://fullproject-9.onrender.com";
// const RZP_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

// const PRODUCTS = {
//   1:{ id:1, name:"AI Robot 1", price:100 },
//   2:{ id:2, name:"AI Robot 2", price:500 },
//   3:{ id:3, name:"AI Robot 3", price:1200 },
//   4:{ id:4, name:"AI Robot 4", price:2400 },
//   5:{ id:5, name:"AI Robot 5", price:4980 },
//   6:{ id:6, name:"AI Robot 6", price:9850 },
//   7:{ id:7, name:"AI Robot 7", price:15600 },
//   8:{ id:8, name:"AI Robot 8", price:22450 },
//   9:{ id:9, name:"AI Robot 9", price:35000 },
//   10:{ id:10, name:"AI Robot 10", price:55800 },
// };

// export default function PaymentPage(){
//   const { id } = useParams();
//   const product = PRODUCTS[id];
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   const handlePay = async () => {
//     if (!product) return;
//     const token = localStorage.getItem("token");
//     if (!token) { alert("Please login first"); navigate("/auth"); return; }

//     try {
//       setLoading(true);
//       // 1) Create order on backend
//       const orderResp = await axios.post(`${API_BASE}/api/payment/create-order`, { productId: product.id }, { headers: getAuthHeader() });
//       const { order } = orderResp.data;

//       // 2) Configure Razorpay checkout
//       const options = {
//         key: RZP_KEY || orderResp.data.key_id || "", // fallback if you choose to return key from backend
//         amount: order.amount,
//         currency: order.currency || "INR",
//         name: product.name,
//         description: `Purchase ${product.name}`,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             // 3) Verify on backend
//             await axios.post(`${API_BASE}/api/payment/verify-payment`, {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               productId: product.id
//             }, { headers: getAuthHeader() });

//             alert("Payment successful");
//             navigate("/success");
//           } catch (err) {
//             console.error("verify error:", err);
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
//       console.error("order error:", err);
//       alert(err.response?.data?.message || "Order creation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!product) return <div style={{padding:24}}>Product not found</div>;

//   return (
//     <div style={{padding:24, maxWidth:720, margin:"40px auto", background:"#fff", borderRadius:8}}>
//       <h2>{product.name}</h2>
//       <p style={{fontSize:20, fontWeight:700}}>Price: ₹{product.price}</p>
//       <p style={{color:"var(--muted)"}}>This product has its own validity & daily profit configured on the backend.</p>
//       <button onClick={handlePay} disabled={loading} style={{marginTop:12, padding:"10px 14px", background:"var(--primary)", color:"#fff", border:"none", borderRadius:8}}>
//         {loading ? "Processing..." : `Pay ₹${product.price}`}
//       </button>
//     </div>
//   );
// }








// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = "https://fullproject-9.onrender.com"; // backend URL

// const PRODUCTS = {
//   1:{ id:1, name:"AI Robot 1", price:100 },
//   2:{ id:2, name:"AI Robot 2", price:500 },
//   3:{ id:3, name:"AI Robot 3", price:1200 },
//   4:{ id:4, name:"AI Robot 4", price:2400 },
//   5:{ id:5, name:"AI Robot 5", price:4980 },
//   6:{ id:6, name:"AI Robot 6", price:9850 },
//   7:{ id:7, name:"AI Robot 7", price:15600 },
//   8:{ id:8, name:"AI Robot 8", price:22450 },
//   9:{ id:9, name:"AI Robot 9", price:35000 },
//   10:{ id:10, name:"AI Robot 10", price:55800 },
// };

// export default function PaymentPage() {
//   const { id } = useParams();
//   const product = PRODUCTS[id];
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   const handlePay = async () => {
//     if (!product) return;
//     const token = localStorage.getItem("token");
//     if (!token) { alert("Please login first"); navigate("/auth"); return; }

//     try {
//       setLoading(true);
//       // 1) Create order on backend
//       const orderResp = await axios.post(
//         `${API_BASE}/api/payment/create-order`,
//         { productId: product.id },
//         { headers: getAuthHeader() }
//       );
//       const { order } = orderResp.data;

//       // 2) Configure Razorpay checkout
//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID, // frontend key from .env
//         amount: order.amount,
//         currency: order.currency || "INR",
//         name: product.name,
//         description: `Purchase ${product.name}`,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             // 3) Verify payment on backend
//             await axios.post(
//               `${API_BASE}/api/payment/verify-payment`,
//               {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature
//               },
//               { headers: getAuthHeader() }
//             );
//             alert("Payment successful");
//             navigate("/success");
//           } catch (err) {
//             console.error(err);
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
//       console.error("order error:", err);
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









//final deployment

// src/pages/PaymentPage.jsx
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api"; // ✅ apna axios instance use karna

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

//   const handlePay = async () => {
//     if (!product) return;
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("⚠️ Please login first");
//       navigate("/auth");
//       return;
//     }

//     try {
//       setLoading(true);

//       // 1) Backend pe order create karna
//       const orderResp = await API.post("/payment/create-order", {
//         productId: product.id,
//       });

//       const { order } = orderResp.data;

//       // 2) Razorpay checkout config
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ✅ vite ya react ke liye env variable
//         amount: order.amount,
//         currency: order.currency || "INR",
//         name: product.name,
//         description: `Purchase ${product.name}`,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             // 3) Backend pe payment verify
//             await API.post("/payment/verify-payment", {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             });

//             alert("✅ Payment successful!");
//             navigate("/success");
//           } catch (err) {
//             console.error("verify error:", err);
//             alert("❌ Payment verification failed");
//             navigate("/cancel");
//           }
//         },
//         prefill: {
//           name: localStorage.getItem("name") || "",
//           email: localStorage.getItem("email") || "",
//         },
//         theme: { color: "#0b74de" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("order error:", err);
//       alert(err.response?.data?.message || "Order creation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!product) {
//     return <div style={{ padding: 24 }}>❌ Product not found</div>;
//   }

//   return (
//     <div
//       style={{
//         padding: 24,
//         maxWidth: 720,
//         margin: "40px auto",
//         background: "#fff",
//         borderRadius: 8,
//       }}
//     >
//       <h2>{product.name}</h2>
//       <p style={{ fontSize: 20, fontWeight: 700 }}>Price: ₹{product.price}</p>
//       <button
//         onClick={handlePay}
//         disabled={loading}
//         style={{
//           marginTop: 12,
//           padding: "10px 14px",
//           background: "#0b74de",
//           color: "#fff",
//           border: "none",
//           borderRadius: 8,
//           cursor: "pointer",
//         }}
//       >
//         {loading ? "Processing..." : `Pay ₹${product.price}`}
//       </button>
//     </div>
//   );
// }







//OR UPDATE


// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api";

// const PRODUCTS = {
 
//  1: { id: 1, name: "AI Robot 1", price: 100 },
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
//   const [showQR, setShowQR] = useState(false);
//   const [transactionId, setTransactionId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const UPI_ID = "9009896441@ibl";
//   const UPI_NAME = "Payment";

//   const handlePayClick = () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("⚠️ Please login first");
//       navigate("/auth");
//       return;
//     }
//     setShowQR(true);
//   };

//   const handleSubmitTransaction = async () => {
//     if (!transactionId.trim()) {
//       alert("❌ Please enter Transaction ID / UTR Number");
//       return;
//     }

//     try {
//       setLoading(true);
//       await API.post("/payment/submit-transaction", {
//         productId: product.id,
//         transactionId: transactionId.trim(),
//         amount: product.price,
//       });

//       alert("✅ Payment submitted! Admin will verify soon.");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Submit error:", err);
//       alert(err.response?.data?.message || "❌ Submission failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!product) {
//     return <div style={{ padding: 24 }}>❌ Product not found</div>;
//   }

//   const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${product.price}&cu=INR&tn=${encodeURIComponent(product.name)}`;

//   return (
//     <div style={{ padding: 24, maxWidth: 720, margin: "40px auto" }}>
//       {!showQR ? (
//         <div style={{ background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
//           <h2 style={{ marginBottom: 16, color: "#333" }}>{product.name}</h2>
//           <p style={{ fontSize: 24, fontWeight: 700, color: "#0b74de", marginBottom: 24 }}>
//             Price: ₹{product.price}
//           </p>
//           <button
//             onClick={handlePayClick}
//             style={{
//               width: "100%",
//               padding: "14px",
//               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//               color: "#fff",
//               border: "none",
//               borderRadius: 8,
//               fontSize: 16,
//               fontWeight: 600,
//               cursor: "pointer",
//               transition: "transform 0.2s",
//             }}
//             onMouseOver={(e) => e.target.style.transform = "scale(1.02)"}
//             onMouseOut={(e) => e.target.style.transform = "scale(1)"}
//           >
//             Pay with UPI
//           </button>
//         </div>
//       ) : (
//         <div style={{ background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", textAlign: "center" }}>
//           <h2 style={{ marginBottom: 8, color: "#333" }}>Scan QR to Pay</h2>
//           <p style={{ fontSize: 28, fontWeight: 700, color: "#0b74de", marginBottom: 24 }}>
//             ₹{product.price}
//           </p>

//           <div style={{ background: "#f7f9fc", padding: 20, borderRadius: 12, marginBottom: 24 }}>
//             <img 
//               src={qrCodeUrl} 
//               alt="UPI QR Code" 
//               style={{ width: 280, height: 280, border: "4px solid #667eea", borderRadius: 12 }}
//             />
//             <p style={{ marginTop: 16, fontSize: 14, color: "#666" }}>
//               Open any UPI app (Google Pay, PhonePe, Paytm)
//             </p>
//             <p style={{ fontSize: 16, fontWeight: 600, color: "#333", marginTop: 8 }}>
//               UPI ID: <span style={{ color: "#0b74de" }}>{UPI_ID}</span>
//             </p>
//           </div>

//           <div style={{ textAlign: "left", marginBottom: 16 }}>
//             <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#333" }}>
//               After Payment, Enter Transaction ID / UTR:
//             </label>
//             <input
//               type="text"
//               placeholder="e.g. 123456789012"
//               value={transactionId}
//               onChange={(e) => setTransactionId(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 border: "2px solid #ddd",
//                 borderRadius: 8,
//                 fontSize: 14,
//                 outline: "none",
//                 transition: "border 0.3s",
//               }}
//               onFocus={(e) => e.target.style.borderColor = "#667eea"}
//               onBlur={(e) => e.target.style.borderColor = "#ddd"}
//             />
//             <p style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
//               💡 Find UTR/Transaction ID in your payment app's transaction history
//             </p>
//           </div>

//           <button
//             onClick={handleSubmitTransaction}
//             disabled={loading}
//             style={{
//               width: "100%",
//               padding: "14px",
//               background: loading ? "#ccc" : "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
//               color: "#fff",
//               border: "none",
//               borderRadius: 8,
//               fontSize: 16,
//               fontWeight: 600,
//               cursor: loading ? "not-allowed" : "pointer",
//               marginBottom: 12,
//             }}
//           >
//             {loading ? "Submitting..." : "Submit Payment"}
//           </button>

//           <button
//             onClick={() => setShowQR(false)}
//             style={{
//               width: "100%",
//               padding: "12px",
//               background: "transparent",
//               color: "#666",
//               border: "2px solid #ddd",
//               borderRadius: 8,
//               fontSize: 14,
//               cursor: "pointer",
//             }}
//           >
//             ← Back to Product
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }















import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

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

  const handlePay = async () => {
    if (!product) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please login first");
      navigate("/auth");
      return;
    }

    try {
      setLoading(true);

      // 1) Create order on backend
      const res = await API.post("/payment/create-order", {
        productId: product.id,
      });

      const order = res.data?.order;
      if (!order || !order.amount) {
        alert("Invalid order response from server");
        return;
      }

      // 2) Razorpay checkout
      const options = {
        key: RZP_KEY,
        amount: order.amount,
        currency: order.currency || "INR",
        name: product.name,
        description: `Purchase ${product.name}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            await API.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              productId: product.id,
            });
            alert("✅ Payment successful!");
            navigate("/success");
          } catch (err) {
            console.error("Payment verification error:", err);
            alert("❌ Payment verification failed");
            navigate("/cancel");
          }
        },
        prefill: {
          name: localStorage.getItem("name") || "",
          email: localStorage.getItem("email") || "",
        },
        theme: { color: "#667eea" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Order creation error:", err);
      alert(err.response?.data?.message || "❌ Order creation failed");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <div style={{ padding: 24 }}>❌ Product not found</div>;
  }

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "40px auto" }}>
      <div style={{ background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ marginBottom: 16, color: "#333" }}>{product.name}</h2>
        <p style={{ fontSize: 24, fontWeight: 700, color: "#0b74de", marginBottom: 24 }}>
          Price: ₹{product.price}
        </p>
        <button
          onClick={handlePay}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => !loading && (e.target.style.transform = "scale(1.02)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          {loading ? "Processing..." : `Pay ₹${product.price}`}
        </button>
      </div>
    </div>
  );
}