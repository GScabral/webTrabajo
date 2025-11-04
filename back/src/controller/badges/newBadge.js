const { Badges } = require("../../db")


const newBadge = async (data) => {
    const { code, nombre, descripcion, icon_url, tipo, activo } = data;

    try {
        const nuevoBadge = await Badges.create({
            code,
            nombre,
            descripcion,
            icon_url,
            tipo,
            activo,
        });

        return nuevoBadge;
    } catch (error) {
        return { error: true, message: error.message || "Error al crear el badge" };
    }
};

module.exports = newBadge