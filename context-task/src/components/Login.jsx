import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { UserContext } from '../App';

const Signup = () => {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) return;

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
                throw new Error(data.message);
            }
            console.log('Login success:', data);
            setUser(data.user);
            navigate('/home');
        })
        .catch(error => console.log(error));

        const timer = setTimeout(() => {
            setUser(null);
            localStorage.clear();
        }, timeout);

        return () => clearTimeout(timer);
    }, []);
    async function handleLogin(e) {
        e.preventDefault();
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            if (data.status == 200) {
                console.log('Login success:', data);
                alert(data.message);
                setEmail("");
                setPassword("");
                setUser(data.user);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => alert("Invalid Credentials"));
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="" id="" placeholder='Email' required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="" id="" placeholder='Password' required />    
                <button type='submit'>Login</button>
                <p>Don't have account? <NavLink to="/signup">SignUp</NavLink></p>
            </form>
        </div>
    )
}

export default Signup
