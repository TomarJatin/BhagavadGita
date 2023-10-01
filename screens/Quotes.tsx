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

export default function Quotes({navigation}) {
  const { theme } = useContext(ThemeContext);
  const Color = color(theme);

  return (
    <SafeAreaView>
      <FlatList 
        data={['1']}
        renderItem={() => (
          <View style={{padding: 15}}>
            <Text style={{color: Color.fontPrim, fontSize: FontSize.regular16px, fontWeight: '700'}}>
              Quotes
            </Text>
           
          </View>
        )}
        style={{
          paddingBottom: 50,
          minHeight: Dimensions.get('window').height
        }}
      />
      <Navbar nav={"quotes"} />
    </SafeAreaView>
  );
}