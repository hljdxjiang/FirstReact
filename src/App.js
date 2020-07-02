import React from "react";
//import logo from "./logo.svg";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { store } from "./store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import DefaultLayout from "./layout/defaultLayout";
import Login from "./pages/login";
import Login2 from "./pages/login/Login2";
import Error404 from "./pages/error/Error404";
import "./App.css";

import "antd/dist/antd.css";

const history = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)} />
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/index/dashboard/index" push />}
            />
            <Route path="/index" component={DefaultLayout} />
            <Route path="/login" component={Login} />
            <Route path="/login2" component={Login2} />
            <Route path="/404" component={Error404} />
            <Route component={Error404} />
            {/* <Route component={NotFound} /> */} */}
          </Switch>
        </Router>
      </Provider>
    );
  }
}
export default App;
