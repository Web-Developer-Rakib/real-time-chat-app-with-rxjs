import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ChatBubble from "../components/ChatBubble";
import ChatList from "../components/ChatList";

const Chat = () => {
  return (
    <Container fluid>
      <h2 style={{ marginTop: 20, marginBottom: 20 }}>Conversations</h2>
      <Row>
        <Col sm={2}>
          <ChatList />
        </Col>
        <Col sm={10}>
          <ChatBubble />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
