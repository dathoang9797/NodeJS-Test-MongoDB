const router = require("express").Router();
const userController = require("../controllers/usersController");
const auth = require("../controllers/authController");
const { authentication } = auth;
const {
  getAllUsers,
  signUpUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser,
  logOut,
  uploadAvatar,
  deleteAvatar,
  getAvatar,
  storeAvatar,
} = userController;

router.route("/users").get(getAllUsers).post(signUpUser); //done
router
  .route("/users/me")
  .get(authentication, getMe) //done
  .patch(authentication, updateUser) //done
  .delete(authentication, deleteUser);
router
  .route("/users/me/avatar")
  .get(authentication, getAvatar) //done
  .post(authentication, uploadAvatar.single("avatar"), storeAvatar) //done
  .delete(authentication, deleteAvatar); //done
router
  .route("/users/:id/avatar")
  .post(uploadAvatar.single("avatar"), storeAvatar); //done

router.route("/users/login").post(loginUser); //done
router.route("/users/logout").post(authentication, logOut); //done

module.exports = router;
