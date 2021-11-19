import Footer from "components/Common/Footer";
import Header from "components/Common/Header";
import RASO from "pages/RASO";
import SuccessPage from "pages/RASO/success";
import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import { initAmplitude } from "./res/amplitude";
import { gtagEvent, initGTM } from "./res/gtag";
import { initIntercom } from "./res/intercom";
import "./reset.css";
import { UserDataProvider } from "./userData";
import { UserInteractionProvider } from "./userInteraction";
import "./variables.css";

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (navigator.language.slice(0, 2) !== i18n.language) {
      i18n.changeLanguage(navigator.language.slice(0, 2));
    }
  }, []);

  useEffect(() => {
    initIntercom();
    initAmplitude();
    // initPixel();
    initGTM();
  }, []);

  useEffect(() => {
    // logPageView();
    gtagEvent("RASO_PAGEVIEW-ITER-1", { path: window.location.pathname });
    gtagEvent("RASO_TAB-ITER-1", { tab: "#personal" });
  }, []);

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
