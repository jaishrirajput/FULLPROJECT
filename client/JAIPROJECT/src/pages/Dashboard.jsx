// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [purchases, setPurchases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/auth");
//         return;
//       }

//       // Fetch user purchases and payment status
//       const response = await API.get("/payment/my-purchases");
//       setPurchases(response.data.purchases || []);
      
//       // Get user info from localStorage or API
//       setUser({
//         name: localStorage.getItem("name") || "User",
//         email: localStorage.getItem("email") || "",
//       });

//       setLoading(false);
//     } catch (error) {
//       console.error("Dashboard fetch error:", error);
//       if (error.response?.status === 401) {
//         navigate("/auth");
//       }
//       setLoading(false);
//     }
//   };

//   const getStatusBadge = (status) => {
//     const styles = {
//       pending: { bg: "#fef3c7", color: "#92400e", text: "⏳ Pending" },
//       verified: { bg: "#d1fae5", color: "#065f46", text: "✅ Verified" },
//       rejected: { bg: "#fee2e2", color: "#991b1b", text: "❌ Rejected" },
//     };
//     const style = styles[status] || styles.pending;
//     return (
//       <span style={{
//         background: style.bg,
//         color: style.color,
//         padding: "6px 12px",
//         borderRadius: 20,
//         fontSize: 13,
//         fontWeight: 600
//       }}>
//         {style.text}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <div style={{ fontSize: 20, color: "#667eea" }}>Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       padding: "40px 20px"
//     }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
//         {/* Header */}
//         <div style={{
//           background: "#fff",
//           padding: 32,
//           borderRadius: 16,
//           marginBottom: 24,
//           boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//         }}>
//           <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1e293b", marginBottom: 8 }}>
//             👋 Welcome, {user?.name}!
//           </h1>
//           <p style={{ color: "#64748b", fontSize: 16 }}>{user?.email}</p>
//         </div>

//         {/* Stats Cards */}
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//           gap: 24,
//           marginBottom: 32
//         }}>
//           <div style={{
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             padding: 24,
//             borderRadius: 16,
//             color: "#fff",
//             boxShadow: "0 10px 30px rgba(102,126,234,0.3)"
//           }}>
//             <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>Total Purchases</div>
//             <div style={{ fontSize: 36, fontWeight: 800 }}>{purchases.length}</div>
//           </div>

//           <div style={{
//             background: "#fff",
//             padding: 24,
//             borderRadius: 16,
//             boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//           }}>
//             <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Verified Payments</div>
//             <div style={{ fontSize: 36, fontWeight: 800, color: "#059669" }}>
//               {purchases.filter(p => p.status === "verified").length}
//             </div>
//           </div>

//           <div style={{
//             background: "#fff",
//             padding: 24,
//             borderRadius: 16,
//             boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//           }}>
//             <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Pending Verification</div>
//             <div style={{ fontSize: 36, fontWeight: 800, color: "#d97706" }}>
//               {purchases.filter(p => p.status === "pending").length}
//             </div>
//           </div>
//         </div>

//         {/* Purchases Table */}
//         <div style={{
//           background: "#fff",
//           borderRadius: 16,
//           padding: 24,
//           boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//         }}>
//           <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
//             📦 My Purchases
//           </h2>

//           {purchases.length === 0 ? (
//             <div style={{
//               textAlign: "center",
//               padding: "60px 20px",
//               color: "#94a3b8"
//             }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
//               <div style={{ fontSize: 18, fontWeight: 600 }}>No purchases yet</div>
//               <p style={{ marginTop: 8 }}>Start investing in AI Robots to see them here!</p>
//               <button
//                 onClick={() => navigate("/")}
//                 style={{
//                   marginTop: 20,
//                   padding: "12px 24px",
//                   background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 8,
//                   cursor: "pointer",
//                   fontWeight: 600
//                 }}
//               >
//                 Browse Products
//               </button>
//             </div>
//           ) : (
//             <div style={{ overflowX: "auto" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
//                     <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Product</th>
//                     <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Amount</th>
//                     <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Transaction ID</th>
//                     <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Date</th>
//                     <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {purchases.map((purchase, idx) => (
//                     <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                       <td style={{ padding: "16px", fontWeight: 600, color: "#1e293b" }}>
//                         {purchase.productName}
//                       </td>
//                       <td style={{ padding: "16px", fontWeight: 700, color: "#667eea" }}>
//                         ₹{purchase.amount}
//                       </td>
//                       <td style={{ padding: "16px", fontSize: 13, color: "#64748b", fontFamily: "monospace" }}>
//                         {purchase.transactionId}
//                       </td>
//                       <td style={{ padding: "16px", fontSize: 14, color: "#64748b" }}>
//                         {new Date(purchase.submittedAt).toLocaleDateString()}
//                       </td>
//                       <td style={{ padding: "16px" }}>
//                         {getStatusBadge(purchase.status)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



