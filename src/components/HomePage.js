import AutoPlayAudio from "./AutoPlayAudio";

const slideContainer = {
  color: "white",
  position: "fixed",
  width: "100%",
  height: "100%",
  overflow: "auto",
};
const slide = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "30px 20px",
};

const HomePage = () => {
  return (
    <div style={slideContainer}>
      <AutoPlayAudio src="/assets/bgm.mp3" />
      <div style={slide}>
        <div>
          <h1>不朽之源</h1>
          <p style={{ maxWidth: 700, paddingTop: 20 }}>
            不朽之源（Immortalise
            Singularity）是一个融合先进科技与深刻哲思的创新项目，致力于为未来提供永恒的纪念和超越时空的存在体验。通过结合区块链技术和互联网存储，我们不仅保证数据的安全与透明，还降低了存储和访问的成本，使更多人能够轻松参与。
          </p>
        </div>
      </div>
      <div style={slide}>
        <div>
          <h1>愿景与使命</h1>
          <p style={{ textAlign: "left", maxWidth: 700, paddingTop: 20 }}>
            我们的愿景是创建一个超越传统纪念方式的数字平台，让每个人都能在虚拟世界中留下自己的足迹，无论时间如何流逝，这些记忆都能被永久保存与传承。我们致力于：
          </p>
          <ul style={{ textAlign: "left", maxWidth: 600 }}>
            <li>数据永存：通过区块链技术确保所有信息的不可篡改和永久存储。</li>
            <li>
              普及参与：利用互联网技术降低使用门槛，让更多人能够享受这一创新服务。
            </li>
            <li>
              纪念与传承：为用户提供多样化的纪念方式，包括文字、图片、视频等，让每一个纪念都富有个性和情感。
            </li>
          </ul>
        </div>
      </div>
      <div style={slide}>
        <div>
          <h1>核心功能</h1>

          <ol style={{ textAlign: "left", maxWidth: 700, paddingTop: 20 }}>
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
          <p style={{ textAlign: "left", maxWidth: 700, paddingTop: 20 }}>
            不朽之源不仅是一个纪念平台，更是一个承载未来科技与人文情感的桥梁。我们相信，通过技术的力量，可以让每一个个体的记忆和价值在时空中永久传承。加入我们，共同见证不朽的力量！
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
