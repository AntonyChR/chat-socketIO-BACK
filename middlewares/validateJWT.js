const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    try{
        const token = req.header('x-token');

        if(!token){
            return res.status(401).json({
                ok: false,
                msg:'token is required'
            });
        }

        const {id}= jwt.verify(token, process.env.SECRET_TWT_SEED);
        req.id = id;
        next();
    } catch(error) {
        return res.status(401).json({
            ok: false,
            msg: 'invalid token'
        })
    }
    
}

module.exports = {
    validateJWT
}
