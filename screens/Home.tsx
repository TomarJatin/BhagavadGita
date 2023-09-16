import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { color } from "../GlobalStyles";


export default function HomeScreen({ navigation }) {
  const {theme} = useContext(ThemeContext);
  const Color = color(theme);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Color.white
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
    </SafeAreaView>
  );
}
