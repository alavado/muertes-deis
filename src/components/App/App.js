import React from 'react'
import './App.css'
import Header from '../Header'
import Mapa from '../Mapa'
import Sidebar from '../Sidebar'

const App = () => {

  return (
    <div className="App">
      <Header />
      <div className="App__principal">
        <Sidebar />
        <Mapa desfase={0} />
        <Mapa desfase={12} />
      </div>
    </div>
  )
}

export default App
