import demograficosComunas from '../../data/demografia/comunas.json'

const seleccionar = 'comuna/seleccionar'
const seCargaronLosDatos = 'comuna/seCargaronLosDatos'

const defaultState = {
  codigoComuna: 13101,
  nombreComuna: demograficosComunas.find(r => Number(r.codigo) === 13101).nombre,
  datos: demograficosComunas.reduce((prev, c) => ({ ...prev, [Number(c.codigo)]: [] }), {})
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
    case seCargaronLosDatos:
      return {
        ...state,
        datos: action.payload
      }
    default: {
      return state
    }
  }
}

export const comunaSeleccionada = codigoComuna => {
  return { type: seleccionar, payload: codigoComuna }
}

export const datosCargados = datos =>  {
  return { type: seCargaronLosDatos, payload: datos }
}