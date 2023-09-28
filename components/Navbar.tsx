import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontSize } from "../GlobalStyles";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Navbar({ nav: string }) {
  const height = Dimensions.get("window").height;

  return (
    <SafeAreaView
      style={{
        position: "absolute",
        width: "100%",
        zIndex: -10,
      }}
    >
      <View
        style={{
          zIndex: -10,
        }}
      >
        <View style={{ height: height, zIndex: -10 }} />
        <View
          style={{
            width: "100%",
            position: "absolute",
            bottom: 0,
            backgroundColor: "#FF5F04",
            flexDirection: "row",
            borderWidth: 0,
            zIndex: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderWidth: 0,
            }}
          >
            <Text style={{ fontSize: FontSize.rehular10pxRegular_size }}>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderWidth: 0,
            }}
          >
            <Text style={{ fontSize: FontSize.rehular10pxRegular_size }}>
              AudioBook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderWidth: 0,
            }}
          >
            <Text style={{ fontSize: FontSize.rehular10pxRegular_size }}>
              Quotes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderWidth: 0,
            }}
          >
            <Text style={{ fontSize: FontSize.rehular10pxRegular_size }}>
              Saved
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
