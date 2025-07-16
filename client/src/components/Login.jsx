import { NavLink } from "react-router-dom";
import "./styles/Login.css";
import { useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
export const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeToken } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        storeToken(responseData.token);
        navigate("/contact");
      } else {
        const data = await response.json();
        if(response.status === 401){
          toast.error("Invalid credentials", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,  
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
        else{
          const message = JSON.parse(data.msg);
          toast.error(message[0].message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />

      <div className="login-container">
        <form className="login-box" onSubmit={handleLogin}>
          <h2>Welcome Back 👋</h2>
          <p>Please login to your account</p>

          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={data.email}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={data.password}
            placeholder="Enter your password"
            required
          />

          <button type="submit">Login</button>

          <div className="bottom-text">
            <p>
              Don't have an account? <NavLink to="/signup">Sign up</NavLink>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
