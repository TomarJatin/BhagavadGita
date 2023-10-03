import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { ThemeContext } from "../contexts/ThemeContext";
import { FontSize, color } from "../GlobalStyles";
import { Image } from "expo-image";
import { SaveForLaterContext } from '../contexts/SaveForLaterContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { FontAwesome } from '@expo/vector-icons';
import { VerseContext } from '../contexts/VerseContext';
import { translations } from "../translations/main";
import { Entypo } from '@expo/vector-icons';
import { ChapterContext } from '../contexts/ChapterContext';
import { backgroundWallpaper } from '../data/backgroundWallpaper';
import { bhagavadGitaQuotes } from '../data/quotes';

export default function Quotes({navigation}) {
  const [currIdx, setCurrIdx] = useState(0);
  const { theme } = useContext(ThemeContext);
  const {language} = useContext(SettingsContext);
  const Color = color(theme);

  return (
    <SafeAreaView>
      <ImageBackground source={{uri: backgroundWallpaper[3]}}
          resizeMode="cover" style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}> 
            <View style={{width: '100%', height: '100%', justifyContent: 'center', padding: 20, marginTop: -50}}>
              <FontAwesome name="quote-left" size={40} color={Color.topbarColor} />
              <Text style={{fontSize: FontSize.regular16px, fontWeight: '600', color: Color.fontWhite, lineHeight: 20, letterSpacing: 0.9, marginTop: 10}}>{bhagavadGitaQuotes[currIdx][language]}</Text>
            </View>
      </ImageBackground>
      <Navbar nav={"quotes"} />
    </SafeAreaView>
  );
}5