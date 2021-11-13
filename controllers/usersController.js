const { Buffer } = require("buffer");
const userModel = require("../models/usersModel");
const CatchError = require("../util/CatchError");
const AppError = require("../util/AppErrorHanding");
const Token = require("../util/Token");
const multer = require("multer");
const sharp = require("sharp");

exports.getAllUsers = CatchError(async (req, res, next) => {
  const users = await userModel.find({}).select("-password");
  res.status(200).json({ status: "success", users });
});

exports.getUser = CatchError(async (req, res, next) => {
  const id = req.params.id;
  const user = await userModel.findById(id).select("-password");
  res.status(200).json({ status: "success", user });
});

exports.getMe = CatchError(async (req, res, next) => {
  const id = req.user.id;
  const user = await userModel.findById(id).select("-password -token");
  res.status(200).json({ status: "success", user });
});

exports.signUpUser = CatchError(async (req, res, next) => {
  const user = await userModel.create(req.body);
  if (!user) return next(new AppError("Can't create user.", 400));
  await user.generateAuthToken();
  return res.status(200).json({ status: "Success", user });
});

exports.updateUser = CatchError(async (req, res, next) => {
  const updates = Object.keys(req.body);

  const allowedUpdates = [
    "name",
    "password",
    "email",
    "phone",
    "address",
    "image",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) return next(new AppError("Invalid Update", 400));
  updates.forEach((update) => (req.user[update] = req.body[update]));
  await req.user.save();
  res.status(200).json({ status: "success", user: req.user });
});

exports.deleteUser = CatchError(async (req, res, next) => {
  await req.user.remove();
  res.status(204).send();
});

exports.loginUser = CatchError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findByCredentials(email, password, next);
  const token = await user.generateAuthToken();
  if (!user) return next(new AppError("Can't find user", 400));
  res.status(200).json({ status: "success", message: "Login access", user });
});

exports.logOut = CatchError(async (req, res, next) => {
  req.user.token = undefined;
  await req.user.save();
  res.status(204).send();
});

exports.uploadAvatar = (() => {
  const upload = multer({
    limits: { fileSize: 1000000 },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpeg|jpg|png|bmp)/)) {
        cb(new Error("Please upload file pdf,jpg,bmp or png"));
      }
      return cb(undefined, true);
    },
  });
  return upload;
})();

exports.storeAvatar = CatchError(async (req, res, next) => {
  req.file.buffer = await sharp(req.file.buffer).resize(512, 512).toBuffer();

  if (!req.user) {
    const { id } = req.params;
    const user = await userModel.findById(id);
    user.image = req.file;
    await user.save();
    return res.status(200).json();
  }

  req.user.image = req.file;
  await req.user.save();
  res.status(200).json();
});

exports.deleteAvatar = CatchError(async (req, res, next) => {
  req.user.image = undefined;
  await req.user.save();
  res.status(200).send();
});

exports.getAvatar = CatchError(async (req, res, next) => {
  let id;
  if (req.params.id) {
    id = req.params.id;
  } else {
    id = req.user.id;
  }
  const user = await userModel.findById(id);
  if (!user) return next(new AppError("Don't find user"));
  const contentType = user.image.mimetype;
  const renderOfType = user.image.buffer.buffer;
  res.set("Content-Type", contentType);
  res.status(200).send(renderOfType);
});
