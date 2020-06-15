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
import { useDispatch, useSelector } from 'react-redux'
import PopupComuna from './PopupComuna'

const url = 'https://raw.githubusercontent.com/jorgeperezrojas/covid19-data/master/csv/muertes_deis/muertes_deis_rm.csv'

const Mapa = ({ numero: numeroMapa }) => {

  const dispatch = useDispatch()
  const { desfases } = useSelector(state => state.mapas)
  const [popup, setPopup] = useState({
    latitude: -33.63,
    longitude: -70.75,
    mostrar: false
  })

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
  }, [dispatch])

  const cambioEnElViewport = vp => {
    setVp({
      ...vp,
      width: '100%',
      height: 'calc(100vh -2em)'
    })
  }

  const moverPopup = e => {
    setPopup({
      ...popup,
      latitude: e.lngLat[1],
      longitude: e.lngLat[0],
      valor: e.features && e.features[0] ? e.features[0].properties.x : -1,
      mostrar: !popup.mostrar
    })
  }

  return (
    <div className="Mapa">
      <CodigoColor numeroMapa={numeroMapa} />
      <ReactMapGL
        {...vp}
        mapStyle={mapStyle}
        onViewportChange={cambioEnElViewport}
        onClick={moverPopup}
      >
        <PopupComuna {...popup} numeroMapa={numeroMapa} />
        <CapaComunas desfase={desfases[numeroMapa]} />
      </ReactMapGL>
    </div>
  )
}

export default Mapa
