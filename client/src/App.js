import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <Navigation />
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
