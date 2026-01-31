import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

const Home = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            fetch('http://localhost:3000/api/home', {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('failed');
                }
                return response.json();
            })
            .then(data => {
                if (data.status != 200) {
                    setUser(null);
                    navigate('/login');
                    throw new Error(data.message);
                }
                setUser(data.user);
            })
            .catch(error => console.log(error));
        }
        if (user) {
            setTimeout(() => {
                checkAuth();
            }, 30*1000);
            return;
        }
        checkAuth();
        const timer = setTimeout(() => {
            checkAuth();
        }, 30*1000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div>
            <h1>Home Page</h1>
            <h2>{user?.name}</h2>
            <h2>{user?.email}</h2>
        </div>
    )
}

export default Home
