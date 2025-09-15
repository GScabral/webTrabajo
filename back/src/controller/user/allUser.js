const { User, Trabajador, Servicio,Calificacion } = require('../../db')


const getAllUser = async () => {
    try {
        const listUser = await User.findAll({
            include: [
                {
                    model: Trabajador,
                    include: [
                        {
                            model: Servicio,
                            through: { attributes: [] }, // no incluir la tabla intermedia
                        },
                        {
                            model: Calificacion, // 🔑 aquí traes las calificaciones
                            attributes: ['puntuacion', 'fecha'] // solo lo necesario
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

module.exports = getAllUser;


//✅ 
