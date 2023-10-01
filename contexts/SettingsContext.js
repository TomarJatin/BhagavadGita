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
  const allTranslationsAuthors = [
    {
      author_name: "Swami Adidevananda",
      language: "english",
    },
    {
      author_name: "Swami Gambirananda",
      language: "english",
    },
    {
      author_name: "Swami Ramsukhdas",
      language: "hindi",
    },
    {
      author_name: "Swami Tejomayananda",
      language: "hindi",
    },
    {
      author_name: "Swami Sivananda",
      language: "english",
    },
    {
      author_name: "Dr. S. Sankaranarayan",
      language: "english",
    },
    {
      author_name: "Shri Purohit Swami",
      language: "english",
    },
  ];

  const handleAutoAuthorListFill = (_language) => {
    const _list = allTranslationsAuthors.filter((item) => (item.language === _language))
    setAuthorsList([..._list]);
  }

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

  useEffect(() => {
    handleAutoAuthorListFill(language);
  }, [])


  return (
    <SettingsContext.Provider
      value={{
        language,
        commentryOn,
        translationOn,
        transliteration,
        authorsList,
        wordMeaningOn,
        allTranslationsAuthors,

        handleAutoAuthorListFill,
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