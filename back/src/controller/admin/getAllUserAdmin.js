const {User,Trabajador, Servicio}= require('../../db')


const getAllUserAdmin = async () => {
    try {
        const listUser = await User.findAll({
            include: [
                {
                    model: Trabajador,
                    include: [
                        {
                            model: Servicio,
                            through: { attributes: [] }, // no incluir la tabla intermedia
                        }
                    ]
                }
            ]
        });

        return listUser;
    } catch (error) {
        console.log("Error al traer los usuarios:", error);
        throw error;
    }
};

module.exports = getAllUserAdmin;


//✅ 
