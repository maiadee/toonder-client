import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { removeToken } from '../../utils/auth';
import styles from './nav.module.css';

export default function NavMenu() {
    const { user, setUser } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const signOut = () => {
        removeToken();
        setUser(null);
        setMenuOpen(false);
        navigate('/');
    };

    console.log(user);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>


                <div className={styles.leftLinks}>
                    <NavLink to="/" className={styles.link} onClick={() => setMenuOpen(false)}>Home</NavLink>
                    {user && (
                        <>
                            <NavLink to="/profiles/index" className={styles.link} onClick={() => setMenuOpen(false)}>Match Now</NavLink>
                            <NavLink to="/profiles/matches" className={styles.link} onClick={() => setMenuOpen(false)}>View Matches</NavLink>
                        </>
                    )}
                </div>


                <img
                    src="/images/logo.png"
                    alt="Toonder Logo"
                    className={styles.logo}
                    onClick={() => navigate("/")}
                />

                <div className={styles.rightLinks}>
                    {user ? (
                        <>
                            <NavLink to={`/profiles/${user.profile}/update`} className={styles.link} onClick={() => setMenuOpen(false)}>Update Profile</NavLink>

                        </>
                    ) : (
                        <>
                            <NavLink to="/signup" className={styles.link} onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
                            <NavLink to="/login" className={styles.link} onClick={() => setMenuOpen(false)}>Log In</NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
