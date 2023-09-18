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
          <Route />
        </VerseProvider>
      </ChapterProvider>
    </ThemeProvider>
  );
}

export default App;
