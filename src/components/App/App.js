import React from 'react'
import './App.css'
import Header from '../Header'
import Mapa from '../Mapa'
import Sidebar from '../Sidebar'

const url = 'https://raw.githubusercontent.com/jorgeperezrojas/covid19-data/master/csv/muertes_deis/muertes_deis_rm.csv'

const App = () => {

  return (
    <div className="App">
      <Header />
      <div className="App__principal">
        <Sidebar />
        <Mapa />
      </div>
    </div>
  )
}

export default App
