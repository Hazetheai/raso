import "./variables.css";
import "./App.css";
import "./reset.css";
import { Switch, Route, withRouter, useLocation } from "react-router-dom";
import RASO from "pages/RASO";
import { UserDataProvider } from "./userData";
import { Fragment, useEffect } from "react";
import { initIntercom } from "./res/intercom";
import {
  initAmplitude,
  sendAmplitudeData,
  setAmplitudeUserProperties,
} from "./res/amplitude";
import { initPixel, logPageView } from "./res/pixel";
import { initGTM } from "./res/gtag";
import { country } from "./settings/config";

import { getUtms } from "./res/utms";
import Header from "components/Common/Header";
import Footer from "components/Common/Footer";

function App() {
  // useEffect(() => {
  //   initIntercom();
  //   initAmplitude();
  //   initPixel();
  //   initGTM(); // TODO Currently activating chrome Debugger ??

  // }, []);

  // const location = useLocation();
  // useEffect(() => {
  //   logPageView();

  //   const utms = getUtms();
  //   sendAmplitudeData("WEB_SIGNUP_PAGEVIEW", {
  //     path: location.pathname,
  //     country,
  //     ...utms,
  //   });
  //   setAmplitudeUserProperties({
  //     utms,
  //     ...utms,
  //     user_country: country,
  //   });
  // }, [location.pathname, location.search]);

  return (
    <UserDataProvider>
      <Header />
      <Switch>
        <Fragment>
          <Route exact path="/" component={RASO} />
          <Route exact path="/en" component={RASO} />
        </Fragment>
      </Switch>
      <Footer />
    </UserDataProvider>
  );
}

export default withRouter(App);
