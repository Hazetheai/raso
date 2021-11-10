import produce from "immer";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserInteractionContext = createContext();

const useUserInteraction = () => {
  return useContext(UserInteractionContext);
};

const UserInteractionProvider = ({ children }) => {
  const [userInteraction, setUserInteractionHook] = useState({
    startedFilling: false,
    stepsCompleted: [],
    workingStep: "",
    preview: false,
    send: false,
  });

  useEffect(() => {
    const sessionUserInteraction = JSON.parse(
      localStorage.getItem("userInteraction")
    );
    if (sessionUserInteraction) setUserInteractionHook(sessionUserInteraction);
  }, []);

  /**
   *
   * @param {*} newUserInteraction
   * @param {boolean} save
   */
  const setUserInteraction = (newUserInteraction, save = true) => {
    // console.log(`newUserInteraction`, newUserInteraction);
    const newData = produce(userInteraction, (draft) => {
      Object.assign(draft, newUserInteraction);
    });
    // console.log(`newData`, newData);

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
