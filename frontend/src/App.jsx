import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Cars from './pages/Cars';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cars' element={<Cars/>}/>
      </Routes>
    </Router>
  );
}

export default App;
