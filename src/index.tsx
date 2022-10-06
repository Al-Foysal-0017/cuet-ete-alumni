import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import reportWebVitals from "./reportWebVitals";
import "./_base.scss";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

const App = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Suspense fallback={<Loader />}>
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </React.StrictMode>
  </Suspense>
);

reportWebVitals();
