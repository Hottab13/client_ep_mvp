import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import styles from "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
