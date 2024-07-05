import Land from "./Land";

const slideContainer = {
  color: "white",
};
const slide = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  flexDirection: "column",
  padding: 20,
};
function scrollDownOneScreen() {
  window.scrollBy({
    top: window.innerHeight,
    left: 0,
    behavior: "smooth",
  });
}
const HomePage = ({ handlePlay, playing }) => {

  return (
    <div style={slideContainer}>
      <div style={slide}>
        <div>
          <h1>不朽之源</h1>
          <p style={{ maxWidth: 600, paddingTop: 20 }}>
            不朽之源（Immortalise
            Singularity）是一个融合先进科技与深刻哲思的创新项目，致力于为未来提供永恒的纪念和超越时空的存在体验。在不朽之源，每个人都可以创建自己的灵魂基因图谱。灵魂基因代表了你独特的记忆、思想和情感，通过我们的平台，这些宝贵的精神财富将被永久保存，不受时间和空间的限制。无论是生前的点滴记忆还是未来的愿望，都可以在这里得到永恒的保留和传承。
          </p>
          <svg
            onClick={() => {
              scrollDownOneScreen();
              handlePlay();
            }}
            style={{
              width: "60px",
              height: "60px",
              cursor: "pointer",
              margin: "5px",
              opacity: playing ? 0 : 1,
              transition: "opacity 0.1s ease-in-out",
            }}
            viewBox="0 0 24 24"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5V19L19 12L8 5Z" />
          </svg>
        </div>
      </div>
      <div style={slide}>
        <h1>灵魂基因</h1>
        <p style={{ maxWidth: 600, paddingTop: 20 }}>
          在不朽之源，每个人都可以创建自己的灵魂基因图谱。440个地块，这些地块排列在一个笛卡尔坐标系中。每个地块都有唯一的坐标。它将用与存储你的灵魂基因，这代表了你独特的记忆、思想和情感，通过我们的平台，这些宝贵的精神财富将被永久保存，不受时间和空间的限制。无论是过往的点滴记忆还是未来的愿望，都可以在这里得到永恒的保留和传承。{" "}
        </p>
        <Land />
      </div>
      <div style={slide}>
        <div>
          <h1>愿景与使命</h1>
          <p style={{ textAlign: "left", maxWidth: 600, paddingTop: 20 }}>
            我们希望通过不朽之源，为每个人提供一个超越时间和空间的纪念平台。在这里，你的灵魂基因将被永久保存，与未来紧密相连，鼓励探索和自由地生活在无垠的宇宙中。
          </p>
        </div>
      </div>
      <div style={slide}>
        <div>
          <h1>核心功能</h1>

          <ol style={{ textAlign: "left", maxWidth: 600, paddingTop: 20 }}>
            <li>
              双重存储机制：
              <ul>
                <li>区块链存储，确保关键数据的安全与永久性。</li>
                <li>
                  互联网存储，提供高效、低成本的存储解决方案，适用于一般性内容。
                </li>
              </ul>
            </li>
            <li>
              用户友好界面：
              <ul>
                <li>统一的用户界面，便捷的操作体验。</li>
                <li>强大的隐私保护措施，确保用户数据的安全。</li>
              </ul>
            </li>
            <li>
              灵活服务层：
              <ul>
                <li>提供API接口，允许用户根据需求选择存储方式。</li>
                <li>支持多种插件和集成工具，适配不同平台。</li>
              </ul>
            </li>
            <li>
              成本优化：
              <ul>
                <li>分级服务模式，用户可根据需求选择不同级别的服务方案。</li>
                <li>资源管理优化，确保存储和访问的高效性和经济性。</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
      <div style={slide}>
        <div>
          <h1>未来展望</h1>
          <p style={{ textAlign: "left", maxWidth: 600, paddingTop: 20 }}>
            不朽之源不仅是一个纪念平台，更是一个承载未来科技与人文情感的桥梁。我们相信，通过技术的力量，可以让每一个个体的记忆和价值在时空中永久传承。加入我们，共同见证不朽的力量！
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
