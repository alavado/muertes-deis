import React from 'react'
import moment from 'moment/min/moment-with-locales'
import './TituloMapa.css'

const TituloMapa = ({ desfase }) => {
  return (
    <div className="TituloMapa">
      {moment('05/2020', 'MM/YYYY').add(desfase, 'months').format('MMMM YYYY')}
    </div>
  )
}

export default TituloMapa
