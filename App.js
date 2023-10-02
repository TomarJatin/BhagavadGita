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
import { ChapterProvider } from "./contexts/ChapterContext";
import { VerseProvider } from "./contexts/VerseContext";
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
    <ThemeProvider>
      <ChapterProvider>
        <VerseProvider>
          <SaveForLaterProvider>
            <SettingsProvider>
              <Route />
            </SettingsProvider>
          </SaveForLaterProvider>
        </VerseProvider>
      </ChapterProvider>
    </ThemeProvider>
  );
}

export default App;
