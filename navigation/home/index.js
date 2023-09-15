import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/Home";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Chapter from "../../screens/Chapter";
import Verse from "../../screens/Verse";
import Bookmarked from "../../screens/Bookmarked";
import Settings from "../../screens/Settings";
import AudioBook from "../../screens/AudioBook";
import Quotes from "../../screens/Quotes";
import QuickStart from "../../screens/QuickStart";
import AIBot from "../../screens/AIBot";

const Stack = createNativeStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chapter"
          component={Chapter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Verse"
          component={Verse}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bookmarked"
          component={Bookmarked}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AudioBook"
          component={AudioBook}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Quotes"
          component={Quotes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuickStart"
          component={QuickStart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AIBot"
          component={AIBot}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
