const admin = require("firebase-admin");
const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  //   databaseURL: "https://novelish-reviews-default-rtdb.firebaseio.com/",
});
const db = require("./database")

const jwtDecode = require("jwt-decode");

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).send({
      code: "authorization_header_missing",
      description: "Authorization header is expected",
    });
    return;
  }

  const parts = header.split(" ");

  if (parts[0].toLocaleLowerCase() != "bearer") {
    res.status(401);
    res.send({
      code: "invalid_header",
      description: 'Authorization header must start with "Bearer"',
    });
    return;
  }

  if (parts.length == 1) {
    res.status(401);
    res.send({
      code: "invalid_header",
      description: "Token not found",
    });
  }

  if (parts.length > 2) {
    res.status(401);
    res.send({
      code: "invalid_header",
      description: 'Authorization header must be "Bearer TOKEN"',
    });
    return;
  }

  const token = parts[1];

  const user = jwtDecode(token);
  const exsiting = await db.oneOrNone(`SELECT id FROM users WHERE email = $(email)`, {email: user.email});
  req.user = user;
  req.user.id = exsiting.id;
  next();
  //   app
  //     .auth()
  //     .verifyIdToken(token)
  //     .then((user) => {
  //       req.user = user;
  //       next();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       res.status(401);
  //       res.send({
  //         code: "invalid_header",
  //         description: "Validation of token failed.",
  //       });
  //     });
};
