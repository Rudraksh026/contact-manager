const { User } = require("../models/useModel");

const home = async (req, res) => {
  res.send("5641687");
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await User.findOne({ email });
    if (response == null) {
      res.status(401).json({ msg: "Unauthorized" });
    }

    const validation = await response.checkPassword(password);

    if (validation) {
      res
        .status(200)
        .json({ msg: "login done", token: await response.generateToken() });
    } else {
      res.status(401).json({ msg: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(400).json({ msg: "User Already Exists" });
    }

    const userCreate = await User.create({ username, email, password });
    if (userCreate) {
      res
        .status(200)
        .json({ msg: "User Created", token: await userCreate.generateToken() });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const addContact = async (req, res) => {
  try {
    const { email, contactInfo } = req.body;
    const { Contactname, Contactemail, Contactphone } = contactInfo[0];
    const response = await User.findOne({ email });
    if (response == null) {
      res.status(401).json({ msg: "Unauthorized" });
    }

    response.contactInfo.push({
      name: Contactname,
      email: Contactemail,
      phone: Contactphone,
    });
    await response.save();

    res
      .status(200)
      .json({ msg: "Contact Added", contactInfo: response.contactInfo });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { email, id } = req.body;
    const response = await User.findOne({ email });
    if (response == null) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    response.contactInfo = response.contactInfo.filter(
      (element) => element._id.toString() !== id
    );
    await response.save();
    return res
      .status(200)
      .json({ msg: "Contact Deleted", contactInfo: response.contactInfo });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { home, login, signup, addContact, user, deleteContact };
