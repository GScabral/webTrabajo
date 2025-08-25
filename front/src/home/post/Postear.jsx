import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from "../../redux/action/postAction";
import "./Postear.css";

const PostForm = ({ userId }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        titulo: '',
        contenido: '',
        imagen_file: null,       // archivo real
        imagen_preview: ''       // para mostrar en <img />
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm((prev) => ({
                    ...prev,
                    imagen_file: file,           // archivo real para el backend
                    imagen_preview: reader.result // base64 solo para la vista previa
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("titulo", form.titulo);
        formData.append("contenido", form.contenido);
        formData.append("user_id", userId);
        if (form.imagen_file) {
            formData.append("imagen", form.imagen_file); // este nombre debe coincidir con el backend
        }

        dispatch(createPost(formData));
        setForm({ titulo: '', contenido: '', imagen_file: null, imagen_preview: '' });
    };

    return (
        <div className="post-wrapper">
            <form className="post-form" onSubmit={handleSubmit}>
                <h2 className="post-title">Crear Post</h2>

                <input
                    className="post-input"
                    name="titulo"
                    placeholder="Título"
                    value={form.titulo}
                    onChange={handleChange}
                    required
                />

                <textarea
                    className="post-textarea"
                    name="contenido"
                    placeholder="Contenido"
                    value={form.contenido}
                    onChange={handleChange}
                    required
                />

                <input
                    className="post-input"
                    type="file"
                    name="imagen_url"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {form.imagen_preview && (
                    <img src={form.imagen_preview} alt="Vista previa" className="post-preview" />
                )}

                <button className="post-button" type="submit">Publicar</button>
            </form>
        </div>
    );
};

export default PostForm;
