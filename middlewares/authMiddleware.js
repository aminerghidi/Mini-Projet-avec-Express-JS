// nimportiw jsonwebtoken bech nverifiw token
const jwt = require("jsonwebtoken");

// bech nchoufou luser da5el token s7i7
exports.authenticate = (req, res, next) => {
  // نقراو الـ header متاع Authorization
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

    // n5aliweh yet3ada lel middleware wela controller  eli ba3dou
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expire" });
  }
};

// middleware الثاني : نتأكدو الدور (role) مسموح
// authorize("manager") ترجّع function، و هي اللي تتنفذ مع كل طلب
exports.authorize = (...rolesAutorises) => {
  return (req, res, next) => {
    // user n'est pas authorisé
    if (!rolesAutorises.includes(req.user.role)) {
      return res.status(403).json({ message: "Acces refuse : role insuffisant" });
    }

    // الدور صحيح : نكملو
    next();
  };
};