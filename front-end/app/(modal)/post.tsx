import React, { useState } from "react";

import { useColorScheme, View, Text, TextInput, Image, Alert, KeyboardAvoidingView, Platform, InputAccessoryView, StyleSheet } from "react-native";
import { Pressable } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SymbolView } from "expo-symbols";
import { apiUrl } from "../../config";
import * as Colors from "@bacons/apple-colors";

const PostModal = () => {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [aiRating, setAiringRating] = useState(0);
  const [caption, setCaption] = useState("");

  const inputAccessoryViewID = "uniqueID";

  const userID = async () => {
    const user = await AsyncStorage.getItem("user");
    return JSON.parse(user as string)?.id;
  };

  const token = async () => {
    const user = await AsyncStorage.getItem("token");
    return JSON.parse(user as string)?.token;
  };

  const theme = useColorScheme();
  const handleImagePick = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access media library is required!");
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

        // Log the first 100 characters of base64 to verify format
        console.log("Base64 image data (first 100 chars):", base64.substring(0, 100));
        
        // Ensure proper base64 image format with data URI prefix
        const formattedBase64 = `data:image/jpeg;base64,${base64}`;
        setImageBase64(formattedBase64);

        const response = await axios.post(`${apiUrl}/posts/get-ai-rating`, {
          base64: formattedBase64,
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await token()}`
          }}
        );

        console.log(response.data);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleSubmit = async () => {
    // if ( !category || !imageBase64) {
    //   Alert.alert("Error", "Please provide type, category, and an image.");
    //   return;
    // }

    try {

      console.log(imageBase64);
      const response = await axios.post(`${apiUrl}/posts/create-post`, {
        "type": "public",
        "caption": caption,
        "taggedShirt": "Black Oversized Hoodie",
        "taggedPants": "Slim Fit Jeans",
        "taggedShoes": "White Sneakers",
        "category": "casual",
        "AIrating": 4.0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await token()}`
        }
      }
      );

      Alert.alert("Success", "Post created successfully!");
      console.log(response.data);
      Alert.alert("Success", "Post created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // Alert.alert("Error", "There was an error creating your post.");
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
      <View className="flex-row items-start mb-4  border-gray-300 pb-4">
        <Image
          source={{ uri: "https://picsum.photos/seed/696/3000/2000" }}
          className="h-10 w-10 rounded-full"
        />
        <View className="flex-1 ml-3">
          <Text className="font-bold text-base" style={{ color: theme == "light" ? "#000" : "#fff" }} >cajaun</Text>
          <TextInput
            className="text-base max-h-24 "
            style={{color: Colors.label}}
            placeholder="What's new?"
            multiline
            onChangeText={setCaption}
            inputAccessoryViewID={inputAccessoryViewID}
          />

          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              className=" rounded-md mt-2"
              style={{
                width: "100%",
                height: 200,
                borderRadius: 6,
              }}
            />
          ) : null}

          <View className="flex-row gap-4">
            <Pressable
              onPress={handleImagePick}
              className="mt-3 p-2"
            >
              <SymbolView
                name="photo.on.rectangle.angled.fill"
                type="hierarchical"
                tintColor={theme === "light" ? "black" : "white"}
                size={30}
              />
            </Pressable>

            <Pressable onPress={handleImagePick} className="mt-3 p-2">
              <SymbolView
                name="camera"
                type="hierarchical"
                size={30}
                tintColor={theme === "light" ? "black" : "white"}
              />
            </Pressable>
          </View>
        </View>
      </View>

      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View className="flex-row justify-between items-end p-3 ">
          <View>
            <SymbolView
              name="globe.americas.fill"
              type="hierarchical"
              tintColor={theme === "light" ? "black" : "white"}
              size={30}
            />
          </View>
          <Pressable
            className=" px-5 py-2 rounded-full"
            onPress={handleSubmit}
            style={{ backgroundColor: theme == "light" ? "#000" : "#fff" }}
          >
            <Text
              style={{ color: theme == "light" ? "#fff" : "#000" }}
              className=" font-bold"
            >
              Post
            </Text>
          </Pressable>
        </View>
      </InputAccessoryView>
    </View>
  );
};
export default PostModal;
