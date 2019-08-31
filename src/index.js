import React from "react";
import ReactDOM from "react-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import ReduxToastr from "react-redux-toastr";
import { ToastContainer } from "react-toastify";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { configureStore } from "./app/store/configureStore";

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "rgb(23, 105, 170)",
      dark: "#000"
    },
    secondary: {
      main: "#f44336"
    }
  },
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      {/* <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-left"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      /> */}
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
