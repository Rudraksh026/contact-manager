import { NavLink } from "react-router-dom"
import "./styles/Signup.css"
import { useState } from "react"
import { useAuth } from "../store/auth"
import { useNavigate } from "react-router-dom"
export const SignUp = () => {
    const {storeToken} = useAuth()
    const navigate = useNavigate()  
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://contact-manager-backend-na3k.onrender.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if(response.ok){
                const responseData = await response.json();
                storeToken(responseData.token)
                navigate("/contact")
            }
        } catch (error) {
            console.log(error.status);
        }
    }

    return <>
        <div className="signup-container">
    <form onSubmit={handleSubmit} className="signup-box">
      <h2>Create Account 🚀</h2>
      <p>Start your journey with us</p>

      <label>Username</label>
      <input type="text" name="username" onChange={handleChange} value={user.username} placeholder="Enter your username" required />

      <label>Email</label>
      <input type="email" name="email" onChange={handleChange} value={user.email} placeholder="Enter your email" required />

      <label>Password</label>
      <input type="password" name="password" onChange={handleChange} value={user.password} placeholder="Create a password" required />


      <button type="submit">Sign Up</button>

      <div className="bottom-text">
        <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
      </div>
    </form>
  </div>
    </>
}