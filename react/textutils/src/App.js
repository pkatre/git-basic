import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import Alert from "./components/Alert";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

let name = "payal";
function App() {
  const [mode, setMode] = useState("light"); //whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  /*const removeBodyClasses = () => {
    document.body.classList.remove("bg-light");
    document.body.classList.remove("bg-dark");
    document.body.classList.remove("bg-warning");
    document.body.classList.remove("bg-danger");
    document.body.classList.remove("bg-success");
  };*/
  const toggleMode = () => {
    //removeBodyClasses();

    document.body.classList.add("light");
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("dark mode has been enabled", "success");
      document.title = "Textutils-dark mode";
      //setInterval(() => {
      //document.title = "textutils is amazing";
      //}, 2000);
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
      document.title = "Textutils-light mode";
    }
  };
  return (
    <>
      <Router>
        <Navbar
          title="Textutils"
          aboutText="About "
          mode={mode}
          toggleMode={toggleMode}
        />
        {/*<Navbar/>*/}
        <Alert alert={alert} />

        <div className="container my-3">
          <Switch>
            <Route exact path="/about">
              <About mode={mode} />
            </Route>

            <Route exact path="/">
              <TextForm
                showAlert={showAlert}
                heading="Textutils -word counter, charcter counter, Remove extra spaces"
                mode={mode}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
