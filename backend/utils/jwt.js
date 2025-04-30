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


