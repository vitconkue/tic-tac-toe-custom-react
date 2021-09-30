import "../index.css";

export const Square = ({ value, onClick, isHightlight }) => {
    return (
      <button
        className={`square ${isHightlight ? "green-border" : "none"}`}
        onClick={onClick}
      >
        {value}
      </button>
    );
  };