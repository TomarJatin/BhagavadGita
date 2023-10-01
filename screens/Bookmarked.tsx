import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { ThemeContext } from "../contexts/ThemeContext";
import { FontSize, color } from "../GlobalStyles";
import { Image } from "expo-image";
import { SaveForLaterContext } from '../contexts/SaveForLaterContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { VerseContext } from '../contexts/VerseContext';
import { translations } from "../translations/main";
import { Entypo } from '@expo/vector-icons';
import { ChapterContext } from '../contexts/ChapterContext';

export default function Bookmarked({navigation}) {
  const { theme } = useContext(ThemeContext);
  const {saveForLater} = useContext(SaveForLaterContext);
  const {language} = useContext(SettingsContext);
  const { setSelectedVerse } = useContext(VerseContext);
  const {setSelectedChapter} = useContext(ChapterContext);
  const Color = color(theme);

  return (
    <SafeAreaView>
      <FlatList 
        data={['1']}
        renderItem={() => (
          <View style={{padding: 15}}>
            <Text style={{color: Color.fontPrim, fontSize: FontSize.regular16px, fontWeight: '700'}}>
              Saved Verses
            </Text>
            <FlatList 
              data={saveForLater}
              renderItem={({item}) => (
                <TouchableOpacity
                    onPress={() => {
                      setSelectedVerse(item?.verseId);
                      setSelectedChapter(item?.chapterId);
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
                          {translations.Verse[language]} {item.chapterId}.{item.verseId}
                        </Text>
                      </View>
                      <Entypo name="chevron-small-right" size={24} color="black" />
                    </View>
                    <Text style={{marginTop: 10,
                    fontSize: FontSize.regular12px,
                    color: Color.fontPrim,
                    fontWeight: "400",}}>{item.verse}</Text>
                  </TouchableOpacity>
              )}
              style={{
                marginTop: 40,
              }}
            />
          </View>
        )}
        style={{
         
          paddingBottom: 50,
          minHeight: Dimensions.get('window').height
        }}
      />
      <Navbar nav={"bookmarked"} />
    </SafeAreaView>
  );
}