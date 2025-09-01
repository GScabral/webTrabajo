import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../redux/action/usersAction';
import { useState } from 'react';
import "./ResetPasswordForm.css"

const ResetPasswordForm = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(email, token, newPassword));
    };

    return (
        <div className="reset-form-container">
            <form onSubmit={handleSubmit} className="reset-form">
                <h2>Restablecer contraseña</h2>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nueva contraseña"
                    required
                />
                <button type="submit">Restablecer</button>
            </form>
        </div>
    );
};


export default ResetPasswordForm;