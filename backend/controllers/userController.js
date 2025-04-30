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

        console.log(user.name)
        console.log(user._id)
        res.status(201).json({
            success: true,
            token: createToken(user),
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        })
    }
    catch(error) {
        console.log(error)
        res.status(500).json({
            success: false,

        })
    }
}


const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please provide email and/or password'
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email or/and password"
            })
        }

        if (user.status === 'Banned'){
            return res.status(403).json({
                success: false,
                message: "Your account has been banned. Please contact admin/support."
            })
        }

        const isMatch = await user.matchPassword(password);


        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            })
        }


        res.json({
            success: true,
            token: createToken(user),
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        })
    }
}

// get profile -> bookings 

// update profile
const updateProfile = async (req, res) => {
    try{
        const { name, email, phone } = req.body;

        const exsistingUser = await User.findOne({email, _id : {$ne : req.user._id}})

        if (exsistingUser){
            return res.status(400).json({
                success: false,
                message: 'Email alread in use'
            })
        }
        
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, email, phone },
            { new: true }
        ).select('-password');

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    joinedDate: user.createdAt
                }
            }
        })
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}




const changePassword = async (req, res) => {
    try{
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);
        if (!await user.matchPassword(currentPassword)){
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect.'
            })
        }

        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: 'Password changed successfully.'
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    registerUser, loginUser, updateProfile, changePassword
}