import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet, useParams } from "react-router-dom";
import ChatList from "../components/ChatList";
const Conversations = () => {
  const { username } = useParams();
  return (
    <Container fluid>
      <h2 style={{ marginTop: 20, marginBottom: 20 }}>Conversations</h2>
      <Row>
        <Col sm={2} style={{ borderRight: "1px solid black" }}>
          <ChatList />
        </Col>
        <Col sm={10}>
          {!username ? <h3>Start a conversation</h3> : <Outlet />}
        </Col>
      </Row>
    </Container>
  );
};

export default Conversations;
