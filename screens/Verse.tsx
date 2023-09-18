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
import { FontSize, color } from "../GlobalStyles";
import { Image } from "expo-image";
import { icons } from "../styles/Icon";
import { FlatList } from "react-native-gesture-handler";
import { Chapters } from "../data/chapters";
import { Verses } from "../data/verses";
import { ChapterContext } from "../contexts/ChapterContext";
import { VerseContext } from "../contexts/VerseContext";

export default function Verse({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { selectedChapter } = useContext(ChapterContext);
  const { selectedVerse } = useContext(VerseContext);
  const Color = color(theme);
  const Icons = icons(theme);

  return React.useMemo(
    () => (
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
              {/* topbar */}
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
             </View>

              <View style={{ marginTop: 30 }}>
                <View>
                  {/* <View
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
                      CHAPTER {selectedChapter}
                    </Text>
                    <Image
                      style={{ width: 20, height: 20 }}
                      contentFit="cover"
                      source={Icons.flowerIcon}
                    />
                  </View> */}
                  <Text
                      style={{
                        fontSize: FontSize.regular16px,
                        color: Color.fontPrim,
                        fontWeight: "600",
                        textAlign: 'center'
                      }}
                    >
                      {selectedChapter}.{selectedVerse}
                    </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: FontSize.regular13px,
                      color: Color.gold,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {Verses[selectedChapter][selectedVerse-1].text}
                  </Text>
                </View>
                <View style={{marginTop: 30}}>
                  <Text
                    style={{
                      fontSize: FontSize.regular13px,
                      color: Color.fontPrim,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    TRANSLITERATION
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: FontSize.regular12px,
                      color: Color.fontPrim,
                      fontWeight: "400",
                      textAlign: "center",
                      fontStyle: 'italic',
                      letterSpacing: 1,
                      lineHeight: 20
                    }}
                  >
                    {Verses[selectedChapter][selectedVerse-1].transliteration}
                  </Text>
                </View>
                <View style={{marginTop: 30}}>
                  <Text
                    style={{
                      fontSize: FontSize.regular13px,
                      color: Color.fontPrim,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    WORD MEANINGS
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: FontSize.regular12px,
                      color: Color.fontPrim,
                      fontWeight: "400",
                      textAlign: "center",
                      lineHeight: 20
                    }}
                  >
                    {Verses[selectedChapter][selectedVerse-1].word_meanings}
                  </Text>
                </View>
                <View style={{marginTop: 30}}>
                  <Text
                    style={{
                      fontSize: FontSize.regular13px,
                      color: Color.fontPrim,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    TRANSLATION
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: FontSize.regular12px,
                      color: Color.fontPrim,
                      fontWeight: "400",
                      textAlign: "center",
                      lineHeight: 20
                    }}
                  >
                    {Verses[selectedChapter][selectedVerse-1].translations[0].description}
                  </Text>
                </View>
                <View style={{marginTop: 30, paddingBottom:100}}>
                  <Text
                    style={{
                      fontSize: FontSize.regular13px,
                      color: Color.fontPrim,
                      fontWeight: "600",
                      textAlign: "center",
                      
                    }}
                  >
                    COMMENTARY
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: FontSize.regular12px,
                      color: Color.fontPrim,
                      fontWeight: "400",
                      textAlign: "center",
                      lineHeight: 20
                    }}
                  >
                    {Verses[selectedChapter][selectedVerse-1].commentaries[0].description}
                  </Text>
                </View>
                {/* <Text
                  style={{
                    marginTop: 30,
                    fontSize: FontSize.regular12px,
                    color: Color.fontPrim,
                    fontWeight: "400",
                  }}
                >
                  {Chapters[selectedChapter - 1].chapter_summary_hindi}
                </Text> */}
              </View>
              {/* <FlatList
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
                          Verse {item.verse_number}
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
              /> */}
            </View>
          )}
          keyExtractor={(item) => item}
          style={{
            padding: 15,
          }}
        />
      </SafeAreaView>
    ),
    [selectedChapter, theme, selectedVerse]
  );
}
