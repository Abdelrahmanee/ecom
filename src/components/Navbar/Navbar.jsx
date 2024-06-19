import React, { useContext } from 'react'
import Style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'

export default function Navbar() {
    const { userToken, setUserToken } = useContext(UserContext)
    const { count , setCount } = useContext(CartContext)
    const navigate = useNavigate()
    function Logout() {
        localStorage.removeItem('userToken')
        localStorage.removeItem('numberOfCartItems')
        setUserToken(null)
        navigate('/login')
    }

    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"><img src={Logo} alt="fresh market" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {userToken !== null ? <>

                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Brands">Brands</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/Categories">Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/WishList">WishList</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Profile">Profile</Link>
                        </li>


                    </> : ''}


                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                    {userToken !== null ? <>
                        <li className="nav-item d-flex align-items-center">
                            <i className='fab fa-facebook mx-2'></i>
                            <i className='fab fa-twitter mx-2'></i>
                            <i className='fab fa-instagram mx-2'></i>
                            <i className='fab fa-youtube mx-2'></i>
                            <i className='fab fa-tiktok mx-2'></i>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link mx-0 px-1 text-center CartCont position-relative"
                                to="cart"
                            >
                                <i className="fa-solid fa-cart-shopping fs-4"></i>

                                <div className="cartDiv text-center text-white">
                                    {localStorage.getItem('numberOfCartItems')}
                                </div>
                            </Link>
                        </li>
                        <li className=' nav-item my-lg-auto'></li>
                        <li className="nav-item">

                            <span onClick={() => Logout()} className="nav-link cursor-pointer" >Logout</span>
                        </li>
                    </> :
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Login">Login</Link>
                            </li>
                        </>}

                </ul>
            </div>
        </div>
    </nav >
}
