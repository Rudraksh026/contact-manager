const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const contactInfoSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactInfo: [contactInfoSchema],
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) next();
  try {
    const salRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salRound);
    user.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
  } catch (error) {}
};

userSchema.methods.checkPassword = async function(password) {
  try {
    return await bcrypt.compare(password,this.password)
  } catch (error) {
    
  }
}

const User = new mongoose.model("User", userSchema);

module.exports = { User };
