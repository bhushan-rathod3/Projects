import { ConfigProvider, Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./routes/AppRouter";

const { Header, Content } = Layout;

const App = () => {
  return (
    <ConfigProvider>
      <Router>
        <Layout>
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
