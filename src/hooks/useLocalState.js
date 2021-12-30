import { isEqual } from "lodash";
import { useEffect } from "react";
import { debounce, isEmpty } from "res/lib";
import { isDev } from "settings/config";
import { useUserData } from "data-layer/userData";
import { useUserInteraction } from "data-layer/userInteraction";
import {
  formatDatasection,
  reFormatForFormData,
} from "../components/Form/helper-functions/data-shaping";

const logEvents = false;

export function useLocalFormVal({ key, reset, localFormVals, errors }) {
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const { userData, setUserData } = useUserData();

  const ls = localStorage.getItem(key);
  const noErrors = isEmpty(errors);

  const dbDeactivateAutoSave = debounce(
    () =>
      setTimeout(() => {
        isDev && logEvents && console.log(`deactivating autosave`);
        setUserInteraction({ isAutoSaving: false });
      }, 1000),
    300
  );

  //   reset to local form values (Step has not been completed)
  useEffect(() => {
    isDev &&
      logEvents &&
      console.log(`calling 1st hook (reset to local form value)`);
    if (
      !userInteraction.stepsCompleted.includes(key) &&
      !userInteraction.touchedScreens.includes(key)
    ) {
      isDev && logEvents && console.log(`resetting to userData`, userData[key]);
      reset(reFormatForFormData(userData[key]));
      return;
    }
    if (!userInteraction.stepsCompleted.includes(key) && ls) {
      isDev && logEvents && console.log(`resetting to localstorage`);
      reset(reFormatForFormData(JSON.parse(ls)));
    }
  }, []);

  // Save local changes to completed steps automatically
  useEffect(() => {
    if (
      noErrors &&
      userInteraction.stepsCompleted.includes(key) &&
      !isEqual(
        userData[key],
        formatDatasection({ ...userData[key], ...localFormVals })
      )
    ) {
      isDev &&
        logEvents &&
        console.log(`calling 2nd hook (Save local changes to completed steps)`);
      setUserInteraction({
        isAutoSaving: true,
        // Reset Review screen to force regeneration of the pdf
        success: false,
        previewLink: "",
        code: "",
        message: "",
        stepsCompleted: [
          ...userInteraction.stepsCompleted.filter(
            (el) => el !== "reviewFields"
          ),
        ],
      });

      setUserData(
        formatDatasection({ ...userData[key], ...localFormVals }),
        key,
        true
      );

      dbDeactivateAutoSave();
    }

    if (userInteraction.isAutoSaving) {
      dbDeactivateAutoSave();
    }
  }, [reset, localFormVals]);

  // Save the local form Values
  useEffect(() => {
    isDev && logEvents && console.log(`calling 3rd hook`);
    // no local storage for key => set key
    if (!ls) {
      isDev && logEvents && console.log(`setting local storage with userData`);
      localStorage.setItem(
        key,
        JSON.stringify(reFormatForFormData(userData[key]))
      );
    }
    // Userdata and local storage do not match current form state
    if (
      !isEqual(
        userData[key],
        formatDatasection({ ...userData[key], ...localFormVals })
      ) &&
      !isEqual(localFormVals, ls ? JSON.parse(ls) : {}) &&
      !isEmpty(localFormVals)
    ) {
      isDev && logEvents && console.log(`setting local storage localFormVals`);
      localStorage.setItem(key, JSON.stringify(localFormVals));
    }
  }, [localFormVals]);

  //   reset to User Data (Step has been completed)
  useEffect(() => {
    if (userInteraction.stepsCompleted.includes(key) && noErrors) {
      isDev &&
        logEvents &&
        console.log(
          `calling 4th hook (reset to User Data (Step has been completed))`
        );
      reset(reFormatForFormData(userData[key]));
    }
  }, [userInteraction.stepsCompleted, noErrors]);
}
