import User from '../../models/User.js';
import CryptoJS from 'crypto-js'

/**
 * Handles user login.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>}
 */
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json({ userId: user._id });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+,\.\-_'"!¿?])[A-Za-z\d+,\.\-_'"!¿?]{6,80}$/;
const namePattern = /^(?!\s{0,2}$)[A-Za-z\s]{3,80}$/;


const registerUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PSWD_DECRYPT_CODE
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

const isValidUserName = (name) => {
  let isValidName = true;
  isValidName = namePattern.test(name);
  const userNameArray = name.split(" ");

  userNameArray.map((word) => {
    isValidName = namePattern.test(word);
  });
  
  return isValidName;
}


export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const isValidEmail = emailPattern.test(email.trim());

  if (!isValidEmail) {
    res.status(500).json({ error: "Invalid email" });
  } else {
    try {
      const existingUser = await User.findOne({ email: email }).exec();

      if (existingUser) {
        res.status(500).json({ error: "The email inserted is already in use" });
      } else if (!passwordPattern.test(password.trim())) {
        res.status(500).json({ error: "Invalid Password" });
      } else if (!isValidUserName(username.trim())) {
        res.status(500).json({ error: "Invalid User Name" });
      } else {
        await registerUser(req, res);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};