//withdrall

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [purchases, setPurchases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
//   const [withdrawalAmount, setWithdrawalAmount] = useState("");
//   const [submittingWithdrawal, setSubmittingWithdrawal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/auth");
//         return;
//       }

//       const response = await API.get("/payment/my-purchases");
//       setPurchases(response.data.purchases || []);
      
//       setUser({
//         name: localStorage.getItem("name") || "User",
//         email: localStorage.getItem("email") || "",
//       });

//       setLoading(false);
//     } catch (error) {
//       console.error("Dashboard fetch error:", error);
//       if (error.response?.status === 401) {
//         navigate("/auth");
//       }
//       setLoading(false);
//     }
//   };

//   const handleWithdrawal = async (e) => {
//     e.preventDefault();

//     if (!withdrawalAmount || withdrawalAmount <= 0) {
//       alert("कृपया सही amount enter करें");
//       return;
//     }

//     try {
//       setSubmittingWithdrawal(true);
//       await API.post("/payment/withdrawal-request", {
//         amount: Number(withdrawalAmount)
//       });

//       alert("✅ Withdrawal request submit हो गया! Admin जल्द process करेगा।");
//       setWithdrawalAmount("");
//       setShowWithdrawalModal(false);
//       fetchDashboardData();
//     } catch (error) {
//       alert(error.response?.data?.message || "❌ Withdrawal failed");
//     } finally {
//       setSubmittingWithdrawal(false);
//     }
//   };

//   const getStatusBadge = (status) => {
//     const styles = {
//       pending: { bg: "#fef3c7", color: "#92400e", text: "⏳ Pending" },
//       verified: { bg: "#d1fae5", color: "#065f46", text: "✅ Verified" },
//       rejected: { bg: "#fee2e2", color: "#991b1b", text: "❌ Rejected" },
//     };
//     const style = styles[status] || styles.pending;
//     return (
//       <span style={{
//         background: style.bg,
//         color: style.color,
//         padding: "6px 12px",
//         borderRadius: 20,
//         fontSize: 13,
//         fontWeight: 600
//       }}>
//         {style.text}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <div style={{ fontSize: 20, color: "#667eea" }}>Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       padding: "40px 20px"
//     }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
//         {/* Header */}
//         <div style={{
//           background: "#fff",
//           padding: 32,
//           borderRadius: 16,
//           marginBottom: 24,
//           boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//         }}>
//           <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1e293b", marginBottom: 8 }}>
//             👋 Welcome, {user?.name}!
//           </h1>
//           <p style={{ color: "#64748b", fontSize: 16 }}>{user?.email}</p>
//         </div>

//         {/* Stats Cards */}
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//           gap: 24,
//           marginBottom: 32
//         }}>
//           <div style={{
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             padding: 24,
//             borderRadius: 16,
//             color: "#fff",
//             boxShadow: "0 10px 30px rgba(102,126,234,0.3)"
//           }}>
//             <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>Total Purchases</div>
//             <div style={{ fontSize: 36, fontWeight: 800 }}>{purchases.length}</div>
//           </div>

//           <div style={{
//             background: "#fff",
//             padding: 24,
//             borderRadius: 16,
//             boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//           }}>
//             <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Verified Payments</div>
//             <div style={{ fontSize: 36, fontWeight: 800, color: "#059669" }}>
//               {purchases.filter(p => p.status === "verified").length}
//             </div>
//           </div>

//           <div style={{
//             background: "#fff",
//             padding: 24,
//             borderRadius: 16,
//             boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//           }}>
//             <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Pending Verification</div>
//             <div style={{ fontSize: 36, fontWeight: 800, color: "#d97706" }}>
//               {purchases.filter(p => p.status === "pending").length}
//             </div>
//           </div>
//         </div>

//         {/* Withdrawal Button */}
//         <div style={{ marginBottom: 32 }}>
//           <button
//             onClick={() => setShowWithdrawalModal(true)}
//             style={{
//               padding: "16px 32px",
//               background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
//               color: "#fff",
//               border: "none",
//               borderRadius: 12,
//               fontSize: 16,
//               fontWeight: 700,
//               cursor: "pointer",
//               boxShadow: "0 10px 30px rgba(17, 153, 142, 0.3)",
//               transition: "transform 0.2s"
//             }}
//             onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
//             onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
//           >
//             💰 Withdrawal Request करें
//           </button>
//         </div>

//         {/* Withdrawal Modal */}
//         {showWithdrawalModal && (
//           <div style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: "rgba(0,0,0,0.5)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 9999
//           }}>
//             <div style={{
//               background: "#fff",
//               padding: 32,
//               borderRadius: 16,
//               maxWidth: 500,
//               width: "90%",
//               boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
//             }}>
//               <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
//                 💰 Withdrawal Request
//               </h2>

//               <form onSubmit={handleWithdrawal}>
//                 <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#1e293b" }}>
//                   Amount (₹):
//                 </label>
//                 <input
//                   type="number"
//                   value={withdrawalAmount}
//                   onChange={(e) => setWithdrawalAmount(e.target.value)}
//                   placeholder="Enter amount"
//                   min="1"
//                   style={{
//                     width: "100%",
//                     padding: "14px",
//                     marginBottom: 24,
//                     border: "2px solid #e2e8f0",
//                     borderRadius: 8,
//                     fontSize: 16,
//                     boxSizing: "border-box"
//                   }}
//                 />

//                 <button
//                   type="submit"
//                   disabled={submittingWithdrawal}
//                   style={{
//                     width: "100%",
//                     padding: "14px",
//                     background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: 8,
//                     fontSize: 16,
//                     fontWeight: 600,
//                     cursor: "pointer",
//                     marginBottom: 12,
//                     opacity: submittingWithdrawal ? 0.7 : 1
//                   }}
//                 >
//                   {submittingWithdrawal ? "Processing..." : "Submit Withdrawal"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => setShowWithdrawalModal(false)}
//                   style={{
//                     width: "100%",
//                     padding: "12px",
//                     background: "transparent",
//                     color: "#64748b",
//                     border: "2px solid #e2e8f0",
//                     borderRadius: 8,
//                     fontSize: 14,
//                     cursor: "pointer"
//                   }}
//                 >
//                   Cancel
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Purchases Table */}
//         <div style={{
//           background: "#fff",
//           borderRadius: 16,
//           padding: 24,
//           boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//         }}>
//           <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
//             📦 My Purchases
//           </h2>

