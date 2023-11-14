import User from '../../models/User.js';
import CryptoJS from 'crypto-js';


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

const registerUser = async (req, res) => {
  const newUser = new User({
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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//REGISTER
export const signUp = async (req, res) => {
  const [emailRequest, password] = req.body;
  const isValidEmail = emailPattern.test(emailRequest);

  console.log(emailRequest);
  console.log(isValidEmail);

  if (!isValidEmail) {
    console.log("asfasdf");
    res.status(500).json({error: "Invalid email"});
  } else if (User.findOne({ emailRequest, password })) {
    
  } else if (condition) {
    
  } else if (condition) {
    
  }
  
  
  else {
    res.status(500).json({error: "Invalid credentials"});
  }
};

