import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { useNavigate, useParams } from "react-router-dom";
import ChatBubble from "../components/ChatBubble";
const ChatRoom = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("usersInfo");
    navigate("/");
  };
  return (
    <div>
      <Stack
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h5>{username}</h5>
          <p>Online</p>
        </div>
        <Button variant="warning" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
      <Stack
        style={{
          height: 470,
          overflowY: "auto",
        }}
      >
        <ChatBubble />
        <ChatBubble />
        <div style={{ marginTop: 60 }}></div>
      </Stack>
      <Stack
        style={{
          position: "fixed",
          bottom: 0,
          width: "80%",
          backgroundColor: "white",
          padding: "10px",
          margin: "auto",
        }}
      >
        <Form
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <Form.Control type="text" placeholder="Type your message..." />
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </Stack>
    </div>
  );
};

export default ChatRoom;
