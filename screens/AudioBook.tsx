import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions  } from "react-native";
import Slider from "react-native-slider";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { ThemeContext } from "../contexts/ThemeContext";
import { FontSize, color } from "../GlobalStyles";
import { Audio } from 'expo-av';
import { Image } from "expo-image";
import { SaveForLaterContext } from '../contexts/SaveForLaterContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { VerseContext } from '../contexts/VerseContext';
import { translations } from "../translations/main";
import { Entypo } from '@expo/vector-icons';
import storage from '@react-native-firebase/storage';
import { ChapterContext } from '../contexts/ChapterContext';

interface Audiobook {
  id: string;
  title: string;
  url: string;
}


export default function AudioBook({navigation}) {
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [selectedAudiobook, setSelectedAudiobook] = useState<Audiobook | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentPosition, setCurrentPosition] = useState<number | null>(null);
  const [totalDuration, setTotalDuration] = useState<number | null>(null);
  const [sliderValue, setSliderValue] = useState(0);
  const { theme } = useContext(ThemeContext);
  const Color = color(theme);

  useEffect(() => {
    // Function to fetch audiobooks from Firebase Storage
    const fetchAudiobooks = async () => {
      const audiobooksRef = storage().ref().child('audiobooks'); // Adjust the path to your Firebase Storage
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
      } catch (error) {
        console.error('Error fetching audiobooks:', error);
      }
    };

    fetchAudiobooks();
  }, []);

  useEffect(() => {
    const loadSound = async () => {
      if (!selectedAudiobook) return;

      const { sound } = await Audio.Sound.createAsync({ uri: selectedAudiobook.url });
      setSound(sound);

      sound.setOnPlaybackStatusUpdate((status) => {
        if(status.isLoaded){
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

  const togglePlayback = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }

    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number | null) => {
    if (time === null) return '00:00';

    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const formattedSeconds = String(seconds % 60).padStart(2, '0');
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
        data={['1']}
        renderItem={() => (
          <View style={{padding: 15}}>
            <Text style={{color: Color.fontPrim, fontSize: FontSize.regular16px, fontWeight: '700'}}>
              Audio Books
            </Text>
           <View>
           <FlatList
        data={audiobooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedAudiobook(item)}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />{selectedAudiobook && (
        <View>
          <Text>{selectedAudiobook.title}</Text>
          <Text>{isPlaying ? 'Playing' : 'Paused'}</Text>
          <Text>{formatTime(currentPosition)} / {formatTime(totalDuration)}</Text>
          <Slider
            style={{ width: '80%' }}
            minimumValue={0}
            maximumValue={100}
            value={(currentPosition / totalDuration) * 100}
            onValueChange={handleSliderChange}
          />
          <TouchableOpacity onPress={togglePlayback}>
            <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
        </View>
      )}
           </View>
          </View>
        )}
        style={{
         
          paddingBottom: 50,
          minHeight: Dimensions.get('window').height
        }}
      />
      <Navbar nav={"audiobook"} />
    </SafeAreaView>
  );
}