import demograficosComunas from '../data/demografia/comunas.json'

export const procesarDatos = datos => {
  const filas = datos.data.split('\n')
  let diccionarioComunas = {}
  filas.slice(1).forEach(fila => {
    const [nombre, _, ...datos] = fila.trim().split(',')
    const comuna = demograficosComunas.find(c => c.nombre.localeCompare(nombre) === 0)
    if (!comuna) {
      return
    }
    const codigoComuna = comuna.codigo
    if (!diccionarioComunas[codigoComuna]) {
      diccionarioComunas[codigoComuna] = []
    }
    diccionarioComunas[codigoComuna] = [
      ...datos.map(d => isNaN(d) ? 0 : Number(d)),
      ...diccionarioComunas[codigoComuna]
    ]
  })
  return diccionarioComunas
}