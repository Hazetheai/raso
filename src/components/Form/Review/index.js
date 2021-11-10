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
        <Fieldset title="Daten überprüfen und abschicken">
          <Field
            type="select"
            fullWidth
            topLabel="Wähle hier dein zuständiges Finanzamt"
            name="taxOffice"
            ref={register({
              required: true,
              validate: (value) =>
                !/choose/.test(value) ||
                "Please select the district your Finanzamt is in",
            })}
            autoFocus={true}
            errors={errors}
            watch={watch}
            options={tax_offices}
            fieldHelperText={`Wähle dein zuständiges Finanzamt.`}
            secondFieldHelperText={`<a href="https://www.bzst.de/DE/Service/Behoerdenwegweiser/Finanzamtsuche/GemFa/finanzamtsuche_node.html" target="_blank">Hier kannst du nach einem Finanzamt über PLZ oder den Namen der Gemeinde suchen</a>`}
          />
        </Fieldset>
      </div>
      <div className="form__review--actions">
        {!apiResponse.success && (
          <div className="tab-helper">
            <p>
              Bitte überprüfe deine Daten, um sicherzustellen, dass du alle
              Informationen korrekt eingegeben hast.
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
              text="Vorschau laden"
              className="body--big-bold"
              type="submit"
              isLoading={loading}
            />
          </div>
        )}

        {apiResponse.previewLink && (
          <div className="tab-helper">
            <p>
              Bitte überprüfe deine Daten, um sicherzustellen, dass du alle
              Informationen korrekt eingegeben hast.{" "}
            </p>
            <Link
              secondary
              ref={linkRef}
              className="body--big-bold"
              href={apiResponse.previewLink}
              target={"_blank"}
              rel="noopener"
              text={"Vorschau ansehen"}
              autoFocus
            />
          </div>
        )}

        {apiResponse.success && (
          <div className="tab-helper form_submit--review">
            <p className="body--medium">
              Nach dem Absenden des Formulars erhältst du deine Steuernummer vom
              Finanzamt per Post. In der Regel dauert es 3-6 Wochen, bis sie
              eintrifft.
            </p>
            <p className="body--small">
              Wenn du willst, kannst du zusätzlich auch einen unserer
              Partner-Steuerberater beauftragen, deine Angaben zu prüfen bevor
              du sie an das Finanzamt sendest.
            </p>

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
              className="body--big-bold"
              type="button"
            >
              <img src={eagle} alt="Ans Finanzamt senden" />
              Ans Finanzamt senden
            </Button>
          </div>
        )}
        <p className="body--small">
          Die in diesem Formular gegebenen Hinweise sind unverbindlich und
          ersetzen keinen Steuerberater. Bitte lass dir im Zweifel von einem
          Steuerberater helfen.
        </p>
        <p className="body--small">
          {apiResponse["code"] && (
            <span className="error-code">Code: {apiResponse["code"]}</span>
          )}
          {apiResponse["message"] && (
            <span className="error-message">{apiResponse["message"]}</span>
          )}
        </p>
      </div>
      <div className="form-invalid">
        {" "}
        {isEmpty(errors) ? null : t("form_invalid")}
      </div>
    </form>
  );
};
export default Review;
