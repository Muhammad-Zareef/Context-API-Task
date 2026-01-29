import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

const Signup = ({handleSignup}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            <form onSubmit={handleSignup}>
                <h1>Sign Up</h1>
                <input type="text" value={name} onChange={e => setName(e.target.value)} name="" id="" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="" id="" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="" id="" />    
                <button type='submit'>Sign Up</button>
                <p>Already Have Account? <NavLink to="/">SignIn</NavLink></p>
            </form>
        </div>
    )
}

export default Signup
