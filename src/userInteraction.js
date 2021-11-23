import produce from "immer";
import React, { createContext, useContext, useEffect, useState } from "react";
import { dlAppLink } from "settings/config";

const UserInteractionContext = createContext();

const useUserInteraction = () => {
  return useContext(UserInteractionContext);
};

const UserInteractionProvider = ({ children }) => {
  const [userInteraction, setUserInteractionHook] = useState({
    startedFilling: false,
    helperId: "",
    touchedScreens: [],
    stepsCompleted: [],
    workingStep: "",
    clickedStart: false,
    isAutoSaving: false,
    preview: false,
    send: false,
    success: false,
    data: null,
    previewLink: "",
    ticketId: "",
    downloadAppLink_desktop: "",
    downloadAppLink_mobile: dlAppLink,
    showHeader: false,
    nextVatDeadline: {
      vatDeadline: "",
      showChargeVat: false,
    },
    code: "",
    message: "",
  });

  useEffect(() => {
    const sessionUserInteraction = JSON.parse(
      localStorage.getItem("userInteraction")
    );
    if (sessionUserInteraction) {
      setUserInteractionHook(sessionUserInteraction);
    }
  }, []);

  /**
   *
   * @param {*} newUserInteraction
   * @param {boolean} save
   */
  const setUserInteraction = (newUserInteraction, save = true) => {
    const newData = produce(userInteraction, (draft) => {
      Object.assign(draft, newUserInteraction);
    });

    if (save) {
      localStorage.setItem("userInteraction", JSON.stringify(newData));
    }

    setUserInteractionHook(newData);
  };
  return (
    <UserInteractionContext.Provider
      value={{ userInteraction, setUserInteraction }}
    >
      {children}
    </UserInteractionContext.Provider>
  );
};

export { UserInteractionContext, useUserInteraction, UserInteractionProvider };
