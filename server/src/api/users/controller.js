const User = require('./model');
const jwt = require("jsonwebtoken");

/**
 * Creates a new user if the username does not already exist.
 * @body {string} username - The desired username for the new user.
 * @body {string} password - The password for the new user.
 * @returns {string} JWT token upon successful user creation.
 */
const createUser = async (req, res) => {
  const { username, password } = req.body;
  const tempUser = await User.findOne({ username });

  if (tempUser) {
      return res.status(400).json({ message: 'User exists' });
  }

  await User.create({ username, password }); 

  const token = jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: "7d" });
  res.status(201).json({ token });
};


/**
 * Retrieves a user by email.
 * @query {string} email - The email of the user to retrieve.
 * @returns {Object} User object if found, otherwise 404 error.
 */
const getUser = async (req, res) => {
    const email = req.query.email;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
}


/**
 * Adds a user to the following list of another user.
 * @body {string} username - The username of the user performing the follow action.
 * @body {string} following - The username of the user to follow.
 * @returns {Object} Updated user object with modified following list.
 */
const followUser = async (req, res) => {
    const { username, following } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.following.push(following);
    await user.save();

    res.status(200).json(user);
}


/**
 * Removes a user from the following list of another user.
 * @body {string} username - The username of the user performing the unfollow action.
 * @body {string} following - The username of the user to unfollow.
 * @returns {Object} Updated user object with modified following list.
 */
const unfollowUser = async (req, res) => {
    const { username, following } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.following = user.following.filter(f => f !== following);
    await user.save();

    res.status(200).json(user);
}

module.exports = {
    createUser,
    getUser,
    followUser,
    unfollowUser
};
