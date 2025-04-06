import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";
import imagem from "../../assets/investimentoLogin.svg";
import inicialImg from "../../assets/home.svg";
import LoadingPopup from "../../components/Context/LoadingPopup";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
  
    let newErrors = {};
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.senha.trim()) newErrors.senha = true;
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false); 
      return;
    }
  
    try {
      const response = await fetch("https://webcotabackend.onrender.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.senha,
        }),
      });
  
      if (!response.ok) {
        throw new Error("E-mail ou senha inválidos.");
      }
  
      const data = await response.json();
      console.log("Usuário logado:", data);
  
      document.cookie = `user=${JSON.stringify(data)}; path=/; max-age=${7 * 24 * 60 * 60}`;
  
      navigate("/perfil");
    } catch (error) {
      console.error("Erro:", error.message);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container">
      {loading && <LoadingPopup mensagem="Entrando..." />} 

      <div className="image-section">
        <img src={imagem} alt="Imagem de investimento" className="cadastro-img" />
        <p className="promo-text">
          Faça seu login <span className="destaque">AGORA!</span> e tenha mais facilidade na hora de investir.
        </p>
      </div>

      <div className="form-section">
        <h2 style={{ fontSize: "40px" }}>
          <strong>Logar</strong>
        </h2>
        <form onSubmit={handleSubmit} className="cadastro-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
            required
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            className={errors.senha ? "input-error" : ""}
            required
          />

          <button type="submit">Entrar</button>
        </form>
        <p>
          Não possui uma conta? <a href="/cadastro">Cadastre-se</a>
        </p>
      </div>

      <div
        style={{
          position: "relative",
          top: "35%",
          right: "24.5%",
        }}
      >
        <button onClick={() => navigate("/")}>
          <img src={inicialImg} alt="voltarInicial" />
        </button>
      </div>
    </div>
  );
}

export default Login;
