import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';
import { logout as logoutAction } from '../../redux/action/usersAction'; // importa la action real

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { socket } = useContext(SocketContext);
    const infoUser = useSelector((state) => state.userState.infoLogin);

    const logout = async () => {
            console.log("📦 Token en localStorage ANTES del logout:", localStorage.getItem("token"));

        // Avisar al servidor vía socket
        if (socket && infoUser?.id) {
            socket.emit("user-disconnected", infoUser.id);
            socket.disconnect();
        }

        // Llamar a la action (maneja token y backend)
        await dispatch(logoutAction());

        // Redirigir
        navigate("/login");
    };

    return logout;
};

export default useLogout;
