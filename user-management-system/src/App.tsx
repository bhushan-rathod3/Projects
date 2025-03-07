import { ConfigProvider, Layout, theme } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./routes/AppRouter";
import { useThemeStore } from "./store/themeStore";

const { Header, Content } = Layout;

const App = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Header>
            <Navbar />
          </Header>
          <Content style={{ padding: "2rem" }}>
            <AppRouter />
          </Content>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
