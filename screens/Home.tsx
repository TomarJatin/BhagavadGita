import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { color } from "../GlobalStyles";
import { Image } from "expo-image";
import { icons } from '../styles/Icon';


export default function HomeScreen({ navigation }) {
  const {theme} = useContext(ThemeContext);
  const Color = color(theme);
  const Icons = icons(theme);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Color.backgroundColor
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <Topbar />
      
      <View style={{
        padding: 15
      }}>
      <Image
        style={{width: '100%', height: 160, borderRadius: 10}}
        contentFit="cover"
        source={Icons.verseOfTheDay}
      />
      </View>
      
      {/* <Navbar nav={"home"}/> */}
    </SafeAreaView>
  );
}
