import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");

  let isLoggedIn = !!token;

  const storeToken = (token) => {
    setToken(token);
    return localStorage.setItem("token", token);
  };

  const removeToken = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const useAuthentication = async () => {
    try {
      const response = await fetch("https://contact-manager-75ct.onrender.com/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        setUser(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const manageDelete = async (id) => {

    const deleteval = {
      email: user.email,
      id: id,
    };

    try {
      const response = await fetch("https://contact-manager-75ct.onrender.com/delete-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteval),
      });

      const data = await response.json();

      if (response.ok) {
        setUser((prev) => ({ ...prev, contactInfo: data.contactInfo }));
      } else {
        console.warn("Failed to delete:", data.msg);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    useAuthentication();
  }, []);
  return (
    <AuthContext.Provider value={{ storeToken, isLoggedIn, removeToken, user, manageDelete ,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
