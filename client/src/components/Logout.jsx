import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const { removeToken } = useAuth();

  useEffect(() => {
    removeToken();
    navigate("/");
  }, []);
};
