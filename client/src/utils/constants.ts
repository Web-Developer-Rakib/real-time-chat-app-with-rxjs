import io from "socket.io-client";
export const baseURL = `${process.env.REACT_APP_SERVER_URL}/api/v1`;
export const socket = io(`${process.env.REACT_APP_SERVER_URL}`);
