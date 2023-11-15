import User from '../../models/User.js';
import CryptoJS from 'crypto-js'

/**
 * Handles user login.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>}
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      decryptPassword(user, req, res);

    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * Decrypts and verifies the provided password against the stored hashed password for a user.
 * @param {Object} user - The user object containing the hashed password.
 * @param {Object} req - The request object containing the user-entered password.
 * @param {Object} res - The response object for sending results.
 * @throws {Object} - Returns a JSON object with a 'message' property if the password is incorrect, resulting in a 401 Unauthorized status.
 *                   - Returns a JSON object with a 'userId' property if the password is correct, resulting in a 200 OK status.
 */
const decryptPassword = (user, req, res) => {
  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.PSWD_DECRYPT_CODE
  );

  const storedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  if (storedPassword !== req.body.password) {
    res.status(401).json({ message: 'Wrong Password' });
  } else {
    res.status(200).json({ userId: user._id });
  }
}


/**
 * Regular expression pattern to validate email addresses.
 * - ^[^\s@]+: Must start with one or more characters that are not whitespace or '@'.
 * - @: Must contain the '@' symbol.
 * - [^\s@]+: Followed by one or more characters that are not whitespace or '@'.
 * - \.: Must contain a dot '.'.
 * - [^\s@]+: Followed by one or more characters that are not whitespace or '@'.
 * - $: Must end with the pattern.
 */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Regular expression pattern to validate passwords.
 * - (?=.*[a-z]): Must contain at least one lowercase letter.
 * - (?=.*[A-Z]): Must contain at least one uppercase letter.
 * - (?=.*\d): Must contain at least one digit.
 * - (?=.*[+,\.\-_'"!¿?]): Must contain at least one special character from the provided set.
 * - [A-Za-z\d+,\.\-_'"!¿?]{6,80}: Allowed characters include letters (upper and lower case),
 *   digits, and the specified special characters. Length must be between 6 and 80 characters.
 */
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+,\.\-_'"!¿?])[A-Za-z\d+,\.\-_'"!¿?]{6,80}$/;

/**
 * Regular expression pattern to validate names.
 * - ^(?! {0,2}$): Must not start or end with 0 to 2 spaces.
 * - [A-Za-z\s]{3,80}: Allowed characters include letters (upper and lower case) and spaces.
 *   Length must be between 3 and 80 characters.
 */
const namePattern = /^(?! {0,2}$)[A-Za-z\s]{3,80}$/;


/**
 * Validates if the provided email follows the specified pattern.
 * @param {string} email - The email to be validated.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
const isValidEmail = (email) => {
  return emailPattern.test(email.trim());
}

/**
 * Validates if the provided password follows the specified pattern.
 * @param {string} password - The password to be validated.
 * @returns {boolean} - True if the password is valid, false otherwise.
 */
const isValidPassword = (password) => {
  return passwordPattern.test(password.trim());
}

/**
 * Validates if the provided name follows the specified pattern.
 * @param {string} name - The name to be validated.
 * @returns {boolean} - True if the name is valid, false otherwise.
 */
const isValidUserName = (name) => {
  let isValidName = true;
  isValidName = namePattern.test(name);
  const userNameArray = name.split(" ");

  userNameArray.map((word) => {
    isValidName = namePattern.test(word);
  });

  return isValidName;
}

/**
 * Registers a new user with the provided username, email, and password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Object} - Returns a JSON object with an 'error' property if an error occurs during registration.
 */
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
    res.status(500).json({ error: "Error during user registration." });
  }
}

/**
 * Handles user signup by validating email, checking for existing users, and performing necessary checks.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Object} - Returns a JSON object with an 'error' property if any validation or registration error occurs.
 */
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!isValidEmail(email)) {
    res.status(500).json({ error: "Invalid email" });
  } else {
    try {
      const existingUser = await User.findOne({ email: email }).exec();

      if (existingUser) {
        res.status(500).json({ error: "The email inserted is already in use" });
      } else if (!isValidPassword(password)) {
        res.status(500).json({ error: "Invalid Password" });
      } else if (!isValidUserName(username)) {
        res.status(500).json({ error: "Invalid User Name" });
      } else {
        await registerUser(req, res);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};


