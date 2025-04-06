import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    document.cookie = "user=; path=/; max-age=0"; 
    navigate("/"); 
  }, [navigate]);

  return <p>Saindo...</p>;
}

export default Logout;
