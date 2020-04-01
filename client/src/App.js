import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import HomePage from "./pages/HomePage";
import Footer from "./components/footer/Footer";
import Ads from "./pages/Ads";
import ShowAd from "./pages/ShowAd";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
      <Router>
         <Navigation />
         <main>
             <Switch>
                <Route exact path="/" component={ HomePage } />
                 <Route path="/annonces/:slug/:id" component={ ShowAd } />
                <Route path="/annonces" component={ Ads } />
                 <Route path="/404" component={ NotFound } />
            </Switch>
         </main>
        <Footer/>
      </Router>
  );
};

export default App;
