import Footer from "components/Common/Footer";
import Header from "components/Common/Header";
import RASO from "pages/RASO";
import SuccessPage from "pages/RASO/success";
import Test from "pages/RASO/test";
import { Fragment, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { initPixel, logPageView } from "res/pixel";
import { isDev } from "settings/config";
import { UserTestingProvider } from "userTesting";
import "./App.css";
import { initAmplitude } from "./res/amplitude";
import { gtagEvent, initGTM } from "./res/gtag";
import { initIntercom } from "./res/intercom";
import "./reset.css";
import { UserDataProvider } from "./userData";
import { UserInteractionProvider } from "./userInteraction";
import "./variables.css";

function App() {
  useEffect(() => {
    initIntercom();
    initAmplitude();
    initPixel();
    initGTM();
  }, []);

  useEffect(() => {
    logPageView();
    gtagEvent("RASO_PAGEVIEW-ITER-1", { path: window.location.pathname });
    gtagEvent("RASO_TAB-ITER-1", { tab: "#personal" });
  }, []);

  return (
    <UserTestingProvider>
      <UserDataProvider>
        <UserInteractionProvider>
          <Header />
          <Switch>
            <Fragment>
              <Route exact path="/" render={(props) => <RASO lang="de" />} />
              <Route
                exact
                path="/erfolg"
                render={(props) => <SuccessPage lang="de" />}
              />

              <Route exact path="/en" render={(props) => <RASO lang="en" />} />
              <Route
                exact
                path="/en/success"
                render={(props) => <SuccessPage lang="en" />}
              />
              {isDev && (
                <Route
                  exact
                  path="/en/test"
                  render={(props) => <Test lang="en" />}
                />
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
