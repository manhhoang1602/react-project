import React from "react";
import "./App.scss";
import LayoutComponent from "./commons/layout/LayoutComponent";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <LayoutComponent />
    </BrowserRouter>
  );
}

export default App;