//           {purchases.length === 0 ? (
//             <div style={{
//               textAlign: "center",
//               padding: "60px 20px",
//               color: "#94a3b8"
//             }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
//               <div style={{ fontSize: 18, fontWeight: 600 }}>No purchases yet</div>
//               <p style={{ marginTop: 8 }}>Start investing in AI Robots to see them here!</p>
//               <button
//                 onClick={() => navigate("/")}
//                 style={{
//                   marginTop: 20,
//                   padding: "12px 24px",
//                   background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 8,
//                   cursor: "pointer",
//                   fontWeight: 600
//                 }}
//               >
//                 Browse Products
//               </button>
//             </div>
//           ) : (
//             <div style={{ overflowX: "auto" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
//                     <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Product</th>
//                     <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Amount</th>
//                     <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Transaction ID</th>
//                     <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Date</th>
//                     <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {purchases.map((purchase, idx) => (
//                     <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                       <td style={{ padding: "16px", fontWeight: 600, color: "#1e293b" }}>
//                         {purchase.productName}
//                       </td>
//                       <td style={{ padding: "16px", fontWeight: 700, color: "#667eea" }}>
//                         ₹{purchase.amount}
//                       </td>
//                       <td style={{ padding: "16px", fontSize: 13, color: "#64748b", fontFamily: "monospace" }}>
//                         {purchase.transactionId}
//                       </td>
//                       <td style={{ padding: "16px", fontSize: 14, color: "#64748b" }}>
//                         {new Date(purchase.submittedAt).toLocaleDateString()}
//                       </td>
//                       <td style={{ padding: "16px" }}>
//                         {getStatusBadge(purchase.status)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

















