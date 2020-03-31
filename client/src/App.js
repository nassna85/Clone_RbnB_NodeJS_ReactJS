import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import HomePage from "./pages/HomePage";
import Footer from "./components/footer/Footer";
import Ads from "./pages/Ads";

const App = () => {
  return (
      <Router>
         <Navigation />
         <main>
             <Switch>
                <Route exact path="/" component={ HomePage } />
                <Route path="/annonces" component={ Ads } />
            </Switch>
         </main>
        <Footer/>
      </Router>
  );
};

export default App;
