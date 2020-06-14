import React from 'react'
import demograficosComunas from '../../data/demografia/comunas.json'
import { useDispatch, useSelector } from 'react-redux'
import { comunaSeleccionada } from '../../redux/ducks/comuna'
import './Sidebar.css'

const Sidebar = () => {

  const { codigoComuna } = useSelector(state => state.comuna)
  const dispatch = useDispatch()

  return null

  return (
    <div className="Sidebar">
      <div>
      <h1 className="Sidebar__titulo">Parámetros de la visualización</h1>
      <div className="Sidebar__contenedor_parametro">
        <label className="Sidebar__label">Comuna</label>
        <select
          value={codigoComuna}
          onChange={e => dispatch(comunaSeleccionada(Number(e.target.value)))}
          className="Sidebar__selector"
        >
          {demograficosComunas.map(comuna => (
            <option
              key={`Sidebar-opcion-comuna-${comuna.codigo}`}
              className="Sidebar__opcion"
              value={comuna.codigo}
            >
              {comuna.nombr}
            </option>
          ))}
        </select>
      </div>
      </div>
      <div className="Sidebar__cita_perez">
        Jorge Pérez dice:
        Si van a usar los datos por favor consideren la nota técnica del DEIS, en particular que "... 2018 y 2019 se encuentran en el subproceso de Validación y el año en curso (2020) se encuentra en el subproceso de recolección de datos."
      </div>
    </div>
  )
}

export default Sidebar
