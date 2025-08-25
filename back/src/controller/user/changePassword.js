const { User } = require('../../db')
const bcrypt = require('bcrypt')
const {sendPasswordChangeConfirmation} = require('../../utils/emailService');

const changePassword = async (userId, oldPassword, newPassword) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('user not found');
        }


        const isPasswordValid = await bcrypt.compare(oldPassword, user.password_hash);
        if(!isPasswordValid){
            throw new Error('old password is incorrect')
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);
        await user.update({password_hash:hashedPassword})

        await sendPasswordChangeConfirmation(user.email,user.user)


        return { message: 'Password changed successfully' };
    }catch(error){
        console.error('error changing password:',error);
        throw error;
    }
}


module.exports = changePassword;