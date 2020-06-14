import React, { useMemo } from 'react'
import { Source, Layer } from 'react-map-gl'
import geoJSONDistritos from '../../../data/geojsons/comunas.json'
import { useSelector } from 'react-redux'
import './CapaComunas.css'

const CapaComunas = () => {

  const { codigoComuna } = useSelector(state => state.comuna)
  const { colores, valores: valoresEscala } = useSelector(state => state.escala)

  const geoJSONProcesado = useMemo(() => {
    return {
      ...geoJSONDistritos,
      features: geoJSONDistritos
        .features
        .filter(f => f.properties.REGION === 13)
        .map(f => ({
          ...f,
          properties: {
            ...f.properties,
            x: Math.random()
          }
        }))
    }
  }, [])

  return (
    <Source
      id="capa-datos-distritos"
      type="geojson"
      data={geoJSONProcesado}
    >
      <Layer
        id="distritos-fill"
        type="fill"
        paint={{
          "fill-opacity": 1,
          "fill-color": {
            property: 'x',
            stops: colores.map((color, i) => [valoresEscala[i], color])
          }
        }}
      />
      <Layer
        id="distritos-line"
        type="line"
        paint={{
          'line-color': 'rgba(255, 255, 255, 1)',
          'line-width': .5
        }}
      />
    </Source>
  )
}

export default CapaComunas
