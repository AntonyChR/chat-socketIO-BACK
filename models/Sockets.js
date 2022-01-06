const {userConnected, getUsers, saveMessage} = require('../cotrollers/socket');
const {checkTocken}= require('../helpers/jwt')
class Sockets {
    constructor( io ) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        this.io.on('connection',async ( socket ) => {

            const tokenReceived =socket.handshake.query['x-token'];
            const [valid, id]  =  checkTocken(tokenReceived);

            if(!valid) {
                console.log('invalid token -> DISCONNECTED')
                return socket.disconnect();
            }
            const user =  await userConnected(id, true);
            console.log(user.name,': ',socket.id, ' -> CONECTED')

            socket.join(id)

            this.io.emit('user-list', await getUsers());

            socket.on('personal-message',async(message)=>{
                const savedMessage = await saveMessage(message)
                console.log(saveMessage.createdAt)
                this.io.to(message.to).emit('personal-message', savedMessage);
                this.io.to(message.from).emit('personal-message', savedMessage);

            })

            socket.on('disconnect',async ()=>{
                console.log(user.name, ': ',socket.id, '-> DISCONNECTED')
                await userConnected(id, false);
                this.io.emit('user-list', await getUsers());
            })

        });
    }
}

module.exports = Sockets;
