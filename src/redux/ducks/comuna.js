import demograficosComunas from '../../data/demografia/comunas.json'

const seleccionar = 'comuna/seleccionar'

const defaultState = {
  codigoComuna: 13101,
  nombreComuna: demograficosComunas.find(r => Number(r.codigo) === 13101).nombre
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case seleccionar:
      const codigoComuna = action.payload
      return {
        ...state,
        codigoComuna,
        nombreComuna: demograficosComunas.find(r => r.codigo === codigoComuna).nombre
      }
    default: {
      return state
    }
  }
}

export function comunaSeleccionada(codigoComuna) {
  return { type: seleccionar, payload: codigoComuna }
}
