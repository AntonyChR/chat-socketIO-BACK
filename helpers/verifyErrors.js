const {validationResult} = require("express-validator")

const checkErrors = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            oK: false,
            error: errors.mapped()
        })
    }
    next();
}

module.exports = checkErrors;
