import React, { useState, useEffect } from "react";
import { registerUser, getAllService } from "../../redux/action/usersAction.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allService = useSelector((state) => state.userState.servicios);
  const [successMessage, setSuccessMessage] = useState("");


  const [form, setForm] = useState({
    email: "",
    password: "",
    nombre: "",
    tipo: "cliente",
    foto_perfil: null,
    foto_preview: null,
    ubicacion: "",
    telefono: "",
    descripcion: "",
    tarifa_minima: "",
    tarifa_maxima: "",
    disponibilidad: "",
    servicioIds: [],
  });

  useEffect(() => {
    dispatch(getAllService());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          foto_perfil: file,
          foto_preview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key !== "servicioIds" && key !== "foto_preview") {
        formData.append(key, form[key]);
      }
    });

    if (form.foto_perfil) {
      formData.append("foto_perfil", form.foto_perfil);
    }

    form.servicioIds.forEach((id) => {
      formData.append("servicioIds[]", id);
    });

    try {
      const response = await dispatch(registerUser(formData));
      if (!response?.error) {
        setSuccessMessage("✅ Registrado con éxito");
        setForm({
          email: "",
          password: "",
          nombre: "",
          tipo: "cliente",
          foto_perfil: null,
          foto_preview: null,
          ubicacion: "",
          telefono: "",
          descripcion: "",
          tarifa_minima: "",
          tarifa_maxima: "",
          disponibilidad: "",
          servicioIds: [],
        });
        setTimeout(() => setSuccessMessage(""), 4000);
        navigate("/login");
      } else {
        alert("❌ Hubo un error al registrarse: " + response.error);
      }
    } catch (err) {
      console.error("Error en el registro:", err);
    }
  };

  return (
    <div className="auth-container">
      {/* Columna izquierda con el formulario */}
      <div className="auth-left">
        <form className="form-register" onSubmit={handleRegister}>
          <h1 className="form-title">Registrarse</h1>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <input
            className="form-input"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            className="form-input"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <select
            className="form-input"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            required
          >
            <option value="cliente">Cliente</option>
            <option value="trabajador">Trabajador</option>
          </select>

          <input
            className="form-input"
            type="file"
            name="foto_perfil"   // 🔑 que coincida con el backend
            accept="image/*"
            onChange={handleFileChange}
          />
          {form.foto_preview && (
            <img
              src={form.foto_preview}
              alt="Vista previa"
              className="preview-image"
            />
          )}

          <input
            className="form-input"
            name="ubicacion"
            placeholder="Ubicación"
            value={form.ubicacion}
            onChange={handleChange}
          />

          <input
            className="form-input"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
          />

          {form.tipo === "trabajador" && (
            <>
              <textarea
                className="form-input"
                name="descripcion"
                placeholder="Descripción"
                value={form.descripcion}
                onChange={handleChange}
              />

              <input
                className="form-input"
                name="tarifa_minima"
                placeholder="Tarifa mínima"
                type="number"
                value={form.tarifa_minima}
                onChange={handleChange}
              />

              <input
                className="form-input"
                name="tarifa_maxima"
                placeholder="Tarifa máxima"
                type="number"
                value={form.tarifa_maxima}
                onChange={handleChange}
              />

              <input
                className="form-input"
                name="disponibilidad"
                placeholder="Disponibilidad"
                value={form.disponibilidad}
                onChange={handleChange}
              />

              <div className="checkbox-group">
                <label className="checkbox-label">Servicios ofrecidos:</label>
                {allService?.map((servicio) => (
                  <div key={servicio.id} className="checkbox-item">
                    <label>
                      <input
                        type="checkbox"
                        value={servicio.id}
                        checked={form.servicioIds.includes(
                          servicio.id.toString()
                        )}
                        onChange={(e) => {
                          const id = e.target.value;
                          setForm((prevForm) => {
                            const alreadySelected =
                              prevForm.servicioIds.includes(id);
                            return {
                              ...prevForm,
                              servicioIds: alreadySelected
                                ? prevForm.servicioIds.filter(
                                  (sId) => sId !== id
                                )
                                : [...prevForm.servicioIds, id],
                            };
                          });
                        }}
                      />
                      {servicio.nombre}
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}

          <button className="form-button" type="submit">
            Registrar
          </button>

          <Link to="/login" className="form-button link-button">
            Ya tengo una cuenta
          </Link>
        </form>
      </div>

      {/* Columna derecha con imagen y texto */}
      <div className="auth-right">
        <div className="welcome-text">
          <h2>Bienvenido a Nuestra Plataforma</h2>
          <p>
            Conecta con profesionales y encuentra el servicio que necesitas,
            rápido y seguro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
