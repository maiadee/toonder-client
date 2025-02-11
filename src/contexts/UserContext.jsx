import { useState, useContext } from 'react'
import { NavLink } from 'react-router'
import Button from 'react-bootstrap/Button'
import { UserContext } from '../../contexts/UserContext'
import { removeToken } from '../../utils/auth'

export default function NavMenu() {
  
    const { user, setUser } = useContext(UserContext)

}