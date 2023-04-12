const { Configuration, OpenAIApi } = require("openai");
const cloudinary = require("cloudinary").v2;
const Post = require("../models/Post");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
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
};

const postImage = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;

    const imageRes = await cloudinary.uploader.upload(imageUrl, {
      folder: "ai-image-generator",
    });

    const post = await Post.create({
      name,
      image: {
        pulicId: imageRes.public_id,
        url: imageRes.url,
      },
    });

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const showAllPost = async (req, res) => {
  try {
    const sortParams = { _id: -1 };
    const data = await Post.find().sort(sortParams);
    return res.status(200).json({ status: "ok", data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = {
  generateImage,
  postImage,
  showAllPost,
};
