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
    };

    console.log(user)

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <img 
                    src="/images/logo.png" 
                    alt="Toonder Logo" 
                    className={styles.logo} 
                    onClick={() => navigate("/")} 
                />

                <nav className={styles.navLinks}>
                    <NavLink to="/" className={styles.link} onClick={() => setMenuOpen(false)}>Home</NavLink>
                    {user ? (
                        <>
                    
                            <NavLink to="/profiles/matches" className={styles.link} onClick={() => setMenuOpen(false)}>View Matches</NavLink>
                            <NavLink to={`/profiles/${user.profile}/update`} className={styles.link} onClick={() => setMenuOpen(false)}>Update Profile</NavLink>
                            <button onClick={signOut} className={styles.signOutButton}>Sign Out</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/signup" className={styles.link} onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
                            <NavLink to="/login" className={styles.link} onClick={() => setMenuOpen(false)}>Log In</NavLink>
                        </>
                    )}
                </nav>
            </div>
        </nav>
    );
}
