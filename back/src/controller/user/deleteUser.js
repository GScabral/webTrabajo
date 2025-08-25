const {User}= require('../../db')


const deleteUser = async(userId)=>{
    try{
        const userDeleted=await User.findByPk(userId);
        if(!userDeleted) {
            throw new Error('User not found');
        }

        await userDeleted.destroy();
        return ("usuer eliminado correctamente");
    }catch(error){
        console.error("error al eliminar el usuario:",error);
    }
}


module.exports = deleteUser;