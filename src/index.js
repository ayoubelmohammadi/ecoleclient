import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import * as PXBThemes from "@pxblue/themes/react";
import {Provider} from "react-redux";
import {store} from "./redux/store/store.js";

ReactDOM.render(
  <MuiThemeProvider theme={createMuiTheme(PXBThemes.blue)}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
