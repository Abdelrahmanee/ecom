import React, { useContext, useEffect } from 'react'
import Style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { Offline } from 'react-detect-offline'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'


export default function Layout() {

    const { setUserData, setUserEmail, setUserToken } = useContext(UserContext)
    const { count ,setCount } = useContext(CartContext)

    useEffect(() => {

        if (localStorage.getItem('userToken') !== null) {

            setUserToken(localStorage.getItem('userToken'))
            setUserData(JSON.parse(localStorage.getItem('userInfo')))
            setCount(localStorage.getItem('numberOfCartItems'))

        }
        if ( setUserEmail &&localStorage.getItem('userEmail') !== null) {

            setUserEmail(localStorage.getItem('userEmail'))
        }

    }, [])
    return <>
        <Navbar />
        <div className="container mx-auto ">
            <Outlet></Outlet>
            <Offline >
                <div className="network">
                    <i className='fas fa-wifi'></i> you are offline
                </div>
            </Offline>
        </div>
        <Footer />
    </>

}
