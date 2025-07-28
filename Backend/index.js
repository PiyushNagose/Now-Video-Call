require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createServer } = require("node:http");
const { connectToSocket } = require("./Controller/SocketManager");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const UserRoutes = require("./Routes/UserRoutes");

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGO_URL;

main()
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(URL);
}

app.use(express.json({ limit: "50kb" }));
app.use(cors());
app.use(express.urlencoded({ limit: "50kb", extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/v1/users", UserRoutes);

server.listen(PORT, () => {
  console.log(`Listening... to ${PORT}`);
});
