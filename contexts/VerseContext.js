import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
// import FormData from "form-data";

// Define the context
const VerseContext = createContext();

// Data Provider component
const VerseProvider = ({ children }) => {
  const [selectedVerse, setSelectedVerse] = useState(0);

  useEffect(() => {
    console.log("chapter context changed ========================");
  });


  return (
    <VerseContext.Provider
      value={{
        selectedVerse,
        setSelectedVerse
      }}
    >
      {children}
    </VerseContext.Provider>
  );
};

export { VerseContext, VerseProvider };