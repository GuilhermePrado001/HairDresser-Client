import Header from "../../Components/Header/Header";
import SalonForm from "../../Components/SalonForm/SalonForm";
import SchedulingProvider from "../../Context/SchedulingContext";
import Home from "../Home/Home";
import History from "../History/History";
import Scheduling from "../Scheduling/Scheduling";
import Settings from "../Settings/Settings";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Callback } from "../../Components/Auth/Callback";
import { Logout } from "../../Components/Auth/Logout";
import { LogoutCallback } from "../../Components/Auth/LogoutCallback";
import { PrivateRoute } from "../../Components/Auth/PrivateRoute/PrivateRoute";
import { SilentRenew } from "../../Components/Auth/SilentRenew";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import "../Layout/Layout.scss";
import Reports from "../Reports/Reports";

function Layout({ hasSalon, setHasSalon }) {
  const { hasRole } = useContext(UserContext);

  return (
    <>
      <SchedulingProvider>
        <BrowserRouter>
          <Header logo={""} title="Squad Management Tool" />
          <div className="container-fluid app">
            <Switch>
              {/* AUTH ROUTES*/}
              <Route exact path="/signin-oidc" component={Callback} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/logout/callback" component={LogoutCallback} />
              <Route exact path="/silentrenew" component={SilentRenew} />

              {/* APP ROUTES*/}
              <PrivateRoute path="/" component={Home} exact />

              {hasRole("User") && (
                <PrivateRoute
                  path="/agendamentos"
                  component={Scheduling}
                  exact
                />
              )}

              {hasRole("User") && (
                <PrivateRoute path="/historico" component={History} exact />
              )}

              {hasRole("Admin") && (
                <PrivateRoute path="/relatorios" component={Reports} exact />
              )}

              {hasRole("Admin") && (
                <PrivateRoute path="/config" component={Settings} exact />
              )}
            </Switch>
          </div>
        </BrowserRouter>
      </SchedulingProvider>
      <SalonForm hasSalon={hasSalon} setHasSalon={setHasSalon} />
    </>
  );
}

export default Layout;
