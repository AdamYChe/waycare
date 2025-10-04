import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </>
  )
}

export default App
