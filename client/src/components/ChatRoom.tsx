import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { useNavigate, useParams } from "react-router-dom";
import ChatBubble from "../components/ChatBubble";
import { baseURL, socket } from "../utils/constants";
export interface IMessage {
  _id: string;
  sender: string;
  receiver: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const ChatRoom = () => {
  const loggedinUser = JSON.parse(localStorage.getItem("usersInfo") as any);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [logoutLoading, setLogOutLoding] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { username, status } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    const handleChatMessage = (msg: any) => {
      setMessages((prevMsgs) => [...prevMsgs, msg]);
    };
    socket.on("chat message", handleChatMessage);
    return () => {
      socket.off("chat message", handleChatMessage);
    };
  }, []);
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
    setMessage("");
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
      await axios.post(`${baseURL}/chat/send`, newMessage);
      setMessage("");
    } catch (error) {
      setError("Failed to send the message.");
    }
  };
  const handleLogout = async () => {
    try {
      setLogOutLoding(true);
      await axios.put(`${baseURL}/user/logout/${loggedinUser.username}`);
      localStorage.removeItem("usersInfo");
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLogOutLoding(false);
    }
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
          <p
            className={status === "Online" ? "text-success" : "text-secondary"}
          >
            {status}
          </p>
        </div>
        <Button
          disabled={logoutLoading}
          variant="warning"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Stack>
      <div
        style={{
          height: 400,
          overflowY: "auto",
          width: "100%",
        }}
        ref={containerRef}
      >
        {error ? (
          <h4>{error}</h4>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <ChatBubble messages={messages} />
        )}
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
            value={message}
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
