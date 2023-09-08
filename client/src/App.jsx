import { useState } from 'react'
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
    useNavigate
} from 'react-router-dom'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import CreatePoll from './pages/CreatePoll'

import Home from './pages/Home'
import VotePage from './pages/VotePage'

function App() {
    return (
        <div className='min-h-screen transition-all transition-duration-200 layout-content surface-ground w-full flex align-items-center justify-content-center w-full px-4'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/create/' element={<CreatePoll />} />
                    <Route path='/poll/' element={<VotePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
