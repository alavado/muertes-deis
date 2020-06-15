import React, { useState, useEffect } from 'react'
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl'
import axios from 'axios'
import { procesarDatos } from '../../helpers/preprocesamiento'
import { easeCubic } from 'd3-ease'
import CapaComunas from './CapaComunas'
import CodigoColor from './CodigoColor'
import TituloMapa from './TituloMapa'
import mapStyle from './mapStyle.json'
import './Mapa.css'
import { datosCargados } from '../../redux/ducks/datos'
import { useDispatch, useSelector } from 'react-redux'
import PopupComuna from './PopupComuna'
import { fijarViewport } from '../../redux/ducks/mapas'

const url = 'https://raw.githubusercontent.com/jorgeperezrojas/covid19-data/master/csv/muertes_deis/muertes_deis_rm.csv'

const Mapa = ({ numero: numeroMapa }) => {

  const dispatch = useDispatch()
  const { desfases, viewport } = useSelector(state => state.mapas)
  const desfase = desfases[numeroMapa]
  const [popup, setPopup] = useState({
    latitude: -33.63,
    longitude: -70.75,
    mostrar: false
  })

  const [vp, setVp] = useState({
    ...viewport,
    width: '100%',
    height: '100%',
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: easeCubic
  })

  useEffect(() => {
    axios
      .get(url)
      .then(data => dispatch(datosCargados(procesarDatos(data))))
  }, [dispatch])

  useEffect(() => {
    setVp(vp => ({...vp, ...viewport}))
  }, [setVp, viewport])

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
      <TituloMapa desfase={desfase} />
      <CodigoColor numeroMapa={numeroMapa} />
      <ReactMapGL
        {...vp}
        mapStyle={mapStyle}
        onViewportChange={vp => dispatch(fijarViewport(vp))}
        onClick={moverPopup}
        zoo
      >
        <PopupComuna {...popup} numeroMapa={numeroMapa} />
        <CapaComunas desfase={desfase} />
      </ReactMapGL>
    </div>
  )
}

export default Mapa
