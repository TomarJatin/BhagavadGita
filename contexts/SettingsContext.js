import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
// import FormData from "form-data";

// Define the context
const SettingsContext = createContext();

// Data Provider component
const SettingsProvider = ({ children }) => {
  const [language, setLanguage] = useState("english");
  const [commentryOn, setCommentryOn] = useState(true);
  const [wordMeaningOn, setWordMeaningOn] = useState(true);
  const [translationOn, setTranslationOn] = useState(true);
  const [transliteration, setTransliterationOn] = useState(true);
  const [authorsList, setAuthorsList] = useState([]);

  const handleSwitchButtonChange = (value, key) => {
    switch(key){
        case "commentry": setCommentryOn(value); return;
        case "translation" : setTranslationOn(value); return;
        case "word meaining": setWordMeaningOn(value); return;
        case "transliteration": setTransliterationOn(value); return; 
    }
  }

  useEffect(() => {
    console.log("settings context changed ========================");
  });


  return (
    <SettingsContext.Provider
      value={{
        language,
        commentryOn,
        translationOn,
        transliteration,
        authorsList,
        wordMeaningOn,

        handleSwitchButtonChange,
        setLanguage,
        setAuthorsList
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };