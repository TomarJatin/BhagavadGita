import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
// import FormData from "form-data";

// Define the context
const SaveForLaterContext = createContext();

// Data Provider component
const SaveForLaterProvider = ({ children }) => {
  const [saveForLater, setSaveForLater] = useState([]);

  // {
  //   verseId: 2,
  //   chapterId: 4,
  //   verse: ""
  // }

  useEffect(() => {
    console.log("save for later context changed ========================");
  });


  return (
    <SaveForLaterContext.Provider
      value={{
        saveForLater, setSaveForLater
      }}
    >
      {children}
    </SaveForLaterContext.Provider>
  );
};

export { SaveForLaterContext, SaveForLaterProvider };