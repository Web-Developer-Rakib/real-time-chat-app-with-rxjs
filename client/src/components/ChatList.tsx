import axios from "axios";
import { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useLocation } from "react-router-dom";
import useSingleUser from "../hooks/useSingleUser";
import { baseURL, socket } from "../utils/constants";
interface IFriend {
  _id: string;
  username: string;
  status: string;
}
const ChatList = () => {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  const activeLinkStyle = {
    fontWeight: "bold",
    textDecoration: "none",
    color: "inherit",
  };
  const location = useLocation();
  const { setUser } = useSingleUser();
  const [friends, setFriends] = useState<IFriend[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const handleOnlineStatus = (user: any) => {
      const userId = user.id;
      setUser((prev: any) => ({ ...prev, status: user.status }));
      const updatedFriends = friends.map((friend) => {
        if (friend._id === userId) {
          return { ...friend, status: user.status };
        }
        return friend;
      });
      setFriends(updatedFriends);
    };
    socket.on("status", handleOnlineStatus);
    return () => {
      socket.off("status", handleOnlineStatus);
    };
  }, [friends]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const loggedinUser = JSON.parse(
          localStorage.getItem("usersInfo") as any
        );
        const response = await axios.get(
          `${baseURL}/user/get-all-friends/?username=${loggedinUser.username}`
        );
        setFriends(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  const handleSetFriend = (friendsName: string) => {
    localStorage.setItem("chatingWith", friendsName);
  };
  return (
    <ListGroup variant="flush" style={{ display: "flex", gap: 5 }}>
      {error && error}
      {loading ? (
        <p>Loading...</p>
      ) : (
        friends.map((friend) => (
          <Link
            to={`/chat/room/${friend.username}`}
            onClick={() => handleSetFriend(friend.username)}
            style={
              location.pathname === `/chat/room/${friend.username}`
                ? activeLinkStyle
                : linkStyle
            }
          >
            <ListGroup.Item style={{ cursor: "pointer" }} key={friend._id}>
              {friend.username}{" "}
              <Badge bg={friend.status === "Online" ? "success" : "secondary"}>
                {friend.status}
              </Badge>
            </ListGroup.Item>
          </Link>
        ))
      )}
    </ListGroup>
  );
};

export default ChatList;
