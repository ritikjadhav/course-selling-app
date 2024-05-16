const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');

async function adminMiddleware(req, res, next) {
  const jwtToken = req.headers.authorization;
  const array = jwtToken.split(" ");

  const token = array[1];

  const decoded = jwt.verify(token, JWT_SECRET);

  if (decoded.username) {
    next();
  } else {
    res.status(403).json({
      message: 'Admin doesnt exist',
    });
  }
}

module.exports = adminMiddleware;

// In every authenticated requests, send the username and password in the headers (and not the jwt)

// const username = req.headers.username;
// const password = req.headers.password;

// const existingAdmin = await Admin.findOne({ username, password }).exec();
// console.log(existingAdmin);

// Admin.findOne({ username, password })
//   .then((value) => {
//     if (value) {
//       next();
//     } else {
//       res.status(403).json({
//         message: 'Admin doesnt exist',
//       })
//     }
//   })