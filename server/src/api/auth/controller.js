
const User = require('../users/model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = async (req, res) => {
    try {   

        const { 
            username, 
            password
             
        } = req.body;
        console.log(process.env.TOKEN_SECRET, password)

        const token = jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: "7d" });
        const user = await User.findOne({ username });

        

        if (user) {

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            return res.status(200).json({ token });
            
        }else{

            //create
            await User.create({
                username,
                password
            });

           return res.status(201).json({ token });

        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};






module.exports = {
    createToken,
    
};
