const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const morgan = require("morgan");

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);

const PORT = process.env.PORT;
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

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
app.post("/api/image", async (req, res) => {
  const { prompt } = req.body;
  const model = "image-alpha-001";
  const opts = { size: 512 };
  console.log(req.body);
  const aiRespoonse = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    // response_format: "b64_json",
  });
  // const image = aiRespoonse.data.data[0].b64_json;
  res.status(200).json(aiRespoonse.data);
});
