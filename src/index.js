import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MasaProvider } from "@masa-finance/masa-react";
import { CreditScores } from "./routes/credit-scores";
import { ExampleLayout } from "./example-ui/layout";
import { BuyNowPayLaterExample } from "./routes/buy-now-pay-later-example";
import { Green } from "./routes/green";
import { SoulNames } from "./routes/soul-names";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ExampleLayout />,
    children: [
      {
        path: "credit-scores",
        element: <CreditScores />,
      },
      {
        path: "masa-green",
        element: <Green />,
      },
      {
        path: "soul-names",
        element: <SoulNames />,
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
    <MasaProvider company="Teller" environmentName="dev">
      <RouterProvider router={router} />
    </MasaProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
