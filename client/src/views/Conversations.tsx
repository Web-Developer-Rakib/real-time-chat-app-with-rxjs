import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ChatList from "../components/ChatList";
const Conversations = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("usersInfo");
    navigate("/");
  };
  return (
    <Container fluid>
      <h2 style={{ marginTop: 20, marginBottom: 20 }}>Conversations</h2>
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
              <Button variant="warning" onClick={handleLogout}>
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
