import { useNavigate } from "react-router-dom";
import { user } from "../utils/constants";

const RequireAuth = ({ children }: any) => {
  const navigate = useNavigate();
  if (user) {
    return children;
  } else {
    navigate("/");
  }
};

export default RequireAuth;
