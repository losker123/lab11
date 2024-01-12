import React, { useEffect, useState } from 'react';
import '../styles/Header.css'
import MainPage from '../pages/MainPage';
import Installations from '../pages/Installations';
import Questions from '../pages/Questions';
import Systems from '../pages/Systems';
import User from '../pages/UserPage';
import Partners from '../pages/Partners';
import Reviews from '../pages/Reviews'
import Login from '../pages/LoginPage';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUsers } from "../redux/actions";
import { jwtDecode } from "jwt-decode";

const Header = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.user);
    let [isAuthenticated,setisAuthenticated] = useState() ;
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                setisAuthenticated(true);
                const decodedToken = jwtDecode(token);

                if (decodedToken) {
                    dispatch(
                        setUsers({
                            name: decodedToken.name,
                            email: decodedToken.email,
                            bio: decodedToken.bio,
                            location: decodedToken.location,
                        })
                    );
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                dispatch(clearUser());
            }
        }
    }, [dispatch]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setisAuthenticated(false);
        dispatch(clearUser());
    };

    return (
        <>
            <Router>
                <div className="header-container">
                    <Link to="/">
                        <h1 className="header-title">IsakSystem</h1>
                    </Link>
                    <ul className="nav-list">
                        <li>
                            <Link to="/Reviews">Отзывы</Link>
                        </li>
                        <li>
                            <Link to="/Partners">Партнеры и Сертификаты</Link>
                        </li>

                        <li>
                            <Link to="/Questions">Часто задаваемые вопросы</Link>
                        </li>
                        <li>
                            <Link to="/Systems">Системы</Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/Installations">Установки и обслуживания </Link>
                                </li>
                                <li>
                                    <Link to="/User"> Профиль </Link>
                                </li>
                                <li>
                                    <Link to="/Login" onClick={handleLogout}>
                                        Выйти
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/Login"> Войти </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/Reviews" element={<Reviews />} />
                    <Route path="/Partners" element={<Partners />} />
                    <Route path="/Questions" element={<Questions />} />
                    <Route path="/Systems" element={<Systems />} />
                    {isAuthenticated && (
                        <>
                            <Route path="/User" element={<User />} />
                            <Route path="/Installations" element={<Installations />} />
                        </>
                    )}
                    <Route
                        path="/Login"
                        element={
                            isAuthenticated ? <Navigate to="/" /> : <Login />
                        }
                    />
                </Routes>
            </Router>

        </>
    )
}
export default Header;

