import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import AuthAPI from "./services/authAPI";
import AuthContext from "./contexts/AuthContext";
import Navigation from "./components/navigation/Navigation";
import HomePage from "./pages/HomePage";
import Footer from "./components/footer/Footer";
import Ads from "./pages/Ads";
import ShowAd from "./pages/ShowAd";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import ShowProfileUser from "./pages/ShowProfileUser";
import AccessDenied from "./pages/AccessDenied";

//Verify if authenticate every times application refresh
AuthAPI.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthAPI.isAuthenticated()
    );

    const NavBarWithRouter = withRouter(Navigation);

    const contextValue = {
        isAuthenticated,
        setIsAuthenticated
    };

  return (
      <AuthContext.Provider value={ contextValue }>
          <Router>
             <NavBarWithRouter />
             <main>
                 <Switch>
                     <Route exact path="/" component={ HomePage } />
                     <Route path="/annonces/:slug/:id" component={ ShowAd } />
                     <Route path="/mon-profil/:id" component={ ShowProfileUser } />
                     <Route path="/inscription" component={ Registration } />
                     <Route path="/connexion" component={ Login } />
                     <Route path="/annonces" component={ Ads } />
                     <Route path="/404" component={ NotFound } />
                     <Route path="/403" component={ AccessDenied } />
                </Switch>
             </main>
            <Footer/>
          </Router>
          <ToastContainer position="top-left" />
      </AuthContext.Provider>
  );
};

export default App;
