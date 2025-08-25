const { Mensaje, User } = require("../../db");
const { Op } = require("sequelize");

const obtenerConversacion = async ({ userId1, userId2 }) => {
    if (!userId1 || !userId2) {
        throw new Error("Debes proporcionar ambos IDs de usuario.");
    }
    try {
        const mensajes = await Mensaje.findAll({
            where: {
                [Op.or]: [
                    { emisor_id: userId1, receptor_id: userId2 },
                    { emisor_id: userId2, receptor_id: userId1 }
                ]
            },
            include: [
                { model: User, as: 'Emisor', attributes: ['id', 'nombre', 'foto_perfil'] },
                { model: User, as: 'Receptor', attributes: ['id', 'nombre', 'foto_perfil'] }
            ],
            order: [['fecha_envio', 'ASC']]
        });

        return mensajes;
    } catch (error) {
        throw new Error("Error al obtener la conversación: " + error.message);
    }
};

module.exports = obtenerConversacion;