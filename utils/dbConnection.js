const mongoose = require("mongoose");

module.exports = async () => {
  const URI = process.env.DATABASE_URL;
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Database Connected");
};
