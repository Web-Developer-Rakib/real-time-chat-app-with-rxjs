import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }: any) => {
  const loggedinUser = JSON.parse(localStorage.getItem("usersInfo") as any);
  const navigate = useNavigate();
  if (loggedinUser) {
    return children;
  } else {
    navigate("/");
  }
};

export default RequireAuth;
