import React, { useState, useEffect } from "react";
import { registerUser, getAllService } from "../../redux/action/usersAction.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './register.css';

const Register = () => {
  const dispatch = useDispatch();

  const allService = useSelector((state) => state.userState.servicios);
  const [successMessage, setSuccessMessage] = useState("");
  const initialForm = {
    email: "",
    password: "",
    nombre: "",
    tipo: "cliente",
    foto_perfil: "",
    ubicacion: "",
    telefono: "",
    descripcion: "",
    tarifa_minima: "",
    tarifa_maxima: "",
    disponibilidad: "",
    servicioIds: []
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getAllService()); // Asegura que `allService` esté cargado desde Redux
  }, [dispatch]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await dispatch(registerUser(form));

    // Si la acción fue exitosa (esto depende de tu lógica en Redux)
    if (!response?.error) {
      setSuccessMessage("✅ Registrado con éxito");
      setForm(initialForm);
      setTimeout(() => setSuccessMessage(""), 4000); // Quita el mensaje después de 4 seg
    } else {
      alert("❌ Hubo un error al registrarse: " + response.error);
    }
  };

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setForm((prev) => ({ ...prev, foto_perfil: file }));
  }
};

  const handleServicioChange = (e) => {
    const ids = e.target.value.split(",").map((id) => id.trim());
    setForm({ ...form, servicioIds: ids });
  };



  return (
    <div className="register-wrapper">
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
          name="foto_perfil"
          accept="image/*"
          onChange={handleFileChange}
        />
        {form.foto_perfil && (
          <img src={form.foto_perfil} alt="Vista previa" className="preview-image" />
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
                      checked={form.servicioIds.includes(servicio.id.toString())}
                      onChange={(e) => {
                        const id = e.target.value;
                        setForm((prevForm) => {
                          const alreadySelected = prevForm.servicioIds.includes(id);
                          return {
                            ...prevForm,
                            servicioIds: alreadySelected
                              ? prevForm.servicioIds.filter((sId) => sId !== id)
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
  );
};

export default Register;
