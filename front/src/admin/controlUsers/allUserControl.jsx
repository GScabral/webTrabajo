import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserAdmin, banUser, UnBanUser } from "../../redux/action/adminAction";
import "./controlUserAll.css";

const ControlUserAll = () => {
    const dispatch = useDispatch();
    const allUser = useSelector((state) => state.adminState.allUserAdmin);

    const [openMenu, setOpenMenu] = useState(null);
    const [selectedDate, setSelectedDate] = useState(""); // fecha seleccionada

    useEffect(() => {
        dispatch(getAllUserAdmin());
    }, [dispatch]);

    const handleBanUser = (userId) => {
        if (!selectedDate) {
            alert("Por favor selecciona una fecha antes de banear.");
            return;
        }
        dispatch(banUser(userId, selectedDate));
        setSelectedDate(""); // limpiar después de usar
        setOpenMenu(null); // cerrar menú
    };

    const handleUnBanUser = (userId) => {
        dispatch(UnBanUser(userId))
        setOpenMenu(null); // cerrar menú

    }


    console.log(allUser)

    return (
        <div className="userControlContainer">
            <h2>Panel de Usuarios</h2>

            <div className="userGrid">
                {allUser.map((user) => (
                    <div
                        key={user.id}
                        className={`userCard ${user.tipo === "trabajador" ? "worker" : "client"}`}
                    >
                        <div className="userCardHeader">
                            <h3>{user.nombre}</h3>

                            {/* Menú de los 3 puntitos */}
                            <div className="menuWrapper">
                                <button
                                    className="menuButton"
                                    onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                                >
                                    ⋮
                                </button>

                                {openMenu === user.id && (
                                    <div className="menuDropdown">
                                        {/* Input de fecha */}
                                        <label>
                                            Fecha de bloqueo:
                                            <input
                                                type="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                            />
                                        </label>

                                        <button onClick={() => handleBanUser(user.id)}>🚫 Confirmar Ban</button>
                                        <button onClick={() => handleUnBanUser(user.id)}>👍Sacar Ban</button>
                                        <button onClick={() => alert("Eliminar usuario...")}>🗑 Eliminar</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Teléfono:</strong> {user.telefono || "No registrado"}</p>
                        <p><strong>Tipo:</strong> {user.tipo}</p>
                        <p><strong>Ubicación:</strong> {user.ubicacion || "No especificada"}</p>

                        {user.tipo === "trabajador" && user.Trabajador && (
                            <div className="workerInfo">
                                <p><strong>Descripción:</strong> {user.Trabajador.descripcion}</p>
                                <p><strong>Tarifa:</strong> ${user.Trabajador.tarifa_minima} - ${user.Trabajador.tarifa_maxima}</p>
                                <p><strong>Disponibilidad:</strong> {user.Trabajador.disponibilidad}</p>
                            </div>
                        )}

                        <p className={`status ${user.verificado ? "verified" : "unverified"}`}>
                            {user.verificado ? "✔ Verificado" : "✖ No verificado"}
                        </p>
                        <p className={`status ${user.bloqueado ? "verifiedBan" : "unverifiedBan"}`}>
                            {user.bloqueado ? "✖ Baneado" : "✔ Activo"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ControlUserAll;
