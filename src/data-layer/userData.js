import produce from "immer";
import React, { createContext, useContext, useEffect, useState } from "react";
import { isDev } from "settings/config";
import { initialUserData } from "data-layer/initialUserData";
const UserDataContext = createContext();

const useUserData = () => {
  return useContext(UserDataContext);
};

const UserDataProvider = ({ children }) => {
  const [userData, setUserDataHook] = useState(initialUserData);

  useEffect(() => {
    const sessionUserData = JSON.parse(localStorage.getItem("userData"));
    if (sessionUserData) {
      setUserDataHook(sessionUserData);
    }
  }, []);

  /**
   *
   * @param {*} newUserData
   * @param {"personalFields"|"businessFields"|"taxInfoFields"|"taxEstimateFields"|"bankAccountFields"|"reviewFields"} dataSection
   * @param {boolean} save
   */
  const setUserData = (newUserData, dataSection, save = false) => {
    isDev && console.log(`updating userData`);
    const newData = produce(userData, (draft) => {
      draft[dataSection] = { ...draft[dataSection], ...newUserData };
    });
    if (save) {
      localStorage.setItem("userData", JSON.stringify(newData));
    }
    setUserDataHook(newData);
  };

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, useUserData, UserDataProvider };
