import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  InputAccessoryView,
  StyleSheet,
} from "react-native";
import { Pressable } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SymbolView } from "expo-symbols";

const PostModal = () => {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageUri, setImageUri] = useState('');

  const handleImagePick = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Permission to access media library is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri(uri);

        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setImageBase64(base64);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };


  const handleSubmit = async () => {
    if (!type || !category || !imageBase64) {
      Alert.alert('Error', 'Please provide type, category, and an image.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/create-post', {
        type,
        category,
        tags,
        imageBase64,
        caption : "",
        "taggedShirt":"",
        "taggedPants": "",
        "taggedShoes": "",
        "AIrating": 4.0,
        
        
      });

      Alert.alert("Success", "Post created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "There was an error creating your post.");
    }
  };

  const addTag = () => {
    if (tagInput.trim() == "") return;

    setTags([...tags, tagInput.toLocaleLowerCase().trim()]);
    setTagInput("");
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };


  return (
    <View className="p-4">
      <View className="flex-row items-center mb-4  border-gray-300 pb-4">
        <Image
          source={{ uri: "https://picsum.photos/seed/696/3000/2000" }}
          className="h-10 w-10 rounded-full"
        />
        <View className="flex-1 ml-3">
          <Text className="font-bold text-base">Username</Text>
          <TextInput
            className="text-base max-h-24"
            placeholder="What's new?"
            multiline
            inputAccessoryViewID={inputAccessoryViewID}
          />

          <View className="flex-row gap-4">
            <Pressable onPress={handleImagePick} className="mt-3 p-2">
              <SymbolView
                name="photo.on.rectangle.angled.fill"
                type="hierarchical"
                size={30}
              />
            </Pressable>

            <Pressable onPress={handleImagePick} className="mt-3 p-2">
              <SymbolView name="camera" type="hierarchical" size={30} />
            </Pressable>
          </View>
        </View>
      </View>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      ) : null}

      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View className="flex-row justify-between items-end p-3 ">
          <View>
            <SymbolView
              name="globe.americas.fill"
              type="hierarchical"
              size={30}
            />
          </View>
          <Pressable
            className="bg-black px-5 py-2 rounded-full"
            onPress={handleSubmit}
          >
            <Text className="text-white font-bold">Post</Text>
          </Pressable>
        </View>
      </InputAccessoryView>
    </View>
  );
};
export default PostModal;
