const agregar = 'mapas/agregar'
const desfasar = 'mapas/desfasar'

const defaultState = {
  numero: 1,
  desfases: [0]
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case agregar:
      return {
        ...state,
        numero: state.numero + 1,
        desfases: [...state.desfases, 0]
      }
    case desfasar: {
      const { i, desfase } = action.payload
      console.log(action.payload)
      return {
        ...state,
        desfases: [
          ...state.desfases.slice(0, i),
          state.desfases[i] + desfase,
          ...state.desfases.slice(i + 1)
        ]
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