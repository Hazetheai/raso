import "./reset.css";
import "./variables.css";
import "./App.css";
import { Switch, Route, withRouter, useLocation } from "react-router-dom";
import RASO from "pages/RASO";
import { UserDataProvider } from "./userData";
import { UserInteractionProvider } from "./userInteraction";
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
import { useTranslation } from "react-i18next";
import SuccessPage from "pages/RASO/success";

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (navigator.language.slice(0, 2) !== i18n.language) {
      i18n.changeLanguage(navigator.language.slice(0, 2));
    }
  }, []);
  // useEffect(() => {
  initIntercom();
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
      <UserInteractionProvider>
        <Header />
        <Switch>
          <Fragment>
            <Route exact path="/" component={RASO} />
            <Route exact path="/erfolg" component={SuccessPage} />

            <Route exact path="/en" component={RASO} />
            <Route exact path="/en/success" component={SuccessPage} />
          </Fragment>
        </Switch>
        <Footer />
      </UserInteractionProvider>
    </UserDataProvider>
  );
}

export default withRouter(App);
