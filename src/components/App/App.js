import React from 'react'
import './App.css'
import Header from '../Header'
import Mapa from '../Mapa'
import Sidebar from '../Sidebar'
import { useSelector } from 'react-redux'

const App = () => {

  const { numero } = useSelector(state => state.mapas)

  return (
    <div className="App">
      <Header />
      <div className="App__principal">
        <Sidebar />
        {Array.from(Array(numero).keys()).map(n => <Mapa key={`mapa-${n}`} numero={n} />)}
      </div>
    </div>
  )
}

export default App
