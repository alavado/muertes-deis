const cambiar = 'escala/cambiar'

const defaultState = {
  colores: [
    '#FFFFCE',
    '#C8E8B6',
    '#83CCBB',
    '#48B6C2',
    '#3180B6',
    '#273891'
  ],
  valores: [0, 0.1, 0.25, 0.5, .75, 1]
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case cambiar:
      return {
        ...state,
        colores: action.payload
      }
    default: {
      return state
    }
  }
}
