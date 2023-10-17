import axios from "axios";
import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useLocation } from "react-router-dom";
import { baseURL } from "../utils/constants";
interface IFriend {
  _id: string;
  username: string;
}
const ChatList = () => {
  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "inherit", // Inherit the default link color
  };

  const activeLinkStyle = {
    fontWeight: "bold",
    textDecoration: "none", // Remove underline
    color: "inherit", // Make the active link bold
  };
  const location = useLocation();
  const [friends, setFriends] = useState<IFriend[]>([]);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/user/get-all-friends/?username=${"rakib"}`
        );
        setFriends(response.data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchUsers();
  }, []);
  return (
    <ListGroup variant="flush" style={{ display: "flex", gap: 5 }}>
      {friends.map((friend) => (
        <Link
          to={`/chat/room/${friend.username}`}
          style={
            location.pathname === `/chat/room/${friend.username}`
              ? activeLinkStyle
              : linkStyle
          }
        >
          <ListGroup.Item style={{ cursor: "pointer" }} key={friend._id}>
            {friend.username}
          </ListGroup.Item>
        </Link>
      ))}
    </ListGroup>
  );
};

export default ChatList;
