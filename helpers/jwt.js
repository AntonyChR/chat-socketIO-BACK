const jwt = require('jsonwebtoken');
const generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = {id};
        jwt.sign(payload, process.env.SECRET_TWT_SEED,{
            expiresIn: '24h'
        }, (error, token)=>{
            if(error){
                reject('Error generating token')
            }else{
                resolve(token);
            }

        });
    });
}

const checkTocken = (token) => {
    try{
        const {id}= jwt.verify(token, process.env.SECRET_TWT_SEED);
        return [true, id];
    } catch(error){
        return [false, null]
    }
}

module.exports = {
    generateJWT,
    checkTocken
}
