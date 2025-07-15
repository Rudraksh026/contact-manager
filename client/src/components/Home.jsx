import { NavLink } from "react-router-dom";
import "./styles/Home.css";
import { useState } from "react";
import { useAuth } from "../store/auth";

export const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="navbar">
        <h1 className="logo">ContactSaver</h1>

        <div className="menu-icon" onClick={toggleMenu}>
          &#9776;
        </div>

        <nav className={`nav-links ${isMenuOpen ? "active_toggle" : ""}`}>
          {isLoggedIn ? (
            <>
              <NavLink
                to="/logout"
                className="nav-btn"
                onClick={() => setIsMenuOpen(false)}
              >
                Logout
              </NavLink>

              <NavLink
              to="/contact"
              className="nav-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="nav-btn"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="nav-btn signup"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h2>Securely Save Your Contacts Online 📱</h2>
          <p>
            ContactSaver is a simple and secure web app that allows you to save
            and manage all your contacts in one place. Access your contact list
            from anywhere — only after logging in.
          </p>
          <NavLink to="/login" className="cta-btn">
            Get Started
          </NavLink>
        </div>
        <div className="hero-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3095/3095583.png"
            alt="Contact Illustration"
          />
        </div>
      </section>

      <section className="features">
        <div className="feature-box">
          <h3>🔒 Privacy Focused</h3>
          <p>
            Your contacts are stored securely and only visible after login. We
            value your data privacy.
          </p>
        </div>
        <div className="feature-box">
          <h3>☁️ Cloud Access</h3>
          <p>
            Access your contacts anytime, from any device — just log in to your
            account.
          </p>
        </div>
        <div className="feature-box">
          <h3>📝 Easy to Use</h3>
          <p>
            Minimal and modern UI that lets you add, edit, and delete contacts
            effortlessly.
          </p>
        </div>
      </section>

      <footer>
        <p>© 2025 ContactSaver | All rights reserved</p>
      </footer>
    </>
  );
};
