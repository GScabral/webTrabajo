const {Mensaje,User}= require("../../db")




const crearMensaje = async ({ emisor_id, receptor_id, contenido }) => {
    try {
        const nuevoMensaje = await Mensaje.create({
            emisor_id,
            receptor_id,
            contenido
        });
        return nuevoMensaje;
    } catch (error) {
        throw new Error("No se pudo crear el mensaje: " + error.message);
    }
};




module.exports= crearMensaje;