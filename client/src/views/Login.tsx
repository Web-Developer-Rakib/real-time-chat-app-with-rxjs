import { Container } from "react-bootstrap";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Container style={{ marginTop: 20, width: "50%" }}>
      <h2>Login</h2>
      <LoginForm />
    </Container>
  );
};

export default Login;
