import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Image } from "expo-image";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../contexts/ThemeContext";
import { FontSize, color } from "../GlobalStyles";
import { icons } from "../styles/Icon";
import Modal from "react-native-modal";
import { translations } from "../translations/main";
import { SettingsContext } from "../contexts/SettingsContext";

export default function Settings({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const {
    language,
    commentryOn,
    translationOn,
    transliteration,
    authorsList,
    wordMeaningOn,
    setLanguage,
    handleSwitchButtonChange,
    setAuthorsList
  } = useContext(SettingsContext);
  const [open, setOpen] = useState("");
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
  const Color = color(theme);
  const Icons = icons(theme);

  const isAuthorSelected = (author: {
    author_name: string,
    language: string
  }) => {
    return authorsList.some((item) => item.author_name === author.author_name)
  }

  const findSelectedAuthorIndex = (author: {
    author_name: string,
    language: string
  }) => {
    return authorsList.findIndex((item) => item.author_name === author.author_name)
  }

  

  return (
    <>
      <SafeAreaView>
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
              <View>
                <Text
                  style={{
                    fontSize: FontSize.regular14px,
                    color: Color.fontPrim,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  Settings
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "column",
                  gap: 15,
                  marginTop: 40,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setOpen("language")}
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                      }}
                      contentFit="cover"
                      source={Icons.language}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: FontSize.regular12px,
                          fontWeight: "500",
                          color: Color.fontPrim,
                        }}
                      >
                        Language
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.rehular10pxRegular_size,
                          fontWeight: "400",
                          marginTop: 5,
                          color: Color.fontSecondary,
                        }}
                      >
                        {language === "english" ? "English" : "Hindi"}
                      </Text>
                    </View>
                  </View>
                  <Image
                    style={{ width: 7, height: 13, borderRadius: 10 }}
                    contentFit="cover"
                    source={Icons.chevronRight}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                      }}
                      contentFit="cover"
                      source={Icons.commentary}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: FontSize.regular12px,
                          fontWeight: "500",
                          color: Color.fontPrim,
                        }}
                      >
                        Commentary
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.rehular10pxRegular_size,
                          fontWeight: "400",
                          marginTop: 5,
                          color: Color.fontSecondary,
                        }}
                      >
                        {commentryOn ? "ON" : "OFF"}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={commentryOn ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) =>
                      handleSwitchButtonChange(value, "commentry")
                    }
                    value={commentryOn}
                  />
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                      }}
                      contentFit="cover"
                      source={Icons.wordMeaning}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: FontSize.regular12px,
                          fontWeight: "500",
                          color: Color.fontPrim,
                        }}
                      >
                        Word meaning
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.rehular10pxRegular_size,
                          fontWeight: "400",
                          marginTop: 5,
                          color: Color.fontSecondary,
                        }}
                      >
                        {wordMeaningOn ? "ON" : "OFF"}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={wordMeaningOn ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) =>
                      handleSwitchButtonChange(value, "word meaining")
                    }
                    value={wordMeaningOn}
                  />
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                      }}
                      contentFit="cover"
                      source={Icons.translations}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: FontSize.regular12px,
                          fontWeight: "500",
                          color: Color.fontPrim,
                        }}
                      >
                        Translations
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.rehular10pxRegular_size,
                          fontWeight: "400",
                          marginTop: 5,
                          color: Color.fontSecondary,
                        }}
                      >
                        {translationOn ? "ON" : "OFF"}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={translationOn ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) =>
                      handleSwitchButtonChange(value, "translation")
                    }
                    value={translationOn}
                  />
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                      }}
                      contentFit="cover"
                      source={Icons.transliterations}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: FontSize.regular12px,
                          fontWeight: "500",
                          color: Color.fontPrim,
                        }}
                      >
                        Transliterations
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.rehular10pxRegular_size,
                          fontWeight: "400",
                          marginTop: 5,
                          color: Color.fontSecondary,
                        }}
                      >
                        {transliteration ? "ON" : "OFF"}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={transliteration ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) =>
                      handleSwitchButtonChange(value, "transliteration")
                    }
                    value={transliteration}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setOpen("authors")}
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                      }}
                      contentFit="cover"
                      source={Icons.author}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: FontSize.regular12px,
                          fontWeight: "500",
                          color: Color.fontPrim,
                        }}
                      >
                        Authors
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.rehular10pxRegular_size,
                          fontWeight: "400",
                          marginTop: 5,
                          color: Color.fontSecondary,
                        }}
                      >
                        List of all authors
                      </Text>
                    </View>
                  </View>
                  <Image
                    style={{ width: 7, height: 13, borderRadius: 10 }}
                    contentFit="cover"
                    source={Icons.chevronRight}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          style={{
            padding: 15,
          }}
        />
      </SafeAreaView>
      <Modal
        isVisible={open !== ""}
        onSwipeComplete={() => setOpen("")}
        onBackdropPress={() => setOpen("")}
        onBackButtonPress={() => setOpen("")}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
      >
        <View
          style={{
            backgroundColor: Color.backgroundColor,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderColor: "rgba(0, 0, 0, 0.1)",
          }}
        >
          {open === "authors" && (
            <View
              style={{
                width: "100%",
                padding: 22,
              }}
            >
              <FlatList 
              data={allTranslationsAuthors.filter((item) => {
                return item?.language === language
              })}
              renderItem={({item, index}) => (
                <TouchableOpacity
                key={index}
                onPress={() => {
                  if(isAuthorSelected(item)){
                    const index = findSelectedAuthorIndex(item);
                    const _list = authorsList;
                    _list.splice(index, 1);
                    setAuthorsList([..._list])
                  }
                  else{
                    const _list = authorsList;
                  _list.push(item);
                  setAuthorsList([..._list]);
                  }
                }}
                activeOpacity={0.7}
                style={{
                  padding: 15,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.regular12px,
                    fontWeight: "500",
                    color: Color.fontPrim,
                  }}
                >
                  {item?.author_name}
                </Text>
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: isAuthorSelected(item) ? 0 : 1,
                    backgroundColor:
                    isAuthorSelected(item)
                        ? Color.checkBoxActiveColor
                        : Color.backgroundColor,
                  }}
                />
              </TouchableOpacity>
              )}
              />
            </View>
          )}
          {open === "language" && (
            <View
              style={{
                width: "100%",
                padding: 22,
              }}
            >
              <TouchableOpacity
                onPress={() => setLanguage("english")}
                activeOpacity={0.7}
                style={{
                  padding: 15,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.regular12px,
                    fontWeight: "500",
                    color: Color.fontPrim,
                  }}
                >
                  English
                </Text>
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: language === "english" ? 0 : 1,
                    backgroundColor:
                      language === "english"
                        ? Color.checkBoxActiveColor
                        : Color.backgroundColor,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLanguage("hindi")}
                activeOpacity={0.7}
                style={{
                  padding: 15,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.regular12px,
                    fontWeight: "500",
                    color: Color.fontPrim,
                  }}
                >
                  Hindi
                </Text>
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: language === "hindi" ? 0 : 1,
                    backgroundColor:
                      language === "hindi"
                        ? Color.checkBoxActiveColor
                        : Color.backgroundColor,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}
