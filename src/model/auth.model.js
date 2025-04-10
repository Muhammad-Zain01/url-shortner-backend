const {
  EncryptPassword,
  ComparePassword,
  errorResponse,
  generateVerificationCode,
} = require("../utils/helper");
const { users } = require("../db/schema");
const Email = require("../utils/emailSender");
const { Encode, Decode } = require("../utils/jwt");

async function isUserNameAvailable(username) {
  try {
    const result = await users.findOne({ username });
    if (result) return { status: 0 };
    else return { status: 1 };
  } catch (error) {
    return errorResponse(error);
  }
}

async function registerUser(username, email, pass) {
  try {
    const displayName = username;
    const password = await EncryptPassword(pass);
    const isVerified = false;
    const verificationCode = generateVerificationCode();
    const user = {
      username,
      email,
      password,
      displayName,
      isVerified,
      verificationCode,
    };
    await users.create(user);
    console.log("auth", user);
    // await Email.SendVerificationEmail(email, displayName, verificationCode);
    return { status: 1 };
  } catch (error) {
    return errorResponse(error);
  }
}

async function authenticateUser(username, password) {
  try {
    const result = await users.findOne({ username });
    if (result) {
      const isCorrectPassword = await ComparePassword(
        password,
        result.password
      );
      if (isCorrectPassword) {
        const data = {
          username: result.username,
          email: result.email,
        };
        const token = Encode(data);
        return {
          status: 1,
          token,
          user: {
            username: result.username,
            email: result.email,
          },
        };
      } else {
        return {
          status: 0,
          message: "INVALID_PASSWORD",
        };
      }
    } else {
      return { status: 0, message: "INVALID_USER" };
    }
  } catch (error) {
    return errorResponse(error);
  }
}

async function ForgotPasswordEmailVerfication(username) {
  try {
    const result = await users.findOne({ username });
    if (result) {
      const email = result.email;
      const displayName = result.displayName;
      const verificationCode = generateVerificationCode();
      await users.updateOne({ username }, { verificationCode });
      await Email.SendVerificationEmail(email, displayName, verificationCode);
      const token = Encode({ username });
      return { status: 1, token };
    } else {
      return { status: 0, message: "INVALID_USER" };
    }
  } catch (error) {
    return errorResponse(error);
  }
}

async function ResetCode(token, code) {
  try {
    const data = Decode(token);
    if (data) {
      const { username } = data;
      const result = await users.findOne({ username });
      if (result) {
        if (result.verificationCode == code) {
          const newPassword = generateVerificationCode();
          const email = result.email;
          const displayName = result.displayName;
          const newHashedPassword = await EncryptPassword(newPassword);
          await users.updateOne({ username }, { password: newHashedPassword });
          await Email.PasswordResetEmail(email, displayName, newPassword);
          return { status: 1 };
        } else {
          return { status: 0, message: "INVALID_CODE" };
        }
      }
    } else {
      return { status: 0, message: "INVALID_TOKEN" };
    }
  } catch (error) {
    return errorResponse(error);
  }
}

module.exports = {
  ResetCode,
  ForgotPasswordEmailVerfication,
  isUserNameAvailable,
  registerUser,
  authenticateUser,
};
