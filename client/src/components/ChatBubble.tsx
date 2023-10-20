import moment from "moment";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { IMessage } from "./ChatRoom";
interface IProps {
  messages: IMessage[];
}
const ChatBubble = ({ messages }: IProps) => {
  const loggedinUser = JSON.parse(localStorage.getItem("usersInfo") as any);
  const { username } = useParams();
  return (
    <>
      {!messages.length ? (
        <h4 className="text-center">{`No chat history with ${username}.`}</h4>
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
              <b>
                {message.sender === loggedinUser.username
                  ? "Me"
                  : message.sender}
              </b>{" "}
              <br />
              <small>{moment(message.createdAt).calendar()}</small>
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
