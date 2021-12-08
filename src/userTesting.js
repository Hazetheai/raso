import produce from "immer";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserTestingContext = createContext();

const useUserTesting = () => {
  return useContext(UserTestingContext);
};

const UserTestingProvider = ({ children }) => {
  const [userTesting, setUserTestingHook] = useState({
    successPage: Math.random() > 0.5 ? "a" : "b",
    videoSection: "b", // Math.random() > 0.5 ? "a" : "b",
  });

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
