import Button from "components/Button";
import Link from "components/Link";
import calcFinanzamtLetters from "components/PDFReader/calcFinanzamtLetters";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";
import tax_offices from "res/FormData/de/tax_office.json";
import { gtagEvent } from "res/gtag";
import eagle from "res/images/eagle.png";
import { isDev, isStaging } from "settings/config";
import { useUserData } from "userData";
import { useUserInteraction } from "userInteraction";
import { useUserTesting } from "userTesting";
import Field from "../../Field";
import { useLocalFormVal } from "../../hooks/useLocalState";
import Fieldset from "../Fieldset";
import FormHeader from "../FormHeader";
import { previewForm, sendForm } from "../sendData";

const Review = ({ currentStep, nextStep }) => {
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const { userTesting, setUserTesting } = useUserTesting();
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    reset,
    getValues,
    formState,
  } = useForm({
    mode: userInteraction.stepsCompleted.includes("reviewFields")
      ? "onChange"
      : "onBlur",
  });
  const onSubmit = (data) => nextStep(data, "reviewFields", false);

  const { t, i18n } = useTranslation();
  const { userData, setUserData } = useUserData();
  const [errorsVisible, setErrorsVisible] = useState(false);
  const linkRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      formState.isDirty &&
      !userInteraction.touchedScreens.includes(currentStep.tabId)
    ) {
      setUserInteraction({
        startedFilling: true,
        touchedScreens: [...userInteraction.touchedScreens, "reviewFields"],
      });
    }
  }, [formState.isDirty, setUserInteraction]);

  const { previewLink, success, code = "", message = "" } = userInteraction;

  const taxOffice = watch("taxOffice");

  useEffect(() => {
    setUserData(
      {
        finanzamtLetters: calcFinanzamtLetters(userData),
      },
      "reviewFields"
    );
  }, []);

  const localFormVals = getValues();
  useLocalFormVal({
    key: "reviewFields",
    reset,
    localFormVals,
    errors,
  });
  useEffect(() => {
    if (linkRef?.current && previewLink) {
      linkRef.current.focus();
    }
  }, [linkRef, previewLink]);

  useEffect(() => {
    if (userInteraction?.data?.data?.messages?.errors) {
      const submissionErrors = {};
      const accErrs = userInteraction?.data?.data?.messages?.errors?.forEach(
        (err, idx) => {
          submissionErrors[`error-${idx + 1}`] = err?.message.replace(
            /.+:\s/,
            ""
          );
          submissionErrors[`field-${idx + 1}`] = err?.context?.field;
        }
      );

      gtagEvent("RASO_SUBMISSION_ERROR", submissionErrors);
    }
  }, [userInteraction?.data?.data?.messages?.errors]);

  return (
    <>
      <form id={currentStep.tabId} onSubmit={handleSubmit(onSubmit)}>
        <Fieldset section>
          <div className="form">
            <FormHeader currentStep={currentStep} />
            <Fieldset title={t("review_proof_read_fieldset_title")}>
              <Field
                type="select"
                topLabel={t("taxOffice_label")}
                name="taxOffice"
                ref={register({
                  required: true,
                  validate: (value) =>
                    !/choose/.test(value) || t("field_invalid"),
                })}
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
                {userInteraction.stepsCompleted.length < 5 ? (
                  <p className="tab-helper__heading">
                    {t("review_please_complete", {
                      interpolation: { escapeValue: false },
                    })}
                  </p>
                ) : (
                  <p className="tab-helper__heading">
                    {t("review_proof_read", {
                      interpolation: { escapeValue: false },
                    })}
                  </p>
                )}
                {(isDev || isStaging) &&
                !/accountable/gi.test(userData.personalFields.email) ? (
                  <p style={{ color: "var(--color-invalid_red)" }}>
                    Please use an @accountable.eu address for testing
                  </p>
                ) : null}
                <Button
                  func={async () => {
                    if (userInteraction.stepsCompleted.length < 5) {
                      return;
                    }
                    setLoading(true);
                    const ar = await previewForm({
                      fields: {
                        ...userData,
                        reviewFields: { ...userData.reviewFields, taxOffice },
                      },
                      preview: true,
                      sLang: i18n.language,
                      sPartner: "",
                      successPageVersion: userTesting.successPage,
                    });
                    setUserInteraction({ ...ar, preview: true });
                    setLoading(false);
                  }}
                  disabled={
                    userInteraction.stepsCompleted.length < 5 ||
                    /choose/.test(taxOffice) ||
                    (isDev &&
                      !/accountable/gi.test(userData.personalFields.email)) ||
                    (isStaging &&
                      !/accountable/gi.test(userData.personalFields.email))
                  }
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
                  href={previewLink}
                  target={"_blank"}
                  rel="noopener"
                  text={t("review_button_view_pdf")}
                  autoFocus
                />
              </div>
            )}

            {success && (
              <div className="tab-helper form_submit--review">
                <p className="body--medium">
                  {t("review_button_success_heading")}
                </p>
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
                    setLoading(true);
                    const ar = await sendForm({
                      fields: userData,
                      preview: true,
                      sLang: i18n.language,
                      sPartner: "",
                      successPageVersion: userTesting.successPage,
                      videoSection: userTesting.videoSection,
                    });

                    setLoading(false);
                    nextStep(userData.reviewFields, "reviewFields", true, ar);
                  }}
                  isLoading={loading}
                  className="body--big-bold notranslate"
                  type="button"
                >
                  <img src={eagle} alt={t("review_button_send_pdf")} />
                  {t("review_button_send_pdf")}
                </Button>

                {userInteraction.nextVatDeadline.vatDeadline &&
                  !userInteraction.stepsCompleted.includes("reviewFields") &&
                  userTesting.successPage === "b" && (
                    <Redirect
                      to={i18n.language === "de" ? "/erfolg" : "/en/success"}
                    />
                  )}
              </div>
            )}
            <p className="body--small">{t("disclaimer")}</p>
            <div className="body--small">
              {code && !success && (
                <span className="error-code">Code: {code}</span>
              )}
              <hr />
              {userInteraction?.data?.data?.messages?.errors?.map(
                (err, idx, arr) => {
                  return (
                    <span key={err?.message || idx} className="error">
                      <p>
                        <strong>Error:</strong>{" "}
                        {err?.message.replace(/.+:\s/, "")}
                      </p>
                      <p>
                        <strong>Field:</strong> {err?.context?.field}
                      </p>
                      {idx < arr.length - 1 ? <hr /> : null}
                    </span>
                  );
                }
              )}
            </div>

            <div className="qa-errors">
              {code && !success ? (
                <div>
                  <div className="flex--between">
                    <Button
                      inline
                      fluid
                      func={() => setErrorsVisible(!errorsVisible)}
                      text={
                        errorsVisible
                          ? t("hide_full_error")
                          : t("show_full_error")
                      }
                    />
                    <Button
                      fluid
                      title={t("copy_to_clipboard")}
                      className={"submission-error__copy-icon"}
                      func={() =>
                        navigator.clipboard.writeText(
                          JSON.stringify(userInteraction?.data || {}, null, 2)
                        )
                      }
                    >
                      📋
                    </Button>
                  </div>
                  {errorsVisible && (
                    <>
                      <pre className="submission-error">
                        {JSON.stringify(userInteraction?.data || {}, null, 2)}
                      </pre>
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </Fieldset>
      </form>
    </>
  );
};
export default Review;
