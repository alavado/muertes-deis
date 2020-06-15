import React from 'react'
import './PopupComuna.css'
import { Popup } from 'react-map-gl'

const PopupComuna = props => {

  if (!props.mostrar) {
     return null
  }

  return (
    <Popup {...props}>
      <div className="PopupComuna">
        {props.valor}
      </div>
    </Popup>
  )
}

export default PopupComuna
