// import { useState } from "react";
// import { register, login } from "../api/auth";
// import { useNavigate } from "react-router-dom";

// export default function AuthRegisterPage() {
//   const [mode, setMode] = useState("register");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [invite, setInvite] = useState("");
//   const [message, setMessage] = useState(null);
//   const [errors, setErrors] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   async function onSubmit(e) {
//     e.preventDefault();
//     setMessage(null);
//     setErrors([]);
//     setLoading(true);

//     try {
//       if (mode === "register") {
//         const res = await register({ name, email, phone, password, inviteCode: invite });
//         setMessage("Account created. Please login.");
//         setMode("login");
//       } else {
//         const res = await login({ email, password });
//         localStorage.setItem("token", res.token);
//         setMessage("Logged in successfully!");
//         navigate("/profile");
//       }
//     } catch (err) {
//       setErrors([err.response?.data?.message || "Server error"]);
//     }

//     setLoading(false);
//   }

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto" }}>
//       <h2>{mode === "register" ? "Register" : "Login"}</h2>
//       {message && <p style={{ color: "green" }}>{message}</p>}
//       {errors.map((err, idx) => <p key={idx} style={{ color: "red" }}>{err}</p>)}
//       <form onSubmit={onSubmit}>
//         {mode === "register" && (
//           <>
//             <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
//             <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
//             <input type="text" placeholder="Invite Code" value={invite} onChange={e => setInvite(e.target.value)} />
//           </>
//         )}
//         <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
//         <button type="submit" disabled={loading}>{loading ? "Processing..." : mode === "register" ? "Register" : "Login"}</button>
//       </form>
//       <p style={{ marginTop: "10px" }}>
//         {mode === "register" ? "Already have an account?" : "Don't have an account?"}
//         <span style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }} onClick={() => setMode(mode === "register" ? "login" : "register")}>
//           {mode === "register" ? "Login" : "Register"}
//         </span>
//       </p>
//     </div>
//   );
// }



// import React, { useState } from "react";

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div style={styles.container}>
//       <h1>{isLogin ? "Login" : "Register"}</h1>
//       <form style={styles.form}>
//         <input type="email" placeholder="Email" style={styles.input} />
//         <input type="password" placeholder="Password" style={styles.input} />
//         {!isLogin && <input type="text" placeholder="Name" style={styles.input} />}
//         <button style={styles.btn}>{isLogin ? "Login" : "Register"}</button>
//       </form>
//       <p onClick={() => setIsLogin(!isLogin)} style={styles.switch}>
//         {isLogin ? "New user? Register here" : "Already have an account? Login"}
//       </p>
//     </div>
//   );
// }

// const styles = {
//   container: { textAlign: "center", marginTop: "50px" },
//   form: { display: "flex", flexDirection: "column", gap: "10px", width: "300px", margin: "auto" },
//   input: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
//   btn: { padding: "10px", border: "none", borderRadius: "5px", background: "#007bff", color: "#fff", cursor: "pointer" },
//   switch: { marginTop: "10px", color: "blue", cursor: "pointer" },
// };





// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API_BASE = import.meta.env.VITE_API_BASE || "https://fullproject-9.onrender.com" ;

