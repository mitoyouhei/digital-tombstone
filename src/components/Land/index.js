import "./index.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";

// const token = localStorage.getItem("token");
const maxRow = 21;
const maxCol = 21;

const available = "#45c0dc";
// const disable = "#e3eeee";
const owned = "#ee6969";
const taken = "#7b69ee";
const center = "#551d1d";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

function getPositon([x, y]) {
  return [x - Math.floor(maxCol / 2), Math.floor(maxRow / 2) - y];
}

const plots = Array.from({ length: maxRow }, (_, y) => {
  return Array.from({ length: maxCol }, (_, x) => getPositon([x, y]));
});

function adjustColorBrightness(color, factor) {
  let r, g, b;
  if (color.startsWith("#")) {
    color = color.slice(1);
    if (color.length === 3) {
      color = color
        .split("")
        .map((c) => c + c)
        .join("");
    }
    r = parseInt(color.substr(0, 2), 16);
    g = parseInt(color.substr(2, 2), 16);
    b = parseInt(color.substr(4, 2), 16);
  } else if (color.startsWith("rgb")) {
    const match = color.match(/(\d+), (\d+), (\d+)/);
    r = parseInt(match[1]);
    g = parseInt(match[2]);
    b = parseInt(match[3]);
  }

  r = Math.min(255, Math.max(0, Math.round(r * factor)));
  g = Math.min(255, Math.max(0, Math.round(g * factor)));
  b = Math.min(255, Math.max(0, Math.round(b * factor)));

  return `rgb(${r}, ${g}, ${b})`;
}
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

const Plot = ({ cell, color, gene, onClick }) => {
  const navigate = useNavigate();

  const [user] = useUser();
  const isCenter = cell[0] === 0 && cell[1] === 0;
  const createGene = () => {
    if (isCenter) return;
    if (gene) return alert(JSON.stringify(gene));
    if (!user) return navigate("/login");

    navigate("/create-gene?id=" + cell.join(","));
  };

  return (
    <div
      className={isCenter ? "plot-s" : "plot"}
      style={{
        backgroundColor: isCenter ? center : color,
      }}
      onClick={onClick ?? createGene}
      coordinate={cell.join(",")}
    ></div>
  );
};

function getColor(gene, cell) {
  if (!gene) return available;
  return gene.isOwned ? owned : taken;
}

const Land = () => {
  const [genes, setGenes] = useState([]);
  const [error] = useState(null);
  const [gene, setGene] = useState(null);

  const { sendMessage, lastMessage, readyState } = useWebSocket(SOCKET_URL);
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendMessage(JSON.stringify({ type: "getSoulGenes" }));
    }
  }, [readyState, sendMessage]);

  useEffect(() => {
    if (lastMessage !== null) {
      const messageData = JSON.parse(lastMessage.data);
      if (messageData.type === "soulGenes") {
        setGenes(messageData.data);
      }
    }
  }, [lastMessage]);

  if (readyState === ReadyState.CLOSED || error)
    return <p>Error: {error || "WebSocket connection closed"}</p>;

  if (readyState === ReadyState.CONNECTING) {
    return (
      <div
        className="land-container  shadow"
        style={{ borderRadius: "25px", padding: "2px" }}
      >
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  const handleClose = () => setGene(null);
  return (
    <div className="land-container rounded shadow">
      {gene && (
        <Modal show={gene} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>[{gene.plotId}]</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>{gene.name}</h1>
            <p>{gene.birthdate}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {plots.map((row, y) => {
        return (
          <div className="plot-row" key={y}>
            {row.map((cell) => {
              const gene = genes.find((g) => g.plotId === cell.join(","));
              return (
                <Plot
                  color={adjustColorBrightness(
                    getColor(gene, cell),
                    getRandomNumber(0.9, 1.0)
                  )}
                  gene={gene}
                  onClick={gene ? () => setGene(gene) : null}
                  cell={cell}
                  key={cell.join("-")}
                ></Plot>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Land;
