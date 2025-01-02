import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/icons/icons.css";
import App from "./App";
//Lecture 29.0 Let's setup react router dom, npm i react-router-dom
import { BrowserRouter as Router } from "react-router-dom";
//Lecture 30.0 React Redux store explained and full setup, npm i redux react-redux redux-devtools-extension (ex:npm install react-redux --legacy-peer-deps)
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
//Lecture 30.1 Create reducers folder:index.js, userReducer.js
import rootReducer from "./reducers";
//Lecture 30.4 routers inside Provider
const store = createStore(rootReducer, composeWithDevTools());
ReactDOM.render(
  //Lecture 30.4 routers inside Provider
  <Provider store={store}>
    <Router>
      {/* //Lecture 29.1 go inside App */}
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
