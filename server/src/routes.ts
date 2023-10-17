import chatRouter from "./chat/chat.routes";
import userRouter from "./user/user.routes";

const routes = [
  {
    route: userRouter,
    path: "user",
  },
  {
    route: chatRouter,
    path: "chat",
  },
];
export default routes;
