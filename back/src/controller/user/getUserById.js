const { User, Trabajador, Servicio, Admin, UserBadges, Badges } = require('../../db');

const getUserById = async (userId) => {
    try {
        const infoUser = await User.findByPk(userId, {
            attributes: { exclude: ['password_hash'] },
            include: [
                {
                    model: Trabajador,
                    include: [
                        {
                            model: Servicio,
                            through: { attributes: [] } // relación N:N
                        }
                    ]
                },
                {
                    model: Admin, // Incluye el rol de admin si existe
                    attributes: ['rol'] // solo traemos el rol
                }, {
                    model: Badges,
                    as: 'badges',
                    through: {
                        attributes: ['metadata', 'created_at']

                    },
                    attributes: ['id', 'nombre', 'descripcion', 'icon_url', 'code', 'tipo']
                }

            ]
        });

        if (!infoUser) {
            throw new Error('Usuario no encontrado');
        }

        return infoUser;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        throw error;
    }
};

module.exports = getUserById;
