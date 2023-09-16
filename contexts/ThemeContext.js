import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
// import FormData from "form-data";

// Define the context
const ThemeContext = createContext();

// Data Provider component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const getTheme = useCallback(async () => {
    const _theme = await AsyncStorage.getItem("theme");
    if(_theme){
    setTheme(_theme)
    }
  }, []);

  const changeTheme = useCallback(async () => {
    if(theme === 'light'){
      await AsyncStorage.setItem(
        "theme",
        'dark'
      );
      setTheme('dark');
    }
    else{
      await AsyncStorage.setItem(
        "theme",
        'light'
      );
      setTheme('light');
    }
  }, [theme])

  useEffect(() => {
    console.log("theme context changed ========================");
  });

  const ctx = React.useMemo(() => ({
   theme,
   setTheme,
   getTheme,
   changeTheme
  }), [theme]);

  return (
    <ThemeContext.Provider
      value={ctx}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };