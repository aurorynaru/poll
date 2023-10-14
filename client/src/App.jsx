import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import CreatePoll from './pages/CreatePoll'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import VotePage from './pages/VotePage'
import { useSelector } from 'react-redux'

function App() {
    const isAuth = Boolean(useSelector((state) => state.token))
    const userId = useSelector((state) => state.id)
    console.log(userId)
    return (
        <BrowserRouter>
            <div className='min-h-screen transition-all transition-duration-200 layout-content surface-ground w-full flex align-items-center justify-content-center w-full px-4'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route
                        path='/create/'
                        element={isAuth ? <CreatePoll /> : <Home />}
                    />
                    <Route
                        path='/poll/:code'
                        element={isAuth ? <VotePage /> : <Home />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
