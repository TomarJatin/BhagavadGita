import "react-native-gesture-handler";
import {
  useFonts,
  Inter_900Black,
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_500Medium,
  Inter_400Regular,
  Inter_300Light,
} from "@expo-google-fonts/inter";
import Route from "./navigation/home";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SaveForLaterProvider } from "./contexts/SaveForLaterContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import "expo-dev-client";

function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_500Medium,
    Inter_400Regular,
    Inter_300Light,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
          <SaveForLaterProvider>
            <SettingsProvider>
              <Route />
            </SettingsProvider>
          </SaveForLaterProvider>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
