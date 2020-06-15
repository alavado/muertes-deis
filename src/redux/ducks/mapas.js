import { easeCubic } from "d3-ease"
import { FlyToInterpolator } from "react-map-gl"

const agregar = 'mapas/agregar'
const desfasar = 'mapas/desfasar'
const fijarVP = 'mapas/fijarVP'

const defaultState = {
  numero: 2,
  desfases: [0, -12],
  viewport: {
    bearing: 0.8438348482250375,
    pitch: 8.966012003230043,
    zoom: 8,
    latitude: -33.63,
    longitude: -70.75,
    altitude: 1.5
  }
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case agregar:
      return {
        ...state,
        numero: state.numero + 1,
        desfases: [...state.desfases, state.desfases.slice(-1)[0] - 12]
      }
    case desfasar: {
      const { i, desfase } = action.payload
      console.log(action.payload)
      return {
        ...state,
        desfases: [
          ...state.desfases.slice(0, i),
          Math.min(0, state.desfases[i] + desfase),
          ...state.desfases.slice(i + 1)
        ]
      }
    }
    case fijarVP: {
      const { bearing, pitch, zoom, latitude, longitude, altitude } = action.payload
      return {
        ...state,
        viewport: {
          bearing,
          pitch,
          zoom,
          latitude,
          longitude,
          altitude
        }
      }
    }
    default: {
      return state
    }
  }
}

export const agregarMapa = () => {
  return { type: agregar }
}

export const aumentarDesfase = numeroMapa => {
  return { type: desfasar, payload: { i: numeroMapa, desfase: 1 }}
}

export const reducirDesfase = numeroMapa => {
  return { type: desfasar, payload: { i: numeroMapa, desfase: -1 }}
}

export const fijarViewport = vp => {
  return { type: fijarVP, payload: vp }
}