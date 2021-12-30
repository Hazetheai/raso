import produce from "immer";
import qs from "qs";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { isDev } from "settings/config";

function handleVersionQueryString(qstr, prop) {
  const s = qstr.replace(/^\?/, "");
  if (!s) {
    return "a";
  }
  const result = qs.parse(s)[prop] || "a";
  return result;
}

const UserTestingContext = createContext();

const useUserTesting = () => {
  return useContext(UserTestingContext);
};

const UserTestingProvider = ({ children }) => {
  const { search } = useLocation();

  const initialTestingData = {
    successPage: handleVersionQueryString(search, "sp"),
    videoSection: handleVersionQueryString(search, "vv"),
  };

  const [userTesting, setUserTestingHook] = useState(initialTestingData);

  useEffect(() => {
    const sessionUserTesting = JSON.parse(localStorage.getItem("userTesting"));
    if (sessionUserTesting) {
      setUserTestingHook(sessionUserTesting);
    }
  }, []);

  /**
   *
   * @param {*} newUserTesting
   * @param {boolean} save
   */
  const setUserTesting = (newUserTesting, save = true) => {
    isDev && console.log(`updating userTesting`);
    const newData = produce(userTesting, (draft) => {
      Object.assign(draft, newUserTesting);
    });

    if (save) {
      localStorage.setItem("userTesting", JSON.stringify(newData));
    }

    setUserTestingHook(newData);
  };
  return (
    <UserTestingContext.Provider value={{ userTesting, setUserTesting }}>
      {children}
    </UserTestingContext.Provider>
  );
};

export { UserTestingContext, useUserTesting, UserTestingProvider };
