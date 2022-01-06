const {Router} = require('express');
const {check} = require('express-validator');

const {renewToken, login, createUser} = require('../cotrollers/auth');
const checkErrors = require('../helpers/verifyErrors');
const {validateJWT} = require('../middlewares/validateJWT');

//paht:/api/login*

const router  = Router();

router.post(
    '/new',
    [
        check('email','Email is required').isEmail(),
        check('password','Password is required').not().isEmpty(),
        check('name','user name is required').not().isEmpty(),
        checkErrors 
    ],
    createUser);

router.post(
    '/',
    [
        check('email','Email is required').isEmail(),
        check('password','Password is required').not().isEmpty(),
        checkErrors 
    ],
    login);

router.get('/renew', validateJWT,renewToken);




module.exports = router;
