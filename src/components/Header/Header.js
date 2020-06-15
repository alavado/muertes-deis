import React from 'react'
import './Header.css'
import { useDispatch } from 'react-redux'
import { agregarMapa } from '../../redux/ducks/mapas'

const Header = () => {

  const dispatch = useDispatch()

  return (
    <div className="Header">
      <div className="Header__titulo">Muertes totales por 100.000 habitantes</div>
      <button onClick={() => dispatch(agregarMapa())}>agregar</button>
    </div>
  )
}

export default Header
