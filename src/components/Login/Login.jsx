import { useState, useContext } from 'react'
import { useNavigate } from 'react-router' 
import { setToken } from '../../utils/auth'
import { getUserFromToken } from '../../utils/auth'
import { UserContext } from '../../contexts/UserContext'
import { login } from '../../services/userService'; 



export default function Login() {

    const { setUser } = useContext(UserContext)

    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    })

    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await login(formData)
            setToken(data.token)

            setUser(getUserFromToken())

            navigate('/profiles/index')
        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
        }
    }

    const handleChange = (e) => {
        setError('')
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <section>
            <h1>Welcome back!</h1>
            <p>♥️ Log in ♥️</p>
            <form onSubmit={handleSubmit}>

            <div className="form-control">
          <label htmlFor="identifier">Username or email</label>
          <input 
            type="text"
            name="identifier" 
            id="identifier"
            placeholder="Enter your username or email address"
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            name="password" 
            id="password"
            placeholder="Enter a password"
            required
            onChange={handleChange}
          />
        </div>


        { error && <p className='error-block'>{error}</p>}

        <button disabled={formData.identifier === '' || formData.password === ''} type="submit">Enter Toonder</button>

            </form>

        </section>
    )
}
