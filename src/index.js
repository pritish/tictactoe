import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
// import Component1 from "./Component1";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
    {/* <Component1 /> */}
  </StrictMode>,
  rootElement
);
