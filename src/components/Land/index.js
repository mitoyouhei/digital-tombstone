import "./index.css";
import useUser from "../../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";

const maxRow = 21;
const maxCol = 21;

const encode = "abcdefghijklmnopqrstuvwxyz";

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

const Plot = ({ cell }) => {
  const navigate = useNavigate();
  const [user] = useUser();
  const isPoint = cell[0] === 0 && cell[1] === 0;
  const color = isPoint
    ? "#551d1d"
    : adjustColorBrightness("#7b69ee", getRandomNumber(0.9, 1.0));

  const createGene = () => {
    if (isPoint) return;
    if (!user) return navigate("/login");

    alert(cell.join(","));
  };

  return (
    <div
      className={isPoint ? "plot-s" : "plot"}
      style={{
        backgroundColor: color,
      }}
      onClick={createGene}
      coordinate={cell.join(",")}
    ></div>
  );
};

const Land = () => {
  return (
    <div className="land-container rounded shadow">
      {plots.map((row, y) => {
        return (
          <div className="plot-row" key={y}>
            {row.map((cell) => {
              return <Plot cell={cell} key={cell.join("-")}></Plot>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Land;
