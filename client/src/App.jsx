import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import CreatePoll from './pages/CreatePoll'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import VotePage from './pages/VotePage'

function App() {
    return (
        <BrowserRouter>
            <div className='min-h-screen transition-all transition-duration-200 layout-content surface-ground w-full flex align-items-center justify-content-center w-full px-4'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/create/' element={<CreatePoll />} />
                    <Route path='/poll/:code' element={<VotePage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
