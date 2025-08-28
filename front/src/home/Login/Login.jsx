import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, loginUserById } from "../../redux/action/usersAction";
import "./Login.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({ email: "", password: "" });
    const [error, setError] = useState({});
    const [loginError, setLoginError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const { loading } = useSelector((state) => state.userState);




    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const newErrors = {};
        if (!state.email && isSubmitted) newErrors.email = "El correo es requerido";
        if (!state.password && isSubmitted) newErrors.password = "La contraseña es requerida";

        setError(newErrors);
        setIsValid(Object.keys(newErrors).length === 0);
    }, [state, isSubmitted]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true);

        // Validación directa antes de seguir
        if (!state.email || !state.password) {
            setError({
                email: !state.email ? "El correo es requerido" : "",
                password: !state.password ? "La contraseña es requerida" : "",
            });
            return;
        }

        try {
            const response = await dispatch(loginUser(state));

            if (response?.data?.token) {
                const userId = response.data.idUser || response.data.id; // según tu backend
                await dispatch(loginUserById(userId));
                navigate("/home");
            } else {
                setLoginError("Credenciales inválidas");
            }
        } catch (err) {
            setLoginError(err.response?.data?.error || "Error al iniciar sesión");
        }
    };
    return (
        <div className="login-wrapper">
            {/* Columna izquierda: formulario */}
            <div className="login-left">
                <div className="login-container">
                    <h1 className="login-title">Iniciar Sesión</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input
                            className="login-input"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={state.email}
                            placeholder="Email"
                            autoComplete="off"
                        />
                        {error.email && isSubmitted && <p className="error-message">{error.email}</p>}

                        <input
                            className="login-input"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={state.password}
                            placeholder="Contraseña"
                            autoComplete="off"
                        />
                        {error.password && isSubmitted && <p className="error-message">{error.password}</p>}

                        {loginError && <p className="error-message">{loginError}</p>}

                        <button
                            className={`form-button ${isValid ? "valid-button" : "invalid-button"}`}
                            type="submit"
                            disabled={!isValid || loading}
                        >
                            {loading ? "Cargando..." : "Iniciar Sesión"}
                        </button>

                        <div className="forgot-password-link">
                            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                        </div>
                        <Link to="/register" className="form-button link-button">
                            Crear una cuenta
                        </Link>
                    </form>
                </div>
            </div>

            {/* Columna derecha: imagen con texto */}
            <div className="login-right">
                <div className="login-overlay">
                    <h2>Bienvenido a Nuestra Plataforma</h2>
                    <p>Conecta con profesionales y encuentra el servicio que necesitas, rápido y seguro.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
