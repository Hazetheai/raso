import Button from "components/Button";
import Link from "components/Link";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import tax_offices from "res/FormData/de/tax_office.json";
import eagle from "res/images/eagle.png";
import { isEmpty } from "res/lib";
import { corsProxy } from "settings/config";
import { useUserData } from "userData";
import { useUserInteraction } from "userInteraction";
import Field from "../../Field";
import Fieldset from "../Fieldset";
import { previewForm, sendForm } from "../sendData";
import letter_data from "res/letterData.json";

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

  const { t } = useTranslation();
  const { userData, setUserData } = useUserData();
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const [errorsVisible, setErrorsVisible] = useState(false);
  const linkRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { previewLink, success, code = "", message = "" } = userInteraction;

  const taxOffice = watch("taxOffice");

  useEffect(() => {
    function getFinanzamtLetters(ld) {
      const fl = [];

      if (["002", "003"].includes(userData.personalFields.maritalstatus)) {
        fl.push(...ld.married_letters);
      } else {
        fl.push(...ld.single_letters);
      }

      if (userData.taxInfoFields.askVATnumber === "yes") {
        fl.push(...ld.with_vat_letters);
      }

      return fl;
    }

    setUserData(
      {
        finanzamtLetters: getFinanzamtLetters(letter_data),
      },
      "reviewFields"
    );
  }, []);

  useEffect(() => {
    reset(defaultValues); // asynchronously reset your form values
  }, []);

  useEffect(() => {
    if (linkRef?.current && previewLink) {
      linkRef.current.focus();
    }
  }, [linkRef, previewLink]);

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
        {!success && (
          <div className="tab-helper">
            <p className="tab-helper__heading">
              {t("review_proof_read", {
                interpolation: { escapeValue: false },
              })}
            </p>

            <Button
              func={async () => {
                setLoading(true);
                const ar = await previewForm({
                  fields: {
                    ...userData,
                    reviewFields: { ...userData.reviewFields, taxOffice },
                  },
                  preview: true,
                  sLang: "en",
                  sPartner: "",
                });
                setUserInteraction({ ...ar, preview: true });
                setLoading(false);
              }}
              text={t("review_button_gen_pdf")}
              className="body--big-bold"
              type="submit"
              isLoading={loading}
            />
          </div>
        )}

        {previewLink && (
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
              href={previewLink} //.replace(corsProxy, "")}
              target={"_blank"}
              rel="noopener"
              text={t("review_button_view_pdf")}
              autoFocus
            />
            <Link
              secondary
              className="body--big-bold"
              href={"/en/success"} //.replace(corsProxy, "")}
              text={"Go Success"}
              autoFocus
            />
          </div>
        )}

        {success && (
          <div className="tab-helper form_submit--review">
            <p className="body--medium">{t("review_button_success_heading")}</p>
            <p
              className="body--small"
              dangerouslySetInnerHTML={{
                __html: t("review_button_success_subtitle", {
                  interpolation: { escapeValue: false },
                }),
              }}
            />

            <Button
              func={async () => {
                const ar = await sendForm({
                  fields: userData,
                  preview: true,
                  sLang: "en",
                  sPartner: "",
                });
                setUserInteraction(ar);
              }}
              disabled
              className="body--big-bold"
              type="button"
            >
              <img src={eagle} alt={t("review_button_send_pdf")} />
              {t("review_button_send_pdf")}
            </Button>
          </div>
        )}
        <p className="body--small">{t("disclaimer")}</p>
        <p className="body--small">
          {code && !success && <span className="error-code">Code: {code}</span>}
          {message && !success && (
            <span className="error-message">{message}</span>
          )}
        </p>

        <div className="qa-errors">
          {code && !success ? (
            <div>
              <Button
                func={() => setErrorsVisible(!errorsVisible)}
                text={errorsVisible ? "Hide" : "Show Errors"}
              />
              {errorsVisible && (
                <pre>
                  {JSON.stringify(userInteraction?.data || {}, null, 2)}
                </pre>
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
