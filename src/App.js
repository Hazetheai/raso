import Footer from "components/Common/Footer";
import Header from "components/Common/Header";
import { UserInteractionProvider } from "data-layer/userInteraction";
import { UserTestingProvider } from "data-layer/userTesting";
import RASO from "pages/RASO";
import SuccessPage from "pages/RASO/success";
import Test from "pages/RASO/test";
import { Fragment, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { initPixel, logPageView } from "res/pixel";
import { isDev } from "settings/config";
import "./App.css";
import { UserDataProvider } from "./data-layer/userData";
import { initGTM } from "./res/gtag";
import { initIntercom } from "./res/intercom";
import "./reset.css";
import "./variables.css";

function App() {
  useEffect(() => {
    initIntercom();
    initPixel();
    initGTM();
  }, []);

  useEffect(() => {
    logPageView();
  }, []);

  return (
    <UserTestingProvider>
      <UserDataProvider>
        <UserInteractionProvider>
          <Header />
          <Switch>
            <Fragment>
              <Route exact path="/" render={(props) => <RASO />} />
              <Route exact path="/erfolg" render={(props) => <SuccessPage />} />

              <Route exact path="/en" render={(props) => <RASO />} />
              <Route
                exact
                path="/en/success"
                render={(props) => <SuccessPage />}
              />
              {isDev && (
                <Route exact path="/en/test" render={(props) => <Test />} />
              )}
            </Fragment>
          </Switch>
          <Footer />
        </UserInteractionProvider>
      </UserDataProvider>
    </UserTestingProvider>
  );
}

export default withRouter(App);
