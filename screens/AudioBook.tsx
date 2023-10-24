import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Slider from "react-native-slider";
import { FontSize, color } from "../GlobalStyles";
import { Audio } from "expo-av";
import { AntDesign } from '@expo/vector-icons'; 
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import storage from "@react-native-firebase/storage";

const adUnitId = Platform.OS !== 'ios' ? "ca-app-pub-1000663314481679/9467651353": "ca-app-pub-1000663314481679/6260404632";

interface Audiobook {
  id: string;
  title: string;
  url: string;
}

export default function AudioBook({ navigation }) {
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [selectedAudiobook, setSelectedAudiobook] = useState<Audiobook | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentPosition, setCurrentPosition] = useState<number | null>(null);
  const [totalDuration, setTotalDuration] = useState<number | null>(null);
  const [sliderValue, setSliderValue] = useState(0);
  const theme = useSelector((state: any) => state.theme.theme);
  const Color = color(theme);

  useEffect(() => {
    // Function to fetch audiobooks from Firebase Storage
    const fetchAudiobooks = async () => {
      const audiobooksRef = storage().ref().child("audiobooks"); // Adjust the path to your Firebase Storage
      const audiobookList: Audiobook[] = [];

      try {
        const audiobookListItems = await audiobooksRef.listAll();
        await Promise.all(
          audiobookListItems.items.map(async (item) => {
            const url = await item.getDownloadURL();
            audiobookList.push({ id: item.name, title: item.name, url });
          })
        );
        setAudiobooks(audiobookList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching audiobooks:", error);
      }
    };

    fetchAudiobooks();
  }, []);

  useEffect(() => {
    const loadSound = async () => {
      if (!selectedAudiobook) return;

      const { sound } = await Audio.Sound.createAsync({
        uri: selectedAudiobook.url,
      });
      setSound(sound);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          if (status.isPlaying) {
            setCurrentPosition(status.positionMillis);
            setTotalDuration(status.durationMillis);
          }
        }
      });
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [selectedAudiobook]);

  const handleSelectAudiobookClick = (item: Audiobook | null) => {
    setSound(null);
    setCurrentPosition(null);
    setTotalDuration(null);
    setIsPlaying(false);
    setSelectedAudiobook(item)
  }

  const togglePlayback = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number | null) => {
    if (time === null) return "00:00";

    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const formattedSeconds = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  };

  const handleSliderChange = (value: number) => {
    if (!sound) return;

    setSliderValue(value);
    const newPosition = (value / 100) * (totalDuration || 0);
    sound.setPositionAsync(newPosition);
  };

  return (
    <SafeAreaView>
      <FlatList
        data={["1"]}
        renderItem={() => (
          <View style={{ padding: 15, paddingBottom: 100 }}>
            <Text
              style={{
                color: Color.fontPrim,
                fontSize: FontSize.regular16px,
                fontWeight: "700",
              }}
            >
              Audio Books
            </Text>
            <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
            <View>
              {
                loading && <ActivityIndicator size="large" />
              }
              <FlatList
                data={audiobooks}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity style={{
                    width: "100%",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    marginBottom: 10
                  }} activeOpacity={0.5} onPress={() => handleSelectAudiobookClick(item)}>
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                )}
                style={{
                  marginTop: 20
                }}
              />
              
            </View>
          </View>
        )}
        style={{
          paddingBottom: 50,
          minHeight: Dimensions.get("window").height,
        }}
      />
      {selectedAudiobook && (
                <View style={{position: "absolute", width: "100%", bottom: 60, backgroundColor: Color.fontWhite, zIndex: 20, padding: 20}}>
                  <Text>{selectedAudiobook.title}</Text>
                  <View style={{flexDirection: 'row', gap: 10, alignItems:'center', justifyContent: 'center'}}>
                  <Text>
                    {formatTime(currentPosition)}
                  </Text>
                  <View style={{width: "70%"}}>
                  <Slider
                    minimumValue={0}
                    maximumValue={100}
                    value={currentPosition? (currentPosition / totalDuration) * 100: 0}
                    onValueChange={handleSliderChange}
                    onSlidingComplete={handleSliderChange}
                  /> 
                  </View>
                  <Text>
                     {formatTime(totalDuration)}
                  </Text>
                  </View>
                  
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: "20%"}}>
                  <AntDesign name="stepbackward" size={40} color="black" />
                  
                  <TouchableOpacity activeOpacity={0.5} onPress={togglePlayback}>
                  {isPlaying ? <AntDesign name="pausecircleo" size={40} color="black" />: <AntDesign name="playcircleo" size={40} color="black" />}
                  </TouchableOpacity>
                  <AntDesign name="stepforward" size={40} color="black" />
                  </View>
                  
                </View>
              )}
      <Navbar nav={"audiobook"} />
    </SafeAreaView>
  );
}
