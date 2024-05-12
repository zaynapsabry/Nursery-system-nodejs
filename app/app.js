const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const childRouter = require("./Routes/childRoute");
const teacherRouter = require("./Routes/teacherRoute");
const classRouter = require("./Routes/classRoute");

const loginRouter = require("./Routes/authentication");
const authMW = require("./MiddleWares/authenticationMW");

//*************************** Server creation ****************************//
const server = express();
mongoose
  .connect("mongodb://localhost:27017/nodeDB")
  .then(() => {
    console.log("DB Connected");
    server.listen(8080, () => {
      console.log("Server listening on port 8080");
    });
  })
  .catch((error) => {
    console.log("DB Connection problem: " + error);
  });

//*************************** Middelwares ****************************//

server.use(morgan("combined"));
// First middleware using Morgan
server.get("/", (req, res) => {
  res.send("Hello World!");
});
// server.get("/text", (req, res) => {
//   throw "Error test";
// });

// server.use((request, response, next) => {
//     console.log("Hello from first MW", request.url, request.method);
//     next();
//   });

//*************************** Settings ****************************//

//*************************** Routes ****************************//

server.use(express.json());
server.use(loginRouter);
server.use(authMW);
server.use(teacherRouter);
server.use(childRouter);
server.use(classRouter);

// Not Found Middleware
server.use((request, respone) => {
  respone.status(404).json({ message: "Not Found" });
});

// Error Middleware
server.use((error, request, respone, next) => {
  respone.status(500).json({ Error: "Error" + error });
});
