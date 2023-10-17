import Card from "react-bootstrap/Card";
const ChatBubble = () => {
  return (
    <Card
      border="primary"
      style={{ width: "36rem", float: "left", marginBottom: 10 }}
    >
      <Card.Header>Jhon doe</Card.Header>
      <Card.Body>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ChatBubble;
