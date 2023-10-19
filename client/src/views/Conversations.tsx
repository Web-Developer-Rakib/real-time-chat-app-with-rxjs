import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ChatList from "../components/ChatList";
import { baseURL } from "../utils/constants";
const Conversations = () => {
  const loggedinUser = JSON.parse(localStorage.getItem("usersInfo") as any);
  const [loading, setLoading] = useState<boolean>(false);
  const { username } = useParams();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.put(`${baseURL}/user/logout/${loggedinUser.username}`);
      localStorage.removeItem("usersInfo");
      navigate("/");
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container fluid>
      <h4 style={{ marginTop: 20, marginBottom: 20 }}>
        Welcome: {loggedinUser.username}!
      </h4>
      <Row>
        <Col sm={2} style={{ borderRight: "1px solid black" }}>
          <ChatList />
        </Col>
        <Col sm={10}>
          {!username ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3>Start a conversation...</h3>
              <h5>OR</h5>
              <Button
                disabled={loading}
                variant="warning"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Outlet />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Conversations;
