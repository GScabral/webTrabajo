import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../redux/action/usersAction';
import { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nueva contraseña"
                required
            />
            <button type="submit">Restablecer contraseña</button>
        </form>
    );
};


export default ResetPasswordForm;