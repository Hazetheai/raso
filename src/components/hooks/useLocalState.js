import { isEqual } from "lodash";
import { useEffect } from "react";
import { debounce, isEmpty } from "res/lib";
import { isDev } from "settings/config";
import { useUserData } from "userData";
import { useUserInteraction } from "userInteraction";
import {
  formatDatasection,
  reFormatForFormData,
} from "../Form/helper-functions/data-shaping";

export function useLocalFormVal({ key, reset, localFormVals, errors }) {
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const { userData, setUserData } = useUserData();

  const ls = localStorage.getItem(key);

  const dbDeactivateAutoSave = debounce(
    () =>
      setTimeout(() => {
        isDev && console.log(`deactivating autosave`);
        setUserInteraction({ isAutoSaving: false });
      }, 1000),
    300
  );

  //   reset to local form values (Step has not been completed)
  useEffect(() => {
    isDev && console.log(`calling 1st hook`, userInteraction);
    if (
      !userInteraction.stepsCompleted.includes(key) &&
      !userInteraction.touchedScreens.includes(key)
    ) {
      isDev && console.log(`resetting to userData`, userData[key]);
      reset(reFormatForFormData(userData[key]));
      return;
    }
    if (!userInteraction.stepsCompleted.includes(key) && ls) {
      isDev && console.log(`resetting to localstorage`);
      reset(reFormatForFormData(JSON.parse(ls)));
    }
  }, []);

  // Save local changes to completed steps automatically
  useEffect(() => {
    isDev && console.log(`calling 2nd hook`);
    if (
      isEmpty(errors) &&
      userInteraction.stepsCompleted.includes(key) &&
      !isEqual(
        userData[key],
        formatDatasection({ ...userData[key], ...localFormVals })
      )
    ) {
      isDev && console.log(`setting autosave changes`);
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
    isDev && console.log(`calling 3rd hook`);
    // no local storage for key => set key
    if (!ls) {
      isDev && console.log(`setting local storage with userData`);
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
      isDev && console.log(`setting local storage localFormVals`);
      localStorage.setItem(key, JSON.stringify(localFormVals));
    }
  }, [localFormVals]);

  //   reset to User Data form values (Step has been completed)
  useEffect(() => {
    isDev && console.log(`calling 4th hook`);
    if (userInteraction.stepsCompleted.includes(key)) {
      reset(reFormatForFormData(userData[key]));
    }
  }, [userInteraction.stepsCompleted]);
}
