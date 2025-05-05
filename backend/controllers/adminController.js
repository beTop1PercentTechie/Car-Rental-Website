const Admin = require('../models/adminModel');
const { createToken } = require('../utils/jwt');
const bcrypt = require('bcryptjs');


// Register admin
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const adminExsists = await Admin.findOne({email});
        if(adminExsists){
            return res.status(400).json({message: 'Admin already exsists.'})
        }

        const admin = await Admin.create({
            name,
            email,
            password
        });

        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: createToken(admin._id)
        });
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
};


// Login admin
const loginAdmin = async (req, res) => {
    try{
        const {email, password} = req.body;
        const admin = await Admin.findOne({email});
        if(!admin) {
            return res.status(401).json({message: "Invalid email or password"})
        }

        const isMatch = await admin.matchPassword(password);
        if(!isMatch) {
            return res.status(401).json({message: 'Invalid password'})
        }

        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: createToken(admin._id)
        })
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
}



// get admin profile
const getProfile = async (req, res) => {
    try{
        const admin = await Admin.findById(req.admin._id).select('-password');

        res.json({
            success: true,
            data: {
                name: admin.name,
                email: admin.email,
                phone: admin.phone,
                role: 'admin',
                lastLogin: admin.lastLogin,
                joinedDate: admin.createdAt
            }
        })
        
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
}


// updateProfile
const updateProfile = async (req, res) => {
    try{
        const { name, email, phone } = req.body;

        const admin = Admin.findByIdAndUpdate(
            req.admin._id,
            {name, email, phone},
            { new: true }
        ).select('-password');
        
        
        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                name: admin.name,
                email: admin.email,
                phone: admin.phone,
                role: 'admin',
                lastLogin: admin.lastLogin,
                joinedDate: admin.createdAt
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
        const admin = await Admin.findById(req.admin._id);

        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect.'
            })
        }

        admin.password = newPassword
        // const salt = await bcrypt.gentSalt(10);
        // admin.password = await bcrypt.hash(newPassword, salt);
        await admin.save();

        res.json({
            success: true,
            message: 'Password changed successfully'
        })
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



module.exports = {
    registerAdmin,
    loginAdmin,
    getProfile,
    updateProfile,
    changePassword
}