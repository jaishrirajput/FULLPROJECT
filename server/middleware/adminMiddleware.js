// server/middleware/adminMiddleware.js

const adminMiddleware = (req, res, next) => {
  try {
    // ✅ Admin email (YOUR EMAIL)
    const adminEmails = [
      "msdhoni5616000016@gmail.com"
    ];

    if (!req.user || !req.user.email) {
      return res.status(403).json({ 
        message: "Admin access only" 
      });
    }

    if (!adminEmails.includes(req.user.email)) {
      console.log(`❌ Unauthorized admin access attempt by: ${req.user.email}`);
      return res.status(403).json({ 
        message: "You don't have admin privileges" 
      });
    }

    console.log(`✅ Admin access granted to: ${req.user.email}`);
    next();

  } catch (error) {
    console.error("❌ Admin middleware error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default adminMiddleware;