import React, { useState, useEffect } from 'react'
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl'
import axios from 'axios'
import { procesarDatos } from '../../helpers/preprocesamiento'
import { easeCubic } from 'd3-ease'
import CapaComunas from './CapaComunas'
import CodigoColor from './CodigoColor'
import mapStyle from './mapStyle.json'
import './Mapa.css'
import { datosCargados } from '../../redux/ducks/comuna'
import { useDispatch } from 'react-redux'

const url = 'https://raw.githubusercontent.com/jorgeperezrojas/covid19-data/master/csv/muertes_deis/muertes_deis_rm.csv'

const Mapa = ({ desfase }) => {

  const dispatch = useDispatch()

  const [vp, setVp] = useState({
    width: '100%',
    height: 'calc(100vh -2em)',
    bearing: 0.8438348482250375,
    pitch: 8.966012003230043,
    zoom: 8,
    latitude: -33.63,
    longitude: -70.75,
    altitude: 1.5,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: easeCubic
  })

  useEffect(() => {
    axios
      .get(url)
      .then(data => dispatch(datosCargados(procesarDatos(data))))
  }, [])

  const cambioEnElViewport = vp => {
    setVp({
      ...vp,
      width: '100%',
      height: 'calc(100vh -2em)'
    })
  }
  
  return (
    <div className="Mapa">
      <CodigoColor />
      <ReactMapGL
        {...vp}
        mapStyle={mapStyle}
        onViewportChange={cambioEnElViewport}
      >
        <CapaComunas desfase={desfase} />
      </ReactMapGL>
    </div>
  )
}

export default Mapa
