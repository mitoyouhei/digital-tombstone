import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");
const maxRow = 21;
const maxCol = 21;

const available = "#45c0dc";
const disable = "#e3eeee";
const owned = "#ee6969";
const taken = "#7b69ee";
const center = "#551d1d";

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

const Plot = ({ cell, color }) => {
  const navigate = useNavigate();

  const [user] = useUser();
  const isCenter = cell[0] === 0 && cell[1] === 0;
  const createGene = () => {
    if (isCenter) return;
    if (!user) return navigate("/login");

    navigate("/create-gene?id=" + cell.join(","));
  };

  return (
    <div
      className={isCenter ? "plot-s" : "plot"}
      style={{
        backgroundColor: isCenter ? center : color,
      }}
      onClick={createGene}
      coordinate={cell.join(",")}
    ></div>
  );
};

function getColor(genes, cell) {
  const gene = genes.find((g) => g.plotId === cell.join(","));
  if (!gene) return available;
  return gene.isOwned ? owned : taken;
}

const Land = () => {
  const [genes, setGenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoulGenes = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/soulGene`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGenes(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching soul gene:", error);
        setLoading(false);
      }
    };

    fetchSoulGenes();
  }, []);
  if (loading) {
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

  return (
    <div className="land-container rounded shadow">
      {plots.map((row, y) => {
        return (
          <div className="plot-row" key={y}>
            {row.map((cell) => {
              return (
                <Plot
                  color={adjustColorBrightness(
                    getColor(genes, cell),
                    getRandomNumber(0.9, 1.0)
                  )}
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
