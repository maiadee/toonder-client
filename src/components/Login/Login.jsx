import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { setToken, getUserFromToken } from '../../utils/auth';
import { UserContext } from '../../contexts/UserContext';
import { login } from '../../services/userService';
import styles from './login.module.css';

export default function Login() {
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(formData);
            setToken(data.token);
            setUser(getUserFromToken());
            navigate('/profiles/index');
        } catch (error) {
            setErrors(error.response?.data?.errors || { general: "Invalid login credentials" });
        }
    };

    const handleChange = (e) => {
        setErrors({ ...errors, [e.target.name]: '' });
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
   

        <section className={styles.container}>
            <h1>💕 Welcome Back 💕</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles['form-group']}>
                    <label htmlFor="identifier">Username or Email</label>
                    <input
                        type="text"
                        name="identifier"
                        id="identifier"
                        placeholder="Enter your username or email"
                        required
                        onChange={handleChange}
                    />
                    {errors.identifier && <p className='error-message'>{errors.identifier}</p>}
                </div>

                <div className={styles['form-group']}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        required
                        onChange={handleChange}
                    />
                    {errors.password && <p className='error-message'>{errors.password}</p>}
                </div>

                {errors.general && <p className='error-message'>{errors.general}</p>}

                <button className={styles.button} disabled={formData.identifier === '' || formData.password === ''} type="submit">
                    Log In
                </button>
            </form>
        </section>
    );
}