// export default function AuthPage(){
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading,setLoading] = useState(false);
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (isLogin) {
//         const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("name", res.data.user?.name || "");
//         localStorage.setItem("email", res.data.user?.email || "");
//         navigate("/");
//       } else {
//         const res = await axios.post(`${API_BASE}/api/auth/register`, { name, email, phone, password });
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("name", res.data.user?.name || "");
//         localStorage.setItem("email", res.data.user?.email || "");
//         navigate("/");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     } finally { setLoading(false); }
//   };

//   return (
//     <div style={{maxWidth:460, margin:"40px auto", padding:18, background:"#fff", borderRadius:8, boxShadow:"0 6px 20px rgba(2,6,23,0.06)"}}>
//       <h2 style={{textAlign:"center"}}>{isLogin ? "Login" : "Create account"}</h2>
//       <form onSubmit={submit} style={{display:"flex", flexDirection:"column", gap:10, marginTop:12}}>
//         {!isLogin && <>
//           <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required style={input}/>
//           <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} required style={input}/>
//         </>}
//         <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={input}/>
//         <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={input}/>
//         <button type="submit" disabled={loading} style={btn}>{loading ? "Please wait..." : (isLogin ? "Login" : "Register")}</button>
//       </form>
//       <p style={{textAlign:"center", marginTop:12}}>
//         {isLogin ? "New here?" : "Already registered?"}
//         <button onClick={()=>setIsLogin(!isLogin)} style={{marginLeft:8, background:"none", border:"none", color:"var(--primary)", cursor:"pointer"}}>{isLogin ? "Create account" : "Login"}</button>
//       </p>
//     </div>
//   );
// }

// const input = { padding:10, borderRadius:6, border:"1px solid #e5e7eb", width:"100%" };
// const btn = { padding:10, borderRadius:6, border:"none", background:"var(--primary)", color:"#fff", fontWeight:600 };






//after deploy

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API_BASE = import.meta.env.VITE_API_BASE;

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (isLogin) {
//         const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("name", res.data.user?.name || "");
//         localStorage.setItem("email", res.data.user?.email || "");
//         navigate("/");
//       } else {
//         const res = await axios.post(`${API_BASE}/api/auth/register`, { name, email, phone, password });
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("name", res.data.user?.name || "");
//         localStorage.setItem("email", res.data.user?.email || "");
//         navigate("/");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 460, margin: "40px auto", padding: 18, background: "#fff", borderRadius: 8 }}>
//       <h2 style={{ textAlign: "center" }}>{isLogin ? "Login" : "Create account"}</h2>
//       <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
//         {!isLogin && (
//           <>
//             <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required style={input} />
//             <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required style={input} />
//           </>
//         )}
//         <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={input} />
//         <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={input} />
//         <button type="submit" disabled={loading} style={btn}>{loading ? "Please wait..." : (isLogin ? "Login" : "Register")}</button>
//       </form>
//       <p style={{ textAlign: "center", marginTop: 12 }}>
//         {isLogin ? "New here?" : "Already registered?"}
//         <button onClick={() => setIsLogin(!isLogin)} style={{ marginLeft: 8, background: "none", border: "none", color: "var(--primary)", cursor: "pointer" }}>
//           {isLogin ? "Create account" : "Login"}
//         </button>
//       </p>
//     </div>
//   );
// }

// const input = { padding: 10, borderRadius: 6, border: "1px solid #e5e7eb", width: "100%" };
// const btn = { padding: 10, borderRadius: 6, border: "none", background: "var(--primary)", color: "#fff", fontWeight: 600 };









// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = "https://fullproject-9.onrender.com";

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (isLogin) {
//         const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("name", res.data.user?.name || "");
//         localStorage.setItem("email", res.data.user?.email || "");
//         navigate("/");
//       } else {
//         const res = await axios.post(`${API_BASE}/api/auth/register`, { name, email, phone, password });
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("name", res.data.user?.name || "");
//         localStorage.setItem("email", res.data.user?.email || "");
//         navigate("/");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     } finally { setLoading(false); }
//   };

//   return (
//     <div style={{ maxWidth: 460, margin: "40px auto", padding: 18, background: "#fff", borderRadius: 8, boxShadow: "0 6px 20px rgba(2,6,23,0.06)" }}>
//       <h2 style={{ textAlign: "center" }}>{isLogin ? "Login" : "Create account"}</h2>
//       <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
//         {!isLogin && <>
//           <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required style={input} />
//           <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required style={input} />
//         </>}
//         <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={input} />
//         <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required style={input} />
//         <button type="submit" disabled={loading} style={btn}>{loading ? "Please wait..." : (isLogin ? "Login" : "Register")}</button>
//       </form>
//       <p style={{ textAlign: "center", marginTop: 12 }}>
//         {isLogin ? "New here?" : "Already registered?"}
//         <button onClick={() => setIsLogin(!isLogin)} style={{ marginLeft: 8, background: "none", border: "none", color: "var(--primary)", cursor: "pointer" }}>{isLogin ? "Create account" : "Login"}</button>
//       </p>
//     </div>
//   );
// }

// const input = { padding: 10, borderRadius: 6, border: "1px solid #e5e7eb", width: "100%" };
// const btn = { padding: 10, borderRadius: 6, border: "none", background: "var(--primary)", color: "#fff", fontWeight: 600 };










// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE || "https://fullproject-9.onrender.com";

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       let res;
//       if (isLogin) {
//         res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
//       } else {
//         res = await axios.post(`${API_BASE}/api/auth/register`, { name, phone, email, password });
//       }

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("name", res.data.user?.name || "");
//       localStorage.setItem("email", res.data.user?.email || "");
//       navigate("/");
//     } catch (err) {
//       alert(err.response?.data?.message || "Error occurred");
//       console.error(err.response || err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 460, margin: "40px auto", padding: 18, background: "#fff", borderRadius: 8, boxShadow: "0 6px 20px rgba(2,6,23,0.06)" }}>
//       <h2 style={{ textAlign: "center" }}>{isLogin ? "Login" : "Create Account"}</h2>
//       <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
//         {!isLogin && (
//           <>
//             <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required style={input} />
//             <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required style={input} />
//           </>
//         )}
//         <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={input} />
//         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={input} />
//         <button type="submit" disabled={loading} style={btn}>
//           {loading ? "Please wait..." : (isLogin ? "Login" : "Register")}
//         </button>
//       </form>
//       <p style={{ textAlign: "center", marginTop: 12 }}>
//         {isLogin ? "New here?" : "Already registered?"}
//         <button onClick={() => setIsLogin(!isLogin)} style={{ marginLeft: 8, background: "none", border: "none", color: "var(--primary)", cursor: "pointer" }}>
//           {isLogin ? "Create Account" : "Login"}
//         </button>
//       </p>
//     </div>
//   );
// }

// const input = { padding: 10, borderRadius: 6, border: "1px solid #e5e7eb", width: "100%" };
// const btn = { padding: 10, borderRadius: 6, border: "none", background: "var(--primary)", color: "#fff", fontWeight: 600 };


















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = "https://fullproject-9.onrender.com";

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (isLogin) {
//         const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("name", res.data.user?.name || "");
//         localStorage.setItem("email", res.data.user?.email || "");
//         navigate("/");
//       } else {
//         const res = await axios.post(`${API_BASE}/api/auth/register`, { name, email, phone, password });
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("name", res.data.user?.name || "");
//         localStorage.setItem("email", res.data.user?.email || "");
//         navigate("/");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     } finally { setLoading(false); }
//   };

//   return (
//     <div style={{maxWidth:460, margin:"40px auto", padding:18, background:"#fff", borderRadius:8}}>
//       <h2 style={{textAlign:"center"}}>{isLogin ? "Login" : "Create account"}</h2>
//       <form onSubmit={submit} style={{display:"flex", flexDirection:"column", gap:10, marginTop:12}}>
//         {!isLogin && <>
//           <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required style={input}/>
//           <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} required style={input}/>
//         </>}
//         <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={input}/>
//         <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={input}/>
//         <button type="submit" disabled={loading} style={btn}>{loading ? "Please wait..." : (isLogin ? "Login" : "Register")}</button>
//       </form>
//       <p style={{textAlign:"center", marginTop:12}}>
//         {isLogin ? "New here?" : "Already registered?"}
//         <button onClick={()=>setIsLogin(!isLogin)} style={{marginLeft:8, background:"none", border:"none", color:"var(--primary)", cursor:"pointer"}}>
//           {isLogin ? "Create account" : "Login"}
//         </button>
//       </p>
//     </div>
//   );
// }
// const input = { padding:10, borderRadius:6, border:"1px solid #e5e7eb", width:"100%" };
// const btn = { padding:10, borderRadius:6, border:"none", background:"var(--primary)", color:"#fff", fontWeight:600 };



//withdrall






// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showOTP, setShowOTP] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     otp: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const navigate = useNavigate();

//   // Handle form input
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const response = await API.post("/auth/login", {
//         email: formData.email,
//         password: formData.password
//       });

//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("name", response.data.user.name);
//       localStorage.setItem("email", response.data.user.email);

//       alert("✅ Login successful!");
//       navigate("/");
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Send OTP
//   const handleSendOTP = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.password) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       await API.post("/auth/send-otp", {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password
//       });

//       alert("✅ OTP sent to your email!");
//       setShowOTP(true);
//       startTimer();
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Verify OTP & Register
//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();

//     if (!formData.otp || formData.otp.length !== 6) {
//       alert("Please enter 6-digit OTP");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await API.post("/auth/verify-otp", {
//         email: formData.email,
//         otp: formData.otp
//       });

//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("name", response.data.user.name);
//       localStorage.setItem("email", response.data.user.email);

//       alert("✅ Registration successful!");
//       navigate("/");
//     } catch (error) {
//       alert(error.response?.data?.message || "OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Resend OTP
//   const handleResendOTP = async () => {
//     try {
//       setLoading(true);
//       await API.post("/auth/resend-otp", { email: formData.email });
//       alert("✅ New OTP sent!");
//       startTimer();
//     } catch (error) {
//       alert("Failed to resend OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Timer for resend button
//   const startTimer = () => {
//     setTimer(60);
//     const interval = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: 20
//     }}>
//       <div style={{
//         background: "#fff",
//         padding: 40,
//         borderRadius: 16,
//         boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
//         maxWidth: 450,
//         width: "100%"
//       }}>
//         <h1 style={{ textAlign: "center", marginBottom: 8, color: "#1e293b" }}>
//           🤖 AI Robots
//         </h1>
//         <p style={{ textAlign: "center", color: "#64748b", marginBottom: 32 }}>
//           {isLogin ? "Welcome back!" : "Create your account"}
//         </p>

//         {/* Login Form */}
//         {isLogin && (
//           <form onSubmit={handleLogin}>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               style={{
//                 width: "100%",
//                 padding: "14px",
//                 marginBottom: 16,
//                 border: "2px solid #e2e8f0",
//                 borderRadius: 8,
//                 fontSize: 16
//               }}
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               style={{
//                 width: "100%",
//                 padding: "14px",
//                 marginBottom: 24,
//                 border: "2px solid #e2e8f0",
//                 borderRadius: 8,
//                 fontSize: 16
//               }}
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               style={{
//                 width: "100%",
//                 padding: "14px",
//                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: 8,
//                 fontSize: 16,
//                 fontWeight: 600,
//                 cursor: "pointer"
//               }}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         )}

//         {/* Register Form - Step 1: Send OTP */}
//         {!isLogin && !showOTP && (
//           <form onSubmit={handleSendOTP}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               style={{
//                 width: "100%",
//                 padding: "14px",
//                 marginBottom: 16,
//                 border: "2px solid #e2e8f0",
//                 borderRadius: 8,
//                 fontSize: 16
//               }}
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               style={{
//                 width: "100%",
//                 padding: "14px",
//                 marginBottom: 16,
//                 border: "2px solid #e2e8f0",
//                 borderRadius: 8,
//                 fontSize: 16
//               }}
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number (Optional)"
//               value={formData.phone}
//               onChange={handleChange}
//               style={{
//                 width: "100%",
//                 padding: "14px",
//                 marginBottom: 16,
//                 border: "2px solid #e2e8f0",
//                 borderRadius: 8,
//                 fontSize: 16
//               }}
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               minLength={6}
//               style={{
//                 width: "100%",
//                 padding: "14px",
//                 marginBottom: 24,
//                 border: "2px solid #e2e8f0",
//                 borderRadius: 8,
//                 fontSize: 16
//               }}
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               style={{
//                 width: "100%",
//                 padding: "14px",
//                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: 8,
//                 fontSize: 16,
//                 fontWeight: 600,
//                 cursor: "pointer"
//               }}
//             >
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </button>
//           </form>
//         )}

//         {/* Register Form - Step 2: Verify OTP */}
//         {!isLogin && showOTP && (
//           <div>
//             <p style={{ textAlign: "center", color: "#64748b", marginBottom: 24 }}>
//               Enter the 6-digit OTP sent to<br />
//               <strong>{formData.email}</strong>
//             </p>
//             <form onSubmit={handleVerifyOTP}>
//               <input
//                 type="text"
//                 name="otp"
//                 placeholder="Enter 6-digit OTP"
//                 value={formData.otp}
//                 onChange={handleChange}
//                 required
//                 maxLength={6}
//                 style={{
//                   width: "100%",
//                   padding: "14px",
//                   marginBottom: 16,
//                   border: "2px solid #e2e8f0",
//                   borderRadius: 8,
//                   fontSize: 20,
//                   textAlign: "center",
//                   letterSpacing: "8px",
//                   fontWeight: 700
//                 }}
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 style={{
//                   width: "100%",
//                   padding: "14px",
//                   background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 8,
//                   fontSize: 16,
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   marginBottom: 12
//                 }}
//               >
//                 {loading ? "Verifying..." : "Verify & Register"}
//               </button>
//             </form>

//             {/* Resend OTP */}
//             <button
//               onClick={handleResendOTP}
//               disabled={timer > 0 || loading}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 background: "transparent",
//                 color: timer > 0 ? "#94a3b8" : "#667eea",
//                 border: "2px solid #e2e8f0",
//                 borderRadius: 8,
//                 fontSize: 14,
//                 fontWeight: 600,
//                 cursor: timer > 0 ? "not-allowed" : "pointer"
//               }}
//             >
//               {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
//             </button>

//             <button
//               onClick={() => setShowOTP(false)}
//               style={{
//                 width: "100%",
//                 marginTop: 12,
//                 padding: "12px",
//                 background: "transparent",
//                 color: "#64748b",
//                 border: "none",
//                 fontSize: 14,
//                 cursor: "pointer"
//               }}
//             >
//               ← Change Email
//             </button>
//           </div>
//         )}

//         {/* Toggle Login/Register */}
//         <p style={{ textAlign: "center", marginTop: 24, color: "#64748b" }}>
//           {isLogin ? "Don't have an account? " : "Already have an account? "}
//           <button
//             onClick={() => {
//               setIsLogin(!isLogin);
//               setShowOTP(false);
//               setFormData({ name: "", email: "", phone: "", password: "", otp: "" });
//             }}
//             style={{
//               background: "none",
//               border: "none",
//               color: "#667eea",
//               fontWeight: 600,
//               cursor: "pointer",
//               fontSize: 16
//             }}
//           >
//             {isLogin ? "Register" : "Login"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    bankAccountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    bankName: "",
    otp: ""
  });
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user.name);
      localStorage.setItem("email", response.data.user.email);

      alert("✅ Login successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SEND OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill required fields (Name, Email, Password)");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await API.post("/auth/send-otp", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        bankAccountNumber: formData.bankAccountNumber,
        ifscCode: formData.ifscCode,
        accountHolderName: formData.accountHolderName,
        bankName: formData.bankName
      });

      alert("✅ OTP sent to your email!");
      setShowOTP(true);
      startTimer();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!formData.otp || formData.otp.length !== 6) {
      alert("Please enter 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await API.post("/auth/verify-otp", {
        email: formData.email,
        otp: formData.otp
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user.name);
      localStorage.setItem("email", response.data.user.email);

      alert("✅ Registration successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ RESEND OTP
  const handleResendOTP = async () => {
    try {
      setLoading(true);
      await API.post("/auth/resend-otp", { email: formData.email });
      alert("✅ New OTP sent!");
      startTimer();
    } catch (error) {
      alert("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const startTimer = () => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    }}>
      <div style={{
        background: "#fff",
        padding: 40,
        borderRadius: 16,
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        maxWidth: 500,
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto"
      }}>
        
        {/* HEADER */}
        <h1 style={{ textAlign: "center", marginBottom: 8, color: "#1e293b" }}>
          🤖 AI Robots
        </h1>
        <p style={{ textAlign: "center", color: "#64748b", marginBottom: 32 }}>
          {isLogin ? "Welcome back!" : "Create your account"}
        </p>

        {/* ========== LOGIN FORM ========== */}
        {isLogin && (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "14px",
                marginBottom: 16,
                border: "2px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 16,
                boxSizing: "border-box"
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
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
                cursor: "pointer",
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {/* ========== REGISTRATION FORM - STEP 1 ========== */}
        {!isLogin && !showOTP && (
          <form onSubmit={handleSendOTP}>
            
            {/* Basic Info */}
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "14px",
                marginBottom: 12,
                border: "2px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 16,
                boxSizing: "border-box"
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "14px",
                marginBottom: 12,
                border: "2px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 16,
                boxSizing: "border-box"
              }}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "14px",
                marginBottom: 12,
                border: "2px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 16,
                boxSizing: "border-box"
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password * (min 6 chars)"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              style={{
                width: "100%",
                padding: "14px",
                marginBottom: 16,
                border: "2px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 16,
                boxSizing: "border-box"
              }}
            />
            
            {/* Bank Details Section */}
            <div style={{
              background: "#f1f5f9",
              padding: 16,
              borderRadius: 8,
              marginBottom: 16,
              border: "2px solid #e2e8f0"
            }}>
              <h4 style={{ fontSize: 14, color: "#1e293b", marginBottom: 12, marginTop: 0 }}>
                🏦 Bank Details (For Withdrawals)
              </h4>
              
              <input
                type="text"
                name="accountHolderName"
                placeholder="Account Holder Name"
                value={formData.accountHolderName}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: 10,
                  border: "2px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 14,
                  boxSizing: "border-box"
                }}
              />
              
              <input
                type="text"
                name="bankAccountNumber"
                placeholder="Bank Account Number"
                value={formData.bankAccountNumber}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: 10,
                  border: "2px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 14,
                  boxSizing: "border-box"
                }}
              />
              
              <input
                type="text"
                name="ifscCode"
                placeholder="IFSC Code (e.g., SBIN0001234)"
                value={formData.ifscCode}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: 10,
                  border: "2px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 14,
                  boxSizing: "border-box"
                }}
              />
              
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name (e.g., HDFC Bank)"
                value={formData.bankName}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 14,
                  boxSizing: "border-box"
                }}
              />
            </div>

            <button
              type="submit"
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
                cursor: "pointer",
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* ========== REGISTRATION FORM - STEP 2 (OTP) ========== */}
        {!isLogin && showOTP && (
          <div>
            <p style={{ textAlign: "center", color: "#64748b", marginBottom: 24, fontSize: 14 }}>
              Enter the 6-digit OTP sent to<br />
              <strong style={{ color: "#1e293b" }}>{formData.email}</strong>
            </p>
            
            <form onSubmit={handleVerifyOTP}>
              <input
                type="text"
                name="otp"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={handleChange}
                required
                maxLength={6}
                style={{
                  width: "100%",
                  padding: "14px",
                  marginBottom: 16,
                  border: "2px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 20,
                  textAlign: "center",
                  letterSpacing: "8px",
                  fontWeight: 700,
                  boxSizing: "border-box"
                }}
              />
              
              <button
                type="submit"
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
                  cursor: "pointer",
                  marginBottom: 12,
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? "Verifying..." : "Verify & Register"}
              </button>
            </form>

            <button
              onClick={handleResendOTP}
              disabled={timer > 0 || loading}
              style={{
                width: "100%",
                padding: "12px",
                background: "transparent",
                color: timer > 0 ? "#94a3b8" : "#667eea",
                border: "2px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 14,
                cursor: timer > 0 ? "not-allowed" : "pointer",
                fontWeight: 600,
                marginBottom: 12
              }}
            >
              {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>

            <button
              type="button"
              onClick={() => setShowOTP(false)}
              style={{
                width: "100%",
                padding: "12px",
                background: "transparent",
                color: "#64748b",
                border: "none",
                fontSize: 14,
                cursor: "pointer"
              }}
            >
              ← Change Email
            </button>
          </div>
        )}

        {/* ========== TOGGLE LOGIN/REGISTER ========== */}
        <p style={{ textAlign: "center", marginTop: 24, color: "#64748b", fontSize: 14 }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setShowOTP(false);
              setFormData({ 
                name: "", 
                email: "", 
                phone: "", 
                password: "", 
                otp: "", 
                bankAccountNumber: "", 
                ifscCode: "", 
                accountHolderName: "", 
                bankName: "" 
              });
            }}
            style={{
              background: "none",
              border: "none",
              color: "#667eea",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14
            }}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

        {/* ========== SUPPORT SECTION ========== */}
        <div style={{
          marginTop: 32,
          padding: "16px",
          background: "#f1f5f9",
          borderRadius: 8,
          textAlign: "center"
        }}>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 12, marginTop: 0 }}>
            Need help? Join our Telegram community
          </p>
          <a
           href="https://t.me/+YkEN6s3Hm_oxY2Nl"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              background: "#0088cc",
              color: "#fff",
              textDecoration: "none",
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer"
            }}
          >
            💬 Join Telegram
          </a>
        </div>

      </div>
    </div>
  );
}