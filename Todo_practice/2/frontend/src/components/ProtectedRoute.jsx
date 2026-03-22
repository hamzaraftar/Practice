import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    auth().catch((error) => {
      console.log(error.message);
      setIsAuthorized(false);
    });
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const response = await api.post("/api/user/refresh/", {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error.message);
      setIsAuthorized(false);
    }
  };

  //check if access token is valid, if not, try to refresh it
  const auth = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken) {
      setIsAuthorized(false);
      return;
    }
    const decodedToken = jwtDecode(accessToken);
    const tokenExpiration = decodedToken.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}
