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
    const codigoComuna = Number(comuna.codigo)
    if (!diccionarioComunas[codigoComuna]) {
      diccionarioComunas[codigoComuna] = []
    }
    diccionarioComunas[codigoComuna] = [
      ...datos.map(d => isNaN(d) ? 0 : (Number(d) * 1000 / Number(comuna.poblacion))),
      ...diccionarioComunas[codigoComuna]
    ]
  })
  const valores = Object.keys(diccionarioComunas).reduce((prev, x) => [...prev, ...diccionarioComunas[x]], [])
  console.log(valores.sort()[valores.length/2])
  return diccionarioComunas
}