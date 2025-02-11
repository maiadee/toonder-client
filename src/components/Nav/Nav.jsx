import { useState, useContext } from 'react'
import { NavLink } from 'react-router'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import styles from './NavMenu.module.css'
import { UserContext } from '../../contexts/UserContext'
import { removeToken } from '../../utils/auth'

export default function NavMenu() {
    
    const { user, setUser } = useContext(UserContext)
  
  
    const [show, setShow] = useState(false)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
  
    const signOut = () => {
      
      removeToken()
     
      setUser(null)
    }




}