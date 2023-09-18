import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
// import FormData from "form-data";

// Define the context
const ChapterContext = createContext();

// Data Provider component
const ChapterProvider = ({ children }) => {
  const [selectedChapter, setSelectedChapter] = useState(0);

  useEffect(() => {
    console.log("chapter context changed ========================");
  });


  return (
    <ChapterContext.Provider
      value={{
        selectedChapter,
        setSelectedChapter
      }}
    >
      {children}
    </ChapterContext.Provider>
  );
};

export { ChapterContext, ChapterProvider };