import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [submittingWithdrawal, setSubmittingWithdrawal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      const response = await API.get("/payment/wallet");
      setPurchases(response.data.purchases || []);
      setWalletBalance(response.data.walletBalance || 0);

      setUser({
        name: localStorage.getItem("name") || "User",
        email: localStorage.getItem("email") || "",
      });

      setLoading(false);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      if (error.response?.status === 401) {
        navigate("/auth");
      }
      setLoading(false);
    }
  };

  const handleWithdrawal = async (e) => {
    e.preventDefault();

    if (!withdrawalAmount || withdrawalAmount <= 0) {
      alert("कृपया सही amount enter करें");
      return;
    }

    try {
      setSubmittingWithdrawal(true);
      await API.post("/payment/withdrawal-request", {
        amount: Number(withdrawalAmount)
      });

      alert("✅ Withdrawal request submit हो गया! Admin जल्द process करेगा।");
      setWithdrawalAmount("");
      setShowWithdrawalModal(false);
      fetchDashboardData();
    } catch (error) {
      alert(error.response?.data?.message || "❌ Withdrawal failed");
    } finally {
      setSubmittingWithdrawal(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      created: { bg: "#fef3c7", color: "#92400e", text: "⏳ Created" },
      paid: { bg: "#d1fae5", color: "#065f46", text: "✅ Paid" },
      failed: { bg: "#fee2e2", color: "#991b1b", text: "❌ Failed" },
    };
    const style = styles[status] || styles.created;
    return (
      <span style={{
        background: style.bg,
        color: style.color,
        padding: "6px 12px",
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 600
      }}>
        {style.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 20, color: "#667eea" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{
          background: "#fff",
          padding: 32,
          borderRadius: 16,
          marginBottom: 24,
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1e293b", marginBottom: 8 }}>
            👋 Welcome, {user?.name}!
          </h1>
          <p style={{ color: "#64748b", fontSize: 16 }}>{user?.email}</p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          marginBottom: 32
        }}>
          <div style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: 24,
            borderRadius: 16,
            color: "#fff",
            boxShadow: "0 10px 30px rgba(102,126,234,0.3)"
          }}>
            <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>Wallet Balance</div>
            <div style={{ fontSize: 36, fontWeight: 800 }}>₹{walletBalance}</div>
          </div>

          <div style={{
            background: "#fff",
            padding: 24,
            borderRadius: 16,
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
          }}>
            <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Total Purchases</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#1e293b" }}>
              {purchases.length}
            </div>
          </div>

          <div style={{
            background: "#fff",
            padding: 24,
            borderRadius: 16,
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
          }}>
            <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Active Robots</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#059669" }}>
              {purchases.filter(p => p.active).length}
            </div>
          </div>
        </div>

        {/* Withdrawal Button */}
        <div style={{ marginBottom: 32 }}>
          <button
            onClick={() => setShowWithdrawalModal(true)}
            style={{
              padding: "16px 32px",
              background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(17, 153, 142, 0.3)",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            💰 Withdrawal Request करें
          </button>
        </div>

        {/* Withdrawal Modal */}
        {showWithdrawalModal && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
          }}>
            <div style={{
              background: "#fff",
              padding: 32,
              borderRadius: 16,
              maxWidth: 500,
              width: "90%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
            }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
                💰 Withdrawal Request
              </h2>

              <form onSubmit={handleWithdrawal}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#1e293b" }}>
                  Amount (₹):
                </label>
                <input
                  type="number"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                  style={{
                    width: "100%",
                    padding: "14px",
                    marginBottom: 24,
                    border: "2px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 16,
                    boxSizing: "border-box"
                  }}
                />

                <button
                  type="submit"
                  disabled={submittingWithdrawal}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: "pointer",
                    marginBottom: 12,
                    opacity: submittingWithdrawal ? 0.7 : 1
                  }}
                >
                  {submittingWithdrawal ? "Processing..." : "Submit Withdrawal"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowWithdrawalModal(false)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "transparent",
                    color: "#64748b",
                    border: "2px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 14,
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Purchases Table */}
        <div style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
            📦 My Purchases
          </h2>

          {purchases.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#94a3b8"
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>No purchases yet</div>
              <p style={{ marginTop: 8 }}>Start investing in AI Robots to see them here!</p>
              <button
                onClick={() => navigate("/")}
                style={{
                  marginTop: 20,
                  padding: "12px 24px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Product</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Amount</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Payment ID</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Purchase Date</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Expiry</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((purchase, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px", fontWeight: 600, color: "#1e293b" }}>
                        {purchase.productName}
                      </td>
                      <td style={{ padding: "16px", fontWeight: 700, color: "#667eea" }}>
                        ₹{purchase.amount}
                      </td>
                      <td style={{ padding: "16px", fontSize: 13, color: "#64748b", fontFamily: "monospace" }}>
                        {purchase.razorpayPaymentId}
                      </td>
                      <td style={{ padding: "16px", fontSize: 14, color: "#64748b" }}>
                        {purchase.startDate ? new Date(purchase.startDate).toLocaleDateString() : "-"}
                      </td>
                      <td style={{ padding: "16px", fontSize: 14, color: "#64748b" }}>
                        {purchase.expiryDate ? new Date(purchase.expiryDate).toLocaleDateString() : "-"}
                      </td>
                      <td style={{ padding: "16px" }}>
                        {getStatusBadge(purchase.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}