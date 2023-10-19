import Card from "react-bootstrap/Card";
import { IMessage } from "./ChatRoom";
interface IProps {
  messages: IMessage[];
}
const ChatBubble = ({ messages }: IProps) => {
  const loggedinUser = JSON.parse(localStorage.getItem("usersInfo") as any);
  return (
    <>
      {!messages.length ? (
        <h3>Conversation not started yet</h3>
      ) : (
        messages.map((message) => (
          <Card
            key={message._id}
            border="primary"
            style={{
              width: "36rem",
              float:
                message.sender === loggedinUser.username ? "right" : "left",
              marginBottom: 10,
            }}
          >
            <Card.Header>
              {message.sender === loggedinUser.username ? "Me" : message.sender}
            </Card.Header>
            <Card.Body>
              <Card.Text>{message.message}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </>
  );
};

export default ChatBubble;
