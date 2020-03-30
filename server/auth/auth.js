const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "You must be logged in" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ error: "Acces Denied - Token Invalid" });
    req.user = user;
    next();
  });
};

const checkRoleAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "You must be logged in" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ error: "Acces Denied - Token Invalid" });
    if (!user.isAdmin) {
      return res.status(403).json({ error: "Acces Denied - Only Admin" });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  checkAuth,
  checkRoleAdmin
};
