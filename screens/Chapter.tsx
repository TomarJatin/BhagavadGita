import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import GestureRecognizer from 'react-native-swipe-gestures';
import { FontSize, color } from "../GlobalStyles";
import { Image } from "expo-image";
import { icons } from "../styles/Icon";
import { FlatList } from "react-native-gesture-handler";
import { Chapters } from "../data/chapters";
import { Verses } from "../data/verses";
import { ChapterContext } from "../contexts/ChapterContext";
import { VerseContext } from "../contexts/VerseContext";
import { translations } from "../translations/main";
import { SettingsContext } from "../contexts/SettingsContext";

export default function Chapter({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { selectedChapter, setSelectedChapter } = useContext(ChapterContext);
  const { setSelectedVerse } = useContext(VerseContext);
  const {language} = useContext(SettingsContext);
  const Color = color(theme);
  const Icons = icons(theme);

  const onSwipeLeft = () => {
    if (selectedChapter < 18) {
      setSelectedChapter(selectedChapter + 1);
    }
    else{
      setSelectedChapter(1);
    }
  };

  const onSwipeRight = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    }
    else{
      setSelectedChapter(18);
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return React.useMemo(
    () => (
      <GestureRecognizer
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={config}
        style={{ flex: 1}}
      >
        <SafeAreaView>
        <ImageBackground
          source={Icons.krishnaBg}
          resizeMode="contain"
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        />
        <FlatList
          data={["1"]}
          renderItem={() => (
            <View>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
              >
                <Image
                  style={{ width: 24, height: 24, borderRadius: 10 }}
                  contentFit="cover"
                  source={Icons.arrowLeft}
                />
              </TouchableOpacity>
              <View style={{ marginTop: 30 }}>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: 30,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 20, height: 20 }}
                      contentFit="cover"
                      source={Icons.flowerIcon}
                    />
                    <Text
                      style={{
                        fontSize: FontSize.regular14px,
                        color: Color.chapterHeading,
                        fontWeight: "600",
                      }}
                    >
                      {translations.chapter[language]} {selectedChapter}
                    </Text>
                    <Image
                      style={{ width: 20, height: 20 }}
                      contentFit="cover"
                      source={Icons.flowerIcon}
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: FontSize.regular13px,
                      color: Color.fontPrim,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {language === "english"? Chapters[selectedChapter - 1].name_translated: Chapters[selectedChapter - 1].name}
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: 30,
                    fontSize: FontSize.regular12px,
                    color: Color.fontPrim,
                    fontWeight: "400",
                    lineHeight: 20
                  }}
                >
                  {language === "english" ? Chapters[selectedChapter - 1].chapter_summary: Chapters[selectedChapter - 1].chapter_summary_hindi}
                </Text>
              </View>
              <FlatList
                data={Verses[selectedChapter]}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedVerse(item?.verse_number);
                      navigation.navigate("Verse");
                    }}

                    activeOpacity={0.7}
                    style={{
                      paddingBottom: 4,
                      borderBottomWidth: 1,
                      borderColor: Color.borderColorSecondary,
                      marginBottom: 16,
                      width: '100%'
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: '100%'
                      }}
                    >
                      <View style={{ flexDirection: "row", gap: 14 }}>
                        <Text
                          style={{
                            fontSize: FontSize.regular12px,
                            color: Color.fontPrim,
                            fontWeight: "600",
                          }}
                        >
                          {translations.Verse[language]} {item.verse_number}
                        </Text>
                      </View>
                      <Image
                        style={{ width: 5, height: 10, borderRadius: 10 }}
                        contentFit="cover"
                        source={Icons.chevronRight}
                      />
                    </View>
                    <Text style={{marginTop: 10,
                    fontSize: FontSize.regular12px,
                    color: Color.fontPrim,
                    fontWeight: "400",}}>{item.text}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                style={{
                  paddingBottom: 100,
                  marginTop: 30,
                }}
              />
            </View>
          )}
          keyExtractor={(item) => item}
          style={{
            padding: 15,
          }}
        />
      </SafeAreaView>
      </GestureRecognizer>
      
    ),
    [selectedChapter, theme]
  );
}
