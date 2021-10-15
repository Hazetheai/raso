import "./variables.css";
import "./App.css";
import "./reset.css";
import { Switch, Route, withRouter, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
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
import { FAlogEvent } from "./res/fpc";
import { getUtms } from "./res/utms";
// import { initTapfiliate } from "res/tapfiliate";

function App() {
  useEffect(() => {
    initIntercom();
    initAmplitude();
    initPixel();
    // initGTM(); // TODO Currently activating chrome Debugger ??
    // initTapfiliate();
    FAlogEvent();
  }, []);

  const location = useLocation();
  useEffect(() => {
    logPageView();

    const utms = getUtms();
    sendAmplitudeData("WEB_SIGNUP_PAGEVIEW", {
      path: location.pathname,
      country,
      ...utms,
    });
    setAmplitudeUserProperties({
      utms,
      ...utms,
      user_country: country,
    });
  }, [location.pathname, location.search]);

  return (
    <UserDataProvider>
      <Switch>
        <Fragment>
          <Route exact path="/" component={Signup} />
          <Route exact path="/en" component={Signup} />
        </Fragment>
      </Switch>
    </UserDataProvider>
  );
}

export default withRouter(App);
