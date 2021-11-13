const userModel = require("../models/usersModel");
const CatchError = require("../util/CatchError");
const AppError = require("../util/AppErrorHanding");
const Token = require("../util/Token");

exports.authentication = CatchError(async (req, res, next) => {
  //1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.replace("Bearer ", "");
  }

  if (!token) {
    return next(
      new AppError("Your are not logged in! PLease login to get access.", 401)
    );
  }

  //2) Verification token
  const decoded = Token.compareToken(token);
  if (!decoded) return next(new AppError("Token is to expire.", 400));

  //3)Check if user still exists
  const { id, exp, iat } = decoded;
  const freshUser = await userModel.findById(id);
  if (!freshUser) {
    return next(
      new AppError(
        "The token belonging to this token does no longer exist.",
        401
      )
    );
  }
  req.user = freshUser;
  next();
});
