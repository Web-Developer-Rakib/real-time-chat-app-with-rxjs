import axios from "axios";
import { useState } from "react";
import { baseURL } from "../utils/constants";

interface IUser {
  _id: string;
  username: string;
  status: string;
}
const userInitialState: IUser = {
  _id: "",
  username: "",
  status: "",
};
const useSingleUser = () => {
  const [user, setUser] = useState<IUser>(userInitialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchSingleUser = async (username: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/user/${username}`);
      setUser(response.data.user);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { user, setUser, loading, error, fetchSingleUser };
};

export default useSingleUser;
