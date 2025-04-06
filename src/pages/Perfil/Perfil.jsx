import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../hooks/UseAuth";
import "./Perfil.css";
import avatarImagem from "../../assets/avatar.svg"; 
import eyeIcon from '../../assets/eye.svg';
import eyeOffIcon from '../../assets/eyeOff.svg';
import logout from "../../assets/logOut.svg";
import LoadingPopup from "../../components/Context/LoadingPopup";

function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("Dados");
  const [loading, setLoading] = useState(false); 

  const [formData, setFormData] = useState({
    senha: "",
    email: "",
    celular: "",
    nomeUsuario: ""
  });

  useEffect(() => {
    const loggedUser_Cookie = getCookie("user");
    if (!loggedUser_Cookie) {
      navigate("/login");
    } else {
      try {
        const loggedUser = JSON.parse(loggedUser_Cookie);
        setUser(loggedUser);
        setFormData({
          id: loggedUser.id || "",
          senha: loggedUser.senha || "",
          email: loggedUser.email || "",
          celular: loggedUser.celular || "",
          nomeUsuario: loggedUser.nomeUsuario || ""
        });
      } catch (error) {
        console.error("Erro ao analisar o cookie do usuário:", error);
        navigate("/login");
      }
    }
  }, []); 
  

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)

    const userCookie = getCookie("user");
    if (!userCookie) return;
  
    const user = JSON.parse(userCookie);
  
    const updatedUser = {
      ...user,
      senha: formData.senha,
      email: formData.email,
      celular: formData.celular,
      nomeUsuario: formData.nomeUsuario,
    };
  
    try {
      const response = await fetch("https://webcotabackend.onrender.com/users/atualizar", {
        method: "PUT",
        headers: {
          "id": formData.id,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
        credentials: "include"
      });
  
      if (response.ok) {
        setCookie("user", JSON.stringify(updatedUser), 7);
  
        const newUser = JSON.parse(getCookie("user"));
  
        setUser(newUser);
        setFormData({
          id: newUser.id || "",
          senha: newUser.senha || "",
          email: newUser.email || "",
          celular: newUser.celular || "",
          nomeUsuario: newUser.nomeUsuario || "",
        });
  
      } else {
        const errorData = await response.json();
        console.error("Erro ao atualizar perfil:", errorData.message);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na requisição ao atualizar o perfil.");
    } finally {
      setLoading(false)
    }
  };
  
  
  

  return (
    <div className="perfil-container">
    {loading && <LoadingPopup mensagem="Atualizando perfil..." />}
      <div className="perfil-header">
        <img src={avatarImagem} alt="Avatar" className="perfil-avatar" />
        <div className="perfil-info">
          <strong>{user ? user.nomeUsuario : "Usuário"}</strong>
          <p>{user ? user.email : "email@example.com"}</p>
        </div>
      </div>

      <div className="perfil-nav">
        <ul>
          <li 
            className={`links ${activeTab === "Dados" ? "active" : ""}`}
            onClick={() => setActiveTab("Dados")}
          >
            Dados
          </li>
          <li 
            className={`links ${activeTab === "Alterar dados" ? "active" : ""}`}
            onClick={() => setActiveTab("Alterar dados")}
          >
            Alterar dados
          </li>
          <li>
            <div id="hamburguer">&#9776;</div>
          </li>
        </ul>
      </div>

      <div className="perfil-config">
        {user ? (
          activeTab === "Dados" ? (
            <div className="info-publica">
              <h3>Suas informações</h3>
              <h2 style={{ fontSize: "small", fontWeight: "200" }}>Informações pessoais</h2>
              <p><strong>Nome:</strong> {user.nomeUsuario}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Celular:</strong> {user.celular}</p>
              <p id="botao">
                <strong>Senha:</strong> {showPassword ? "123456" : "******"}
                <button onClick={() => setShowPassword(!showPassword)}>
                  <img 
                    src={showPassword ? eyeOffIcon : eyeIcon} 
                    alt={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>
              </p>
            </div>
          ) : (
            <div className="info-privada">
              <h3>Alterar informações</h3>
              <h2 style={{fontWeight: "200"}}>Editar suas informações pessoais</h2>
              <form onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input
                  type="text"
                  name="nomeUsuario"
                  value={formData.nomeUsuario}
                  onChange={handleChange}
                />

                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <label>Celular:</label>
                <input
                  type="text"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                />

                <label>Senha:</label>
                <input
                  type="text"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                />

                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setActiveTab("Dados")}>Cancelar</button>
              </form>
            </div>
          )
        ) : (
          <div className="info-publica">
            <h2>Você ainda não tem um cadastro!</h2>
            <p>Deseja se cadastrar agora?</p>
            <button onClick={() => navigate("/cadastro")}>Cadastrar</button>
          </div>
        )}
      </div>

      {user && (
        <button id="botaoLogout" onClick={() => navigate("/logout")}>
          <img 
            src={logout} 
            alt="Sair do seu perfil"
            style={{ width: "40px", height: "40px" }}
          />
        </button>
      )}
    </div>
  );
}

export default Perfil;
