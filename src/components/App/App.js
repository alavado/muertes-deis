import React from 'react'
import './App.css'
import Header from '../Header'
import Mapa from '../Mapa'

const url = 'https://raw.githubusercontent.com/jorgeperezrojas/covid19-data/master/csv/muertes_deis/muertes_deis_rm.csv'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Mapa />
    </div>
  )
}

export default App
