const User = require('../models/User');

const bcrypt = require('bcryptjs');
const {generateJWT} = require('../helpers/jwt');

const createUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const existEmail = await User.findOne({email});

        if(existEmail){
            return res.status(400).json({
                msg: 'The email is already in use'
            });
        }

        const user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        const token = await generateJWT(user.id);


        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hablar con el adminsitrador'
        });
    }

}

const login = async (req, res) => {

    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'Email not found'
            });
        }

        const validaPassword = bcrypt.compareSync(password, user.password);

        if(!validaPassword){
            return res.status(404).json({
                ok: false,
                msg: 'invalid password'
            });
        }
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });

    } catch(error){
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: 'Hablar con el admin'
        });
    }
}

const renewToken= async (req, res) => {
    const id = req.id;

    const token = await generateJWT(id);

    const user = await User.findById(id);

    res.json({
        ok: true,
        user,
        token
    });
}

module.exports = {
    createUser,
    login,
    renewToken
}
