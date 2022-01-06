const User = require('../models/User');
const Message = require('../models/Message');

const userConnected = async(uid, status)=>{
    const user = await User.findById(uid) ;
    user.online = status? true:false;
    await user.save();
    return user;
}

const getUsers = async()=>{
    const users = await User.find().sort('-online');
    return users;
}

const saveMessage = async(payload) => {
    try{
        const message = new Message(payload);
        await message.save();
        return message;
    }catch(error){
        console.log(error)
        return error;
    }
}

module.exports = {
    userConnected,
    getUsers,
    saveMessage
}
