import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { setToken } from '../../utils/auth';
import { getUserFromToken } from '../../utils/auth';
import { UserContext } from '../../contexts/UserContext';

    const [formData, setFormData] = useState ({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await signup(formData);
            setToken(data.token);
            setUser(getUserFromToken());
            navigate('/profiles/create');
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };

    const handleChange = (e) => {
        setErrors({ ...errors, [e.target.name]: '' });
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

                        id="email"
                        placeholder="Enter an email address"
                        required
                        onChange={handleChange}
                    />
                    { errors.email && <p className='error-message'>{errors.email}</p> }
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="username">Username</label>

                        id="username"
                        placeholder="Enter a username"
                        required
                        onChange={handleChange}
                    />
                    { errors.username && <p className='error-message'>{errors.username}</p> }
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="password">Password</label>

                        id="password"
                        placeholder="Enter a password"
                        required
                        onChange={handleChange}
                    />
                    { errors.password && <p className='error-message'>{errors.password}</p> }
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="confirmPassword">Confirm password</label>

                        id="confirmPassword"
                        placeholder="Re-type the password"
                        required
                        onChange={handleChange}
                    />
                    {(formData.password.length > 0 && formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword) &&
                        <p className='error-message'>Passwords do not match</p>
                    }
                </div>
                <button className={styles.button} disabled={formData.password === '' || formData.password !== formData.confirmPassword} type="submit">Submit</button>
            </form>
        </section>
    );
<
