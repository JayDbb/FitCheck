import SelectDropdown from "react-native-select-dropdown";
import React, { useState } from "react";
import { label } from "@bacons/apple-colors";
import {
  useColorScheme,
  View,
  Text,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  InputAccessoryView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Pressable } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SymbolView } from "expo-symbols";
import { apiUrl } from "../../config";
import * as Colors from "@bacons/apple-colors";
import { router, Stack } from "expo-router";
import Lists from "@/components/ui/utils/lists";
import RatingSlider from "@/components/ui/rating-slider";



const PostModal = () => {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
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
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access media library is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri(uri);

        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Log the first 100 characters of base64 to verify format
        console.log(
          "Base64 image data (first 100 chars):",
          base64.substring(0, 100)
        );

        // Ensure proper base64 image format with data URI prefix
        const formattedBase64 = `data:image/jpeg;base64,${base64}`;
        setImageBase64(formattedBase64);

        const response = axios.post(
          `${apiUrl}/posts/get-ai-rating`,
          {
            base64: formattedBase64,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await token()}`,
            },
          }
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Server Response:", error.response?.data);
        Alert.alert(
          "Error",
          error.response?.data?.message ||
            "There was an error creating your post."
        );
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  const handleSubmit = async () => {
    // if ( !category || !imageBase64) {
    //   Alert.alert("Error", "Please provide type, category, and an image.");
    //   return;
    // }

    try {
      console.log(imageBase64);
      const response = await axios.post(
        `${apiUrl}/posts/create-post`,
        {
          imageBase64: imageBase64,
          type: "public",
          caption: caption,
          taggedShirt: "Black Oversized Hoodie",
          taggedPants: "Slim Fit Jeans",
          taggedShoes: "White Sneakers",
          category: category,
          AIrating: 4.0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await token()}`,
          },
        }
      );

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
    <ScrollView>
    <View className="p-4">
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Text
                style={{ color: theme == "light" ? "#000" : "#fff" }}
                className="text-xl font-bold"
              >
                Back
              </Text>
            </Pressable>
          ),

          headerRight: () => (
            <Pressable onPress={handleSubmit}>
              <Text   style={{ color: theme == "light" ? "#000" : "#fff" }}
                className="text-xl font-bold">Post</Text>
            </Pressable>
          ),
        }}
      />

      <View className="flex-row items-start mb-4  border-gray-300 pb-4">
        <Image
          source={{ uri: "https://picsum.photos/seed/696/3000/2000" }}
          className="h-10 w-10 rounded-full"
        />
        <View className="flex-1 ml-3">

          <Text
            className="font-bold text-lg"
            style={{ color: theme == "light" ? "#000" : "#fff" }}
          >
            cajaun
          </Text>







        

          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              className=" rounded-md mt-2"
              style={{
                width: "100%",
                height: "50%",
                borderRadius: 6,
              }}
            />
          ) : null}

<View className = "mt-2">
<Pressable onPress={handleImagePick}>
          <SymbolView
              name="photo.on.rectangle.angled"
              type="hierarchical"
          
              size={30}
            />
          </Pressable>

</View>


<View className="mt-4">
  <Text className="text-lg" style={{ color: theme == "light" ? "#000" : "#fff" }}>Category</Text>
  <TextInput
    value={category}
    onChangeText={setCategory}
    placeholder="Enter Category"
    className="border p-2 rounded"
    style={{ color: theme == "light" ? "#000" : "#fff" }}
  />
</View>

<View className="mt-4">
  <Text className="text-lg" style={{ color: theme == "light" ? "#000" : "#fff" }}>Caption</Text>
  <TextInput
    value={caption}
    onChangeText={setCaption}
    placeholder="Enter Caption"
    className="border p-2 rounded"
    style={{ color: theme == "light" ? "#000" : "#fff" }}
  />
</View>



          

          
         
        </View>
      </View>

      {/*  */}
    </View>
    </ScrollView>
  );
};
export default PostModal;
