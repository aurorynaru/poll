import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Divider } from 'primereact/divider'
const Navbar = () => {
    const navigate = useNavigate()
    const handleNavigation = () => {
        navigate('/')
    }

    return (
        <nav className='fixed top-0 left-0 right-0 z-1 bg-auto px-5 shadow-5 bg-primary'>
            <h1
                style={{ display: 'inline-block' }}
                className='text-primary font-medium cursor-pointer border border-1 rounded border-round-lg p-1 bg-white navBar'
                onClick={handleNavigation}
            >
                {` Random polls `}
                <span>
                    <i
                        className='pi pi-bolt '
                        style={{ color: 'purple', fontSize: '20px' }}
                    ></i>
                </span>
            </h1>
        </nav>
    )
}

export default Navbar
