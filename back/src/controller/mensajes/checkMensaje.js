const { Mensaje } = require("../../db");

const marcarConversacionComoLeida = async ({ userId, chatWithId }) => {
    if (!userId || !chatWithId) {
        throw new Error('Faltan parámetros');
    }
    try {
        // Marca como leídos todos los mensajes recibidos por userId desde chatWithId
        await Mensaje.update(
            { leido: true },
            {
                where: {
                    emisor_id: chatWithId,
                    receptor_id: userId,
                    leido: false
                }
            }
        );
        return { success: true };
    } catch (error) {
        throw new Error('Error al marcar conversación como leída: ' + error.message);
    }
};

module.exports =  marcarConversacionComoLeida ;