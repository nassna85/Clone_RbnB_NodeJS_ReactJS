import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import HomePage from "./pages/HomePage";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
      <Router>
         <Navigation />
         <main>
             <Switch>
                <Route exact path="/" component={HomePage} />
            </Switch>
         </main>
        <Footer/>
      </Router>
  );
};

export default App;
