// nimportiw jsonwebtoken bech nverifiw token
const jwt = require("jsonwebtoken");

// bech nchoufou luser da5el token s7i7
exports.authenticate = (req, res, next) => {
  // na9raw header mta3 Authorization
  const header = req.headers.authorization;

  // ken famech header w ma tebdech b bearer y5arej erreur
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant" });
  }

  // bech ne5dhou token eli heya lpartie eli ba3ed bearer
  const token = header.split(" ")[1];

  try {
    //bech nverifiw token bel secret w kenou s7i7 ne5dhouh
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // na3mlou save lel les info ta3 user fi req.user 
    req.user = decoded;

    // n5aliweh yet3ada lel middleware wela controller eli ba3dou
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expire" });
  }
};

// nverifiw role authorisé wale
// authorize("manager") traja3 fonction tsir m3a kol req
exports.authorize = (...rolesAutorises) => {
  return (req, res, next) => {
    // user n'est pas authorisé
    if (!rolesAutorises.includes(req.user.role)) {
      return res.status(403).json({ message: "Acces refuse : role insuffisant" });
    }

    // role authorisé net3adew
    next();
  };
};