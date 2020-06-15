import demograficosComunas from '../../data/demografia/comunas.json'

const seCargaronLosDatos = 'comuna/seCargaronLosDatos'

const defaultState = {
  datos: demograficosComunas.reduce((prev, c) => ({ ...prev, [Number(c.codigo)]: [] }), {})
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
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

export const datosCargados = datos =>  {
  return { type: seCargaronLosDatos, payload: datos }
}