const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const dbConnection = require("./utils/dbConnection");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT;
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

//database call
dbConnection();
app.get("/", (req, res) => {
  return res.status(200).send("ok from server");
});

app.use(morgan("dev"));

let client = "http://localhost:3000";

if (process.env.NODE_ENV === "production") {
  client = process.env.CLIENT_URL;
}
app.use(
  cors({
    origin: client,
  })
);
app.use(userRoutes);
