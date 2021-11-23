import Footer from "components/Common/Footer";
import Header from "components/Common/Header";
import RASO from "pages/RASO";
import SuccessPage from "pages/RASO/success";
import { Fragment, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { initPixel, logPageView } from "res/pixel";
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
          </Fragment>
        </Switch>
        <Footer />
      </UserInteractionProvider>
    </UserDataProvider>
  );
}

export default withRouter(App);
