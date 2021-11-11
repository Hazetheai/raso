import Button from "components/Button";
import Link from "components/Link";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import tax_offices from "res/FormData/tax_office.json";
import eagle from "res/images/eagle.png";
import { isEmpty } from "res/lib";
import { useUserData } from "userData";
import Field from "../../Field";
import Fieldset from "../Fieldset";
import { previewForm, sendForm } from "../sendData";

const Review = ({
  steps,
  currentStep,
  nextStep,
  defaultValues,
  comingStep,
}) => {
  const { register, handleSubmit, watch, errors, control, reset } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => nextStep(data, "reviewFields", false);
  //   const showBusinessReview_field_value = watch("showBusinessReview");

  const { t } = useTranslation();
  const { userData, setUserData } = useUserData();
  const [errorsVisible, setErrorsVisible] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    success: false,
    previewLink: "",
  });

  const linkRef = useRef(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    reset(defaultValues); // asynchronously reset your form values
  }, []);

  useEffect(() => {
    if (linkRef?.current && apiResponse.previewLink) {
      linkRef.current.focus();
    }
  }, [linkRef, apiResponse]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     sendAmplitudeData("WEB_SIGNUP_TABVIEW", {
  //       tab: "review",
  //     });
  //   }, 500);
  // }, []);
  return (
    <form id={currentStep.tabId} onSubmit={handleSubmit(onSubmit)}>
      <div className="form">
        <Fieldset title={t("review_proof_read_fieldset_title")}>
          <Field
            type="select"
            fullWidth
            topLabel={t("taxOffice_label")}
            name="taxOffice"
            ref={register({
              required: true,
              validate: (value) => !/choose/.test(value) || t("field_invalid"),
            })}
            autoFocus={true}
            errors={errors}
            watch={watch}
            options={tax_offices}
            fieldHelperText={t("taxOffice_helper")}
            secondFieldHelperText={t("taxOffice_helper_2")}
          />
        </Fieldset>
      </div>
      <div className="form__review--actions">
        {!apiResponse.success && (
          <div className="tab-helper">
            <p className="tab-helper__heading">
              {t("review_proof_read", {
                interpolation: { escapeValue: false },
              })}
            </p>
            {console.log(`apiResponse`, apiResponse)}
            <Button
              func={async () => {
                setLoading(true);
                const ar = await previewForm({
                  fields: userData,
                  preview: true,
                  sLang: "en",
                  sPartner: "",
                });
                setApiResponse(ar);
                setLoading(false);
              }}
              text={t("review_button_gen_pdf")}
              className="body--big-bold"
              type="submit"
              isLoading={loading}
            />
          </div>
        )}

        {apiResponse.previewLink && (
          <div className="tab-helper">
            <p className="tab-helper__heading">
              {t("review_proof_read", {
                interpolation: { escapeValue: false },
              })}
            </p>
            <Link
              secondary
              ref={linkRef}
              className="body--big-bold"
              href={apiResponse.previewLink}
              target={"_blank"}
              rel="noopener"
              text={t("review_button_view_pdf")}
              autoFocus
            />
          </div>
        )}

        {apiResponse.success && (
          <div className="tab-helper form_submit--review">
            <p className="body--medium">{t("review_button_success_heading")}</p>
            <p className="body--small">{t("review_button_success_subtitle")}</p>

            <Button
              func={async () => {
                const ar = await sendForm({
                  fields: userData,
                  preview: true,
                  sLang: "en",
                  sPartner: "",
                });
                setApiResponse(ar);
              }}
              disabled
              className="body--big-bold"
              type="button"
            >
              <img src={eagle} alt="Ans Finanzamt senden" />
              {t("review_button_send_pdf")}
            </Button>
          </div>
        )}
        <p className="body--small">{t("disclaimer")}</p>
        <p className="body--small">
          {apiResponse["code"] && (
            <span className="error-code">Code: {apiResponse["code"]}</span>
          )}
          {apiResponse["message"] && (
            <span className="error-message">{apiResponse["message"]}</span>
          )}
        </p>

        <div className="qa-errors">
          {apiResponse["code"] ? (
            <div>
              <Button
                func={() => setErrorsVisible(!errorsVisible)}
                text={errorsVisible ? "Hide" : "Show Errors"}
              />
              {errorsVisible && (
                <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div className="form-invalid">
        {" "}
        {/* {isEmpty(errors) ? null : t("form_invalid")} */}
      </div>
    </form>
  );
};
export default Review;
