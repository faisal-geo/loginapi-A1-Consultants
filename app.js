//Node.js API Authentication With JWT  by Traversy Media
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.get("/api", (req, res) => {
  res.json({
    message: "welcome to the api",
  });
});
// to protect the route.
app.post("/api/posts", verifyToken, (req, res) => {
  //requestuiting token
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created.....",
        authData
      });
    }
  });
});
//login route
app.post("/login", (req, res) => {
  //mock user
  const user = {
    id: 1,
    username: "faisal",
    email: "faisal@gmail.com",
  };
  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({
      token,
    });
  });
});
//format of token
//authorization: Bearer <access_token>
//verify token, it is a middleware function
function verifyToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers["authorization"];
  //checking if bearer is undefined..??
  if (typeof bearerHeader !== "undefined") {
    //split at the space
    const bearer = bearerHeader.split("");
    //get token from the array.
    const bearerToken = bearer[1];
    //set the token
    req.token = bearerToken;
    // next middleware
    next();
  } else {
    //access is forbidden
    res.sendStatus(403);
  }
}
app.listen(5000, () => console.log("Server started at 5000"));
