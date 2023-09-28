import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { FontSize, color } from "../GlobalStyles";
import { Image } from "expo-image";
import { icons } from "../styles/Icon";
import { translations } from "../translations/main";
import { FlatList } from "react-native-gesture-handler";
import { Chapters } from "../data/chapters";
import { ChapterContext } from "../contexts/ChapterContext";
import { SettingsContext } from "../contexts/SettingsContext";

export default function HomeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const {setSelectedChapter} = useContext(ChapterContext);
  const {language} = useContext(SettingsContext);
  const Color = color(theme);
  const Icons = icons(theme);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Color.backgroundColor,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <Topbar />
      <FlatList
        data={["1"]}
        renderItem={() => (
          <View>

            {/* Verse of the Day */}
            <View
              style={{
                padding: 15,
                width: "100%", height: Dimensions.get("window").height*0.29
              }}
            >
              <ImageBackground
                style={{ width: "100%", height: Dimensions.get("window").height*0.26}} 
                imageStyle={{ borderRadius: 10}}
                resizeMode="contain"
                source={{uri: "https://cdn.pixabay.com/photo/2023/06/23/08/51/lord-krishna-8083043_1280.png"}}
              >
              </ImageBackground>
            </View>

            {/* Chapters */}
            <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
              <Text
                style={{
                  color: Color.fontPrim,
                  fontSize: FontSize.regular14px,
                  fontWeight: "700",
                  fontFamily: "Inter_700Bold",
                }}
              >
                {translations.chapters[language]}
              </Text>
              <View
                style={{
                  marginTop: 16,
                }}
              ></View>
              <FlatList
                data={Chapters}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => {
                    setSelectedChapter(item?.chapter_number);
                    navigation.navigate("Chapter");
                  }} activeOpacity={0.7}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingBottom: 4,
                      borderBottomWidth: 1,
                      borderColor: Color.borderColorSecondary,
                      marginBottom: 16,
                    }}
                  >
                    <View style={{ flexDirection: "row", gap: 14 }}>
                      <View
                        style={{
                          width: 17,
                          height: 17,
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: Color.bgPeach,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: FontSize.rehular10pxRegular_size,
                            color: Color.fontPink,
                            fontWeight: "700",
                          }}
                        >
                          {item?.chapter_number}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: FontSize.regular12px,
                            color: Color.fontPrim,
                            fontWeight: "500",
                          }}
                        >
                          {language === "english" ? item?.name_translated: item?.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 7,
                            alignItems: "center",
                            marginTop: 5,
                          }}
                        >
                          <Image
                            style={{
                              width: 9.1,
                              height: 6.5,
                              borderRadius: 10,
                            }}
                            contentFit="cover"
                            source={Icons.list}
                          />
                          <Text
                            style={{
                              fontSize: FontSize.small9px,
                              color: Color.fontSecondary,
                            }}
                          >
                            {item?.verses_count} {translations.verses[language]}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Image
                      style={{ width: 7, height: 13, borderRadius: 10 }}
                      contentFit="cover"
                      source={Icons.chevronRight}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                style={{
                  paddingBottom: 100
                }}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item}
      />

      <Navbar nav={"home"}/>
    </SafeAreaView>
  );
}
