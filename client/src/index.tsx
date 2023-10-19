import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import RequireAuth from "./components/RequireAuth";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Conversations from "./views/Conversations";
import Login from "./views/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/chat",
    element: <Conversations />,
    children: [
      {
        path: "/chat/room/:username/:status",
        element: (
          <RequireAuth>
            <ChatRoom />
          </RequireAuth>
        ),
      },
    ],
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
