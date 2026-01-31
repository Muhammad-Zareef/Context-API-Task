import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function handleSignup(e) {
        e.preventDefault();
        fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Signup failed');
            }
            return response.json();
        })
        .then(data => {
            if (data.status != 200) {
                throw new Error(data.message);
            }
            console.log('Signup success:', data);
            alert(data.message);
            setName("");
            setEmail("");
            setPassword("");
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        })
        .catch(error => alert(error));
    }
    return (
        <div>
            <form onSubmit={handleSignup}>
                <h1>Sign Up</h1>
                <input type="text" value={name} onChange={e => setName(e.target.value)} name="" id="" placeholder='Name' required />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="" id="" placeholder='Email' required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="" id="" placeholder='Password' required />    
                <button type='submit'>Sign Up</button>
                <p>Already Have Account? <NavLink to="/login">Login</NavLink></p>
            </form>
        </div>
    )
}

export default Signup
