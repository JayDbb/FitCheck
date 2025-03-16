const User = require('./model');

const createUser = async (req, res) => {
    const { username, password } = req.body;
    const tempUser = await User.findOne({ username });

    if (tempUser) {
        return res.status(400).json({ message: 'User exists' });
    }

    await User.create({
        username,
        password
    });


    const token = jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: "7d" });

    res.status(201).json(token);
}

const getUser = async (req, res) => {
    const email = req.query.email;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
}

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
