import axios from "axios";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { baseURL, socket } from "../utils/constants";

const LoginForm = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${baseURL}/user/login`, {
        username,
        password,
      });
      socket.emit("userLoggedIn", username);
      localStorage.setItem(
        "usersInfo",
        JSON.stringify(response.data.usersInfo)
      );
      navigate("/chat");
    } catch (error: any) {
      setError(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" name="username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" />
      </Form.Group>
      <Button variant="primary" disabled={loading} type="submit">
        Login
      </Button>
      {error ? (
        <Alert style={{ marginTop: 10 }} variant={"danger"}>
          {error}
        </Alert>
      ) : null}
    </Form>
  );
};

export default LoginForm;
