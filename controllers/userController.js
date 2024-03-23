const { getUserByEmail, createUser } = require("../services/userService");

const registerUser = async (req, res) => {
  const { email, name, phoneNumber, country, referralCode } = req.body;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await createUser({
      email,
      name,
      phoneNumber,
      country,
      referralCode,
    });
    return res
      .status(201)
      .json({ id: newUser, message: "User signed up successfully" });
  } catch (err) {
    console.error("Error occurred during user registration:", err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser };
