import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import thunk from "redux-thunk";
import App from "./App";
import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./Redux/reducer";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
