const User = require('./model');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    
    res.status(201).json(user);
}

const getUser = async (req, res) => {
    const email = req.query.email;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
}

module.exports = {
    createUser,
    getUser
};
