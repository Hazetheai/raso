import { useEffect } from "react";
import { debounce, isEmpty } from "res/lib";
import { useUserData } from "userData";
import { useUserInteraction } from "userInteraction";
import { formatDatasection, reFormatForFormData } from "../Form/helpers";
import { isEqual } from "lodash";

export function useLocalFormVal({ key, reset, localFormVals, errors }) {
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const { userData, setUserData } = useUserData();

  const ls = localStorage.getItem(key);

  const dbDeactivateAutoSave = debounce(
    () =>
      setTimeout(() => {
        setUserInteraction({ isAutoSaving: false });
      }, 1000),
    300
  );

  //   reset to local form values (Step has not been completed)
  useEffect(() => {
    if (
      !userInteraction.stepsCompleted.includes(key) &&
      !userInteraction.touchedScreens.includes(key)
    ) {
      console.log("resetting to default values");
      reset(reFormatForFormData(userData[key]));
      return;
    }
    if (!userInteraction.stepsCompleted.includes(key) && ls) {
      console.log("resetting to local Vals");
      reset(reFormatForFormData(JSON.parse(ls)));
    }
  }, []);

  // Save local changes to completed steps automatically
  useEffect(() => {
    if (
      isEmpty(errors) &&
      userInteraction.stepsCompleted.includes(key) &&
      !isEqual(
        userData[key],
        formatDatasection({ ...userData[key], ...localFormVals })
      )
    ) {
      setUserInteraction({ isAutoSaving: true });

      console.log("saving to User Data");

      setUserData(
        formatDatasection({ ...userData[key], ...localFormVals }),
        key,
        true
      );
      dbDeactivateAutoSave();
    }
  }, [reset, localFormVals]);

  // Save the local form Values
  useEffect(() => {
    if (!ls) {
      console.log("Setting initial local data");
      localStorage.setItem(
        key,
        JSON.stringify(reFormatForFormData(userData[key]))
      );
    }
    if (
      !isEqual(
        userData[key],
        formatDatasection({ ...userData[key], ...localFormVals })
      ) &&
      !isEqual(localFormVals, ls ? JSON.parse(ls) : {}) &&
      !isEmpty(localFormVals)
    ) {
      console.log("Saving local vals to storage");
      localStorage.setItem(key, JSON.stringify(localFormVals));
    }
  }, [localFormVals]);

  //   reset to User Data form values (Step has been completed)
  useEffect(() => {
    if (userInteraction.stepsCompleted.includes(key)) {
      console.log("resetting to User Data");
      reset(reFormatForFormData(userData[key]));
    }
  }, []);
}

/**
 *  // Save the local form Values
  useEffect(() => {
    if (!ls) {
      console.log("Setting initial local data");
      localStorage.setItem(key, reFormatForFormData(userData[key]));
    }
    if (
      !isEqual(
        userData[key],
        formatDatasection({ ...userData[key], ...localFormVals })
      ) &&
      !isEqual(localFormVals, ls ? JSON.parse(ls) : {}) &&
      !isEmpty(localFormVals)
    ) {
      console.log("Saving local vals to storage");
      localStorage.setItem(key, JSON.stringify(localFormVals));
    }
  }, [localFormVals]);
 */
