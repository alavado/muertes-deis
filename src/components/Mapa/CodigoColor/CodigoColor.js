import React from 'react'
import './CodigoColor.css'
import { useSelector, useDispatch } from 'react-redux'
import { reducirDesfase, aumentarDesfase } from '../../../redux/ducks/mapas'

const CodigoColor = ({ numeroMapa }) => {

  const { colores, valores } = useSelector(state => state.escala)
  const dispatch = useDispatch()

  return (
    <div className="CodigoColor">
      <div className="CodigoColor__fecha">
        <button onClick={() => dispatch(reducirDesfase(numeroMapa))}>-</button>
        Junio 2020
        <button onClick={() => dispatch(aumentarDesfase(numeroMapa))}>+</button>
      </div>
      {colores.map((color, i) => (
        <div className="CodigoColor__color" key={`codigo-color-${color}`}>
          <div className="CodigoColor__cuadrito" style={{ backgroundColor: color }} />
          <div className="CodigoColor__valor">{valores[i]}</div>
        </div>
      ))}
    </div>
  )
}

export default CodigoColor
