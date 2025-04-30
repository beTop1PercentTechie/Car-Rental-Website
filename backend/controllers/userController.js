const User = require('../models/userModel');
const { createToken } = require('../utils/jwt');


const registerUser = async (req, res) => {
    try{
        const { name, email, password, phone } = req.body;
        // check user inputs
        const userExsists = await User.findOne({email});
        if(userExsists) {
            return res.status(400).json({
                success: false,
                message: "User already exsists"
            })
        }

        const user = await User.create({
            name,
            email,
            password,
            phone,
            role: 'user'
        })

        res.status(201).json({
            success: true,
            token: createToken
        })
    }
    catch(error) {

    }
}