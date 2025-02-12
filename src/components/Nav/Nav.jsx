import { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'  
import { UserContext } from '../../contexts/UserContext'
import { removeToken } from '../../utils/auth'

export default function NavMenu() {
    const { user, setUser } = useContext(UserContext)

    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => setMenuOpen(!menuOpen)

    const signOut = () => {
        removeToken()
        setUser(null)
        setMenuOpen(false)
    }

    return (
        <nav>
            
            <button onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </button>


            {menuOpen && (
                <div>
                    <nav>
                        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                        {user ? (
                            <>
                                <NavLink to="/matches" onClick={() => setMenuOpen(false)}>View Matches</NavLink>
                                <NavLink to="/profile" onClick={() => setMenuOpen(false)}>Update Profile</NavLink>
                                <button onClick={signOut}>Sign Out</button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
                                <NavLink to="/login" onClick={() => setMenuOpen(false)}>Log In</NavLink>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </nav>
    )
}
