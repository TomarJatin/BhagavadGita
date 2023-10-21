import React, { useContext } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { FontSize, color } from "../GlobalStyles";

import { useNavigation } from "@react-navigation/core";

export default function Navbar(props: { nav: string }) {
  const navigation = useNavigation();
  const theme = useSelector((state: any) => state.theme.theme);
  const Color = color(theme);

  return (
    <View
      style={{
        paddingVertical: 15,
        paddingHorizontal: 40,
        backgroundColor: Color.topbarColor,
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
      }}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Home")}>
        <Entypo name="home" size={26} color={props.nav !== 'home' ? "black": "white"} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("AudioBook")}>
        <MaterialIcons name="audiotrack" size={26} color={props.nav !== 'audiobook' ? "black": "white"} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Quotes")}>
        <FontAwesome name="quote-right" size={26} color={props.nav !== 'quotes' ? "black": "white"} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Bookmarked")}>
        <FontAwesome name="bookmark" size={26} color={props.nav !== 'bookmarked' ? "black": "white"} />
      </TouchableOpacity>
    </View>
  );
}
