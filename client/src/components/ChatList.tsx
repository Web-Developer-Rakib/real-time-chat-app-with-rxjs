import ListGroup from "react-bootstrap/ListGroup";

const ChatList = () => {
  return (
    <ListGroup variant="flush" style={{ display: "flex", gap: 5 }}>
      <ListGroup.Item style={{ cursor: "pointer" }}>Jack</ListGroup.Item>
    </ListGroup>
  );
};

export default ChatList;
