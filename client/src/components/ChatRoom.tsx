import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import ChatBubble from "../components/ChatBubble";
import { baseURL } from "../utils/constants";
export interface IMessage {
  _id: string;
  sender: string;
  receiver: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}
const socket = io(`${process.env.REACT_APP_SERVER_URL}`);
const ChatRoom = () => {
  const loggedinUser = JSON.parse(localStorage.getItem("usersInfo") as any);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { username } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // Create a function to handle incoming messages and update the state
    const handleChatMessage = (msg: any) => {
      setMessages((prevMsgs) => [...prevMsgs, msg]);
    };

    // Add the event listener when the component mounts
    socket.on("chat message", handleChatMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("chat message", handleChatMessage);
    };
  }, [username]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseURL}/chat/messages/${loggedinUser.username}/${username}`
        );
        setMessages(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [username]);
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") {
      return;
    }

    const newMessage = {
      sender: loggedinUser.username,
      receiver: username,
      message,
    };
    try {
      // Send the message to the server using Axios (or your preferred API client)
      await axios.post(`${baseURL}/chat/send`, newMessage);
      setMessage("");
    } catch (error) {
      setError("Failed to send the message.");
    }
  };
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
      <div
        style={{
          height: 470,
          overflowY: "auto",
          width: "100%",
        }}
      >
        <ChatBubble messages={messages} />
        <div style={{ marginTop: 60 }}></div>
      </div>
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
          onSubmit={handleSendMessage}
        >
          <Form.Control
            type="text"
            placeholder="Type your message..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="success" type="submit">
            Send
          </Button>
        </Form>
      </Stack>
    </div>
  );
};

export default ChatRoom;
