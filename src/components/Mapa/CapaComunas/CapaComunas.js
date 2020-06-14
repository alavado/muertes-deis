import React, { useMemo } from 'react'
import { Source, Layer } from 'react-map-gl'
import geoJSONComunas from '../../../data/geojsons/comunas.json'
import { useSelector } from 'react-redux'
import './CapaComunas.css'

const CapaComunas = ({ desfase }) => {

  const { datos } = useSelector(state => state.comuna)
  const { colores, valores: valoresEscala } = useSelector(state => state.escala)

  const geoJSONProcesado = useMemo(() => {
    return {
      ...geoJSONComunas,
      features: geoJSONComunas
        .features
        .filter(f => f.properties.NOM_REG === 'Región Metropolitana de Santiago')
        .map(f => ({
          ...f,
          properties: {
            ...f.properties,
            x: datos[Number(f.properties.COD_COMUNA)].slice(-8 - desfase)[0]
          }
        }))
    }
  }, [datos])

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
