const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/api/image", userController.generateImage);
router.post("/api/post", userController.postImage);
router.get("/api/allPost", userController.showAllPost);
module.exports = router;
