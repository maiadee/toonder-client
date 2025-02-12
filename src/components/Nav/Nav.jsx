import { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'  
import { UserContext } from '../../contexts/UserContext'
import { removeToken } from '../../utils/auth'

export default function NavMenu() {
    const { user, setUser } = useContext(UserContext)

    const [menuOpen, setMenuOpen] = useState(false)


    const signOut = () => {
        removeToken()
        setUser(null)
        setMenuOpen(false)
    }

    return (
        <nav>
    
                <div>
                    <nav>
                        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                        {user ? (
                            <>
                                <NavLink to="/profiles/matches" onClick={() => setMenuOpen(false)}>View Matches</NavLink>
                                <NavLink to="/profiles/:id/update" onClick={() => setMenuOpen(false)}>Update Profile</NavLink>
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
           
        </nav>
    )
}
