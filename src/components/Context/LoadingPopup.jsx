import "./LoadingPopup.css";

const LoadingPopup = ({ mensagem }) => {
  return (
    <div className="loading-popup">
      <div className="loading-content">
        <div className="spinner"></div>
        <p>{mensagem || "Carregando..."}</p>
      </div>
    </div>
  );
};

export default LoadingPopup;
