const jwt = require('jsonwebtoken')

exports.createToken = (user) => {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        { expiresIn: '2m' }
    )
}

exports.verifyToken = (token) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(error) {
        return null
    }
}


