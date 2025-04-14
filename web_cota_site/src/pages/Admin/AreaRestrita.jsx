import { useEffect, useState } from 'react';
import { getUsers, deleteUser, atualizarUser, createUser } from './UserService';
import "./AreaRestrita.css";
import LoadingPopup from '../../components/Context/LoadingPopup';

function AreaRestrita() {
  const [users, setUsers] = useState([]);
  const [secaoAtiva, setSecaoAtiva] = useState(null); 
  const [novoUser, setNovoUser] = useState({ email: "", senha: "" });
  const [idParaDeletar, setIdParaDeletar] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [idParaAtualizar, setIdParaAtualizar] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [novoCelular, setNovoCelular] = useState("");
  const [loading, setLoading] = useState(false); 

  // const buscarUsuarioPorId = async (id) => {
  //   try {
  //     const response = await getUserById(id); 
  //     const usuario = response.data;
  
  //     setNovoNome(usuario.nome || "");
  //     setNovoEmail(usuario.email || "");
  //     setNovaSenha(usuario.senha || "");
  //     setNovoCelular(usuario.celular || "");
  //     setTipoUsuario({ tipoUsuario: usuario.tipoUsuario || "" });
  //   } catch (error) {
  //     console.error("Erro ao buscar usuário:", error);
  //   }
  // };

  const carregarUsuarios = async () => {
    setLoading(true)
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
        setLoading(false)
    }
  };

  const handleCreate = async () => {
    setLoading(true)
    try {
      await createUser(novoUser);
      setNovoUser({ email: "", senha: "" });
      carregarUsuarios();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    } finally {
        setLoading(false)
    }
  };

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteUser(idParaDeletar);
      setIdParaDeletar("");
      carregarUsuarios();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    } finally {
        setLoading(false)
    }
  };

  const handleUpdate = async () => {
    setLoading(true)
    const novoUsuario = {
      nomeUsuario: novoNome,
      email: novoEmail,
      senha: novaSenha,
      celular: novoCelular,
      tipoUsuario: tipoUsuario,
    };

    try {
      await atualizarUser(novoUsuario, idParaAtualizar);
      setIdParaAtualizar("");
      setNovoNome("");
      setNovoEmail("");
      setNovaSenha("");
      setNovoCelular("");
      setTipoUsuario("");
      carregarUsuarios();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    } finally {
        setLoading(false)
    }
  };

  return (
    <>
    <h1 style={{
        margin: "20px"
    }}>Area Restrita</h1>

    {loading && (
    <LoadingPopup
        mensagem={
        secaoAtiva === "ver"
            ? "Carregando usuários..."
            : secaoAtiva === "criar"
            ? "Criando usuário..."
            : secaoAtiva === "atualizar"
            ? "Atualizando usuário..."
            : secaoAtiva === "deletar"
            ? "Deletando usuário..."
            : "Carregando..."
        }
    />
    )}

        <div>
        <ul>
            <li>
            <button id="button" className="get" onClick={() => {
                if (secaoAtiva !== "ver") carregarUsuarios();
                setSecaoAtiva(secaoAtiva === "ver" ? null : "ver");
            }}>
                Ver usuários
                <svg id="seta"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className={`arrow ${secaoAtiva === "ver" ? "rotate" : ""}`}
                width="20"
                height="20"
                aria-hidden="true"
                focusable="false">
                <path d="M17.418 6.109c.272-.268.709-.268.979 0s.271.701 0 .969l-7.908 7.83c-.27.268-.707.268-.979 0l-7.908-7.83c-.27-.268-.27-.701 0-.969.271-.268.709-.268.979 0L10 13.25l7.418-7.141z"></path>
                </svg>
            </button>
            {secaoAtiva === "ver" && (
                <div className="secao">
                <h2>Usuários Cadastrados</h2>
                <ul>
                    {users.map((user) => (
                        
                        <div key={user.id}>
                        <li>---------------------------</li>
                        <li>ID: {user.id}</li>
                        <li>Usuário: {user.nomeUsuario}</li>
                        <li>Email: {user.email}</li>
                        <li>Senha: {user.senha}</li>
                        <li>Celular: {user.celular}</li>
                        </div>
                    ))}   
                </ul>

                </div>
            )}
            </li>
    
            <li>
            <button id="button" className="create" onClick={() => setSecaoAtiva(secaoAtiva === "criar" ? null : "criar")}>
                Criar usuário
                <svg id="seta"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className={`arrow ${secaoAtiva === "criar" ? "rotate" : ""}`}
                width="20"
                height="20"
                aria-hidden="true"
                focusable="false">
                <path d="M17.418 6.109c.272-.268.709-.268.979 0s.271.701 0 .969l-7.908 7.83c-.27.268-.707.268-.979 0l-7.908-7.83c-.27-.268-.27-.701 0-.969.271-.268.709-.268.979 0L10 13.25l7.418-7.141z"></path>
                </svg>
            </button>
            {secaoAtiva === "criar" && (
                <div className="secao">
                <h2>Criar Novo Usuário</h2>
                <input
                    type="text"
                    placeholder="Nome usuario"
                    value={novoUser.nomeUsuario}
                    onChange={(e) => setNovoUser({ ...novoUser, nomeUsuario: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Celular"
                    value={novoUser.celular}
                    onChange={(e) => setNovoUser({ ...novoUser, celular: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={novoUser.email}
                    onChange={(e) => setNovoUser({ ...novoUser, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={novoUser.senha}
                    onChange={(e) => setNovoUser({ ...novoUser, senha: e.target.value })}
                />
                <select
                    value={tipoUsuario.tipoUsuario}
                    onChange={(e) => setTipoUsuario({ ...tipoUsuario, tipoUsuario: e.target.value })}>
                    <option value="">Selecione o tipo de usuário</option>
                    <option value="admin">admin</option>
                    <option value="comum">usuario</option>
                </select>
                
                <button onClick={handleCreate}>Criar</button>
                </div>
            )}
            </li>
    
            <li>
            <button id="button" className="update" onClick={() => setSecaoAtiva(secaoAtiva === "atualizar" ? null : "atualizar")}>
                Atualizar usuário
                <svg id="seta"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className={`arrow ${secaoAtiva === "atualizar" ? "rotate" : ""}`}
                width="20"
                height="20"
                aria-hidden="true"
                focusable="false">
                <path d="M17.418 6.109c.272-.268.709-.268.979 0s.271.701 0 .969l-7.908 7.83c-.27.268-.707.268-.979 0l-7.908-7.83c-.27-.268-.27-.701 0-.969.271-.268.709-.268.979 0L10 13.25l7.418-7.141z"></path>
                </svg>
            </button>
            {secaoAtiva === "atualizar" && (
                <div className="secao">
                <h2>Atualizar Usuário</h2>
                <input
                  type="text"
                  placeholder="ID do usuário"
                  value={idParaAtualizar}
                  onChange={(e) => setIdParaAtualizar(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Nome"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={novoEmail}
                  onChange={(e) => setNovoEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Celular"
                  value={novoCelular}
                  onChange={(e) => setNovoCelular(e.target.value)}
                />
                <select
                    value={tipoUsuario.tipoUsuario}
                    onChange={(e) => setTipoUsuario({ ...tipoUsuario, tipoUsuario: e.target.value })}>
                    <option value="">Selecione o tipo de usuário</option>
                    <option value="admin">admin</option>
                    <option value="comum">usuario</option>
                </select>
                <button onClick={handleUpdate}>Atualizar</button>
              </div>
            )}
            </li>
    
            <li>
            <button id="button" className="delete" onClick={() => setSecaoAtiva(secaoAtiva === "deletar" ? null : "deletar")}>
                Deletar usuário
                <svg id="seta"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className={`arrow ${secaoAtiva === "deletar" ? "rotate" : ""}`}
                width="20"
                height="20"
                aria-hidden="true"
                focusable="false">
                <path d="M17.418 6.109c.272-.268.709-.268.979 0s.271.701 0 .969l-7.908 7.83c-.27.268-.707.268-.979 0l-7.908-7.83c-.27-.268-.27-.701 0-.969.271-.268.709-.268.979 0L10 13.25l7.418-7.141z"></path>
                </svg>
            </button>
            {secaoAtiva === "deletar" && (
                <div className="secao">
                <h2>Deletar Usuário</h2>
                <input
                    type="text"
                    placeholder="ID do usuário"
                    value={idParaDeletar}
                    onChange={(e) => setIdParaDeletar(e.target.value)}
                />
                <button onClick={handleDelete}>Deletar</button>
                </div>
            )}
            </li>
        </ul>
        </div>
    </>
  );
  
  
}

export default AreaRestrita;
