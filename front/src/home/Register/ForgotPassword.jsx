import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordReset } from '../../redux/action/usersAction';
import "./Forgot.css"

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const { loading, error, message } = useSelector((state) => state.userState);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(requestPasswordReset(email));
    };

    return (
        <div className="forgot-container">
            <form onSubmit={handleSubmit} className="forgot-password-form">
                <h2>Recuperar contraseña</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar correo de recuperación"}
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {message && <p style={{ color: "green" }}>{message}</p>}
            </form>
        </div>
    );
};


export default ForgotPassword;