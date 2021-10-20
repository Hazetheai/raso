import React, { Fragment, useState } from "react";
import "./thankyou.css";
import { useUserData } from "../../userData";
import Logo from "../../Common/Logo";
import Headline from "../../Common/Headline";
import { useTranslation } from "react-i18next";
import PhoneImg from "./phone.png";
import AppleStore from "./applestore.png";
import GooglePlay from "./googleplay.png";
import boldFormatter from "../../res/boldFormatter";
import { sendAmplitudeData } from "../../res/amplitude";
import { country } from "../../settings/config";
import Field from "../../components/Form/Field";
import { useForm } from "react-hook-form";
import { setIntercomPhone } from "../../res/intercom";

const ThankYou = () => {
  const { userData } = useUserData();
  const { t } = useTranslation();
  const [textMessageSent, setTextMessageSent] = useState(false);
  const { register, handleSubmit, watch, errors, control } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => sendTextMessage(undefined, data);
  const sendTextMessage = async (e, data = {}) => {
    if (e) e.preventDefault();
    sendAmplitudeData("WEB_SIGNUP_SENDSMS");
    let params = {
      PHONE: data.phoneNumber || userData.phoneNumber,
      LANGUAGE: t("current_language"),
      api: true,
    };

    setIntercomPhone(
      data.phoneNumber || userData.phoneNumber,
      t("current_language")
    );

    let formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }

    const response = await fetch(
      country == "de"
        ? "https://accountable.de/danke/"
        : "https://www.accountable.eu/thanks/",
      {
        method: "POST",
        body: formData,
      }
    );
    const json = await response.json();
    if (json.ok) setTextMessageSent(true);
  };
  return (
    <div>
      <Logo />
      <Headline centered>{t("thanks_congrats")}</Headline>
      <p className="thankyou-p">{t("thanks_account_created")}</p>
      {userData.email && (
        <div className="thankyou-emailaccount">
          <span className="thankyou-emailaccount_email">{userData.email}</span>
        </div>
      )}
      <div className="thanks_content">
        <img src={PhoneImg} className="thankyou-desktop thanks_content_phone" />
        {userData.rasoRef && (
          <Fragment>
            <p className="thankyou-p thankyou-p--alignleft">
              {boldFormatter(t("thanks_raso_pdf_received"))}
            </p>
            <a
              href={`https://www.accountable.de/r/?t=${userData.rasoRef}&d=1`}
              target="_blank"
              rel="noopener"
              onClick={() => sendAmplitudeData("WEB_SIGNUP_CLICKEDSHOWPDF")}
            >
              <button className="form_submit_btn form_submit_btn--alt">
                {t("thanks_raso_open_pdf")}
              </button>
            </a>
            <br />
            <br />
            <br />
          </Fragment>
        )}
        {!userData.rasoRef ? (
          <Fragment>
            <p className="thankyou-p thankyou-mobile">
              {boldFormatter(t("thanks_nextstep"))}
            </p>
            {userData.email && (
              <p className="thankyou-p thankyou-mobile">
                {t("thanks_weblogin", { email: userData.email })}
              </p>
            )}
          </Fragment>
        ) : (
          <p className="thankyou-p thankyou-p--alignleft">
            {boldFormatter(t("thanks_raso_next_step"))}
          </p>
        )}
        <div className="form_submit thankyou-mobile">
          <a
            href={t("download_app_url")}
            onClick={() => sendAmplitudeData("WEB_SIGNUP_CLICKEDSTORE")}
          >
            <button className="form_submit_btn">{t("download_the_app")}</button>
          </a>
        </div>
        {!userData.rasoRef && (
          <Fragment>
            <p className="thankyou-p thankyou-p--alignleft thankyou-desktop">
              {boldFormatter(t("thanks_next_step_headline"))}
            </p>
            <p className="thankyou-p thankyou-p--alignleft thankyou-desktop">
              {t("thanks_mobile_first")}
            </p>
            <p className="thankyou-p thankyou-p--alignleft thankyou-desktop">
              {t("thanks_try_it_out")}
            </p>
          </Fragment>
        )}
        {!textMessageSent ? (
          userData.phoneNumber ? (
            <Fragment>
              <p className="thankyou-p thankyou-p--alignleft thankyou-p--smaller thankyou-desktop">
                {t("thanks_text_send", { phone: userData.phoneNumber })}
              </p>

              <button
                className="thankyou-desktop form_submit_btn"
                onClick={sendTextMessage}
              >
                {t("thanks_text_me_the_app")}
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Field
                  type="phone"
                  type="phone"
                  name="phoneNumber"
                  label={t("phone_label")}
                  errors={errors}
                  control={control}
                  shorter={true}
                />
                <button className="form_submit_btn">
                  {t("thanks_text_me_the_app")}
                </button>
              </form>
            </Fragment>
          )
        ) : (
          <span className="thankyou-smssent">{t("thanks_text_sent")}</span>
        )}
        <div className="stores">
          <a
            href={t("app_store_url")}
            onClick={() =>
              sendAmplitudeData("WEB_SIGNUP_CLICKEDSTORE", {
                store: "Apple Store",
              })
            }
            target="_blank"
            rel="noopener"
            className="download-accountable-ios"
          >
            <img
              src={AppleStore}
              className="stores_store"
              alt="Download Accountable Self-Employed sur l'IOS App Store"
            />
          </a>
          <a
            href={t("google_play_url")}
            onClick={() =>
              sendAmplitudeData("WEB_SIGNUP_CLICKEDSTORE", {
                store: "Google Play",
              })
            }
            target="_blank"
            rel="noopener"
            className="download-accountable-android"
          >
            <img
              src={GooglePlay}
              className="stores_store"
              alt="Download Accountable Self-Employed on the Google Play Store"
            />
          </a>
        </div>
      </div>
      <a
        href="https://web.accountable.eu/"
        className="thankyou-desktop thankyou-weblink"
        onClick={() => sendAmplitudeData("WEB_SIGNUP_CLICKEDWEB")}
      >
        {t("thanks_web_version")}
      </a>
    </div>
  );
};
export default ThankYou;
