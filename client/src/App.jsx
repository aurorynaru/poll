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
import CreatePoll from './components/CreatePoll'

import Home from './components/Home'

function App() {
    return (
        <div className='min-h-screen transition-all transition-duration-200 layout-content surface-ground w-full flex align-items-center justify-content-center w-full px-4'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/create/' element={<CreatePoll />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
