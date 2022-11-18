import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Root from "./routes/root";
import { MasaProvider } from "@masa-finance/masa-react";
import { CreditReports } from "./routes/credit-reports";
import { ExampleLayout } from "./example-ui/layout";
import { BuyNowPayLaterExample } from "./routes/buy-now-pay-later-example";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ExampleLayout />,
    children: [
      {
        path: "credit-scores",
        element: <CreditReports />,
      },
      {
        path: "buy-now-pay-later",
        element: <BuyNowPayLaterExample />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <MasaProvider company="Teller" environment="dev">
      <RouterProvider router={router} />
    </MasaProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
