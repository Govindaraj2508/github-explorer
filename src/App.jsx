import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import AppNavBar from './common/AppNavBar'
import Home from './components/HomeComponent/Home'


function App() {

  return (
    <>
    <AppNavBar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
