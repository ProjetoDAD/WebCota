import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Cadastro.css'
import imagem from '../../assets/investimentoLogin.svg'
import inicialImg from '../../assets/home.svg'

function Cadastro() {
    const [formData, setFormData] = useState({
        nomeUsuario: "",
        email: "",
        celular: "",
        senha: "",
        confirmarSenha: ""
    });

    const [error, setError] = useState(""); 
    const navigate = useNavigate(); 
  
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 

        if (formData.senha !== formData.confirmarSenha) {
            setError("As senhas não coincidem!");
            return;
        }

        try {
            const response = await fetch("https://webcotabackend.onrender.com/users/addUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Usuário cadastrado com sucesso!");
                navigate("/login"); 
            } else {
                setError(data.error || "Erro ao cadastrar usuário.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            setError("Erro ao conectar ao servidor.");
        }
    };

    return (
        <div className="container">
            <div className="image-section">
                <img src={imagem} alt="Imagem de investimento" className="cadastro-img" />
                <p className="promo-text">
                    Cadastre-se <span className="destaque">AGORA!</span> e tenha mais
                    facilidade na hora de investir
                </p>
            </div>
    
            <div className="form-section">
                <h2 style={{ fontSize: "40px" }}><strong>Cadastre-se</strong></h2>
                {error && <p className="error-message">{error}</p>} 
                <form onSubmit={handleSubmit} className="cadastro-form">
                    <input
                        type="text"
                        name="nomeUsuario"
                        placeholder="Nome completo"
                        value={formData.nomeUsuario}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="telefone"
                        name="celular"
                        placeholder="Celular"
                        value={formData.celular}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="senha"
                        placeholder="Senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmarSenha"
                        placeholder="Confirme sua senha"
                        value={formData.confirmarSenha}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Cadastrar</button>
                </form>
                <p>
                    Já possui uma conta? <a href="/login">Faça o login</a>
                </p>
            </div>
            <div style={{ position: "relative", top: "35%", right: "24.5%" }}>
                <button onClick={() => navigate("/")} id="voltar_inicio">
                    <img src={inicialImg} alt="voltarInicial"/>
                </button>
            </div>
        </div>
    );
}

export default Cadastro;
