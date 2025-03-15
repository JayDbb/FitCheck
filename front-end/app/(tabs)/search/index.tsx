import { View, Text } from "react-native";
import React from "react"; 
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from 'expo-router';
const SearchScreen = () => {
  const {query} = useLocalSearchParams<{query:string}>();
  return (
    <SafeAreaView>
      <View>
        
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
