const { Mensaje, User } = require("../../db");
const { Op } = require("sequelize");

const obtenerChatsRecientes = async ({ userId }) => {
    if (!userId) {
        throw new Error("Debes proporcionar el ID del usuario.");
    }
    try {
        const mensajes = await Mensaje.findAll({
            where: {
                [Op.or]: [
                    { emisor_id: userId },
                    { receptor_id: userId }
                ]
            },
            include: [
                { model: User, as: 'Emisor', attributes: ['id', 'nombre', 'foto_perfil'] },
                { model: User, as: 'Receptor', attributes: ['id', 'nombre', 'foto_perfil'] }
            ],
            order: [['fecha_envio', 'DESC']]
        });

        // Filtrar solo una vez por cada usuario con el que ha chateado
        const chats = {};
        for (const mensaje of mensajes) {
            const otroUsuario = mensaje.emisor_id === userId ? mensaje.Receptor : mensaje.Emisor;
            if (otroUsuario && !chats[otroUsuario.id]) {
                // Contar mensajes no leídos de este usuario hacia el userId
                const noLeidos = await Mensaje.count({
                    where: {
                        emisor_id: otroUsuario.id,
                        receptor_id: userId,
                        leido: false
                    }
                });
                chats[otroUsuario.id] = {
                    usuario: otroUsuario,
                    ultimoMensaje: mensaje,
                    noLeidos // <--- este campo es clave para el punto rojo
                };
            }
        }

        return Object.values(chats);
    } catch (error) {
        throw new Error("Error al obtener los chats recientes: " + error.message);
    }
};

module.exports = obtenerChatsRecientes;