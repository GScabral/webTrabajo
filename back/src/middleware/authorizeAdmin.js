const authorize = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "No autenticado" });
        }

        // aquí cambiamos "rol" por "role"
        const rolUsuario = req.user.role?.toLowerCase();  
        const roles = rolesPermitidos.map(r => r.toLowerCase());

        if (!roles.includes(rolUsuario)) {
            return res.status(403).json({ error: "No tienes permisos suficientes" });
        }

        next();
    };
};

module.exports = authorize;
