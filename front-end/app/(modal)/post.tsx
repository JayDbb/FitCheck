import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

const PostModal = () => {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageUri, setImageUri] = useState('');

  const handleImagePick = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true, // Ensures base64 encoding
        maxWidth: 800,
        maxHeight: 800,
        quality: 1,
      });

      if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri || "";
        const base64 = result.assets[0].base64 || "";
        setImageUri(uri);
        setImageBase64(base64);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleSubmit = async () => {
    if (!type || !category || !imageBase64) {
      Alert.alert("Error", "Please provide type, category, and an image.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/posts/create-post', {
        userID: "JamariTheGreat",
        type,
        category,
        tags,
        imageBase64: `data:image/jpeg;base64,${imageBase64}`, // Ensures proper format
        caption: "",
        taggedShirt: "",
        taggedPants: "",
        taggedShoes: "",
        AIrating: 4.0,
      });

      Alert.alert("Success", "Post created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "There was an error creating your post.");
    }
  };

  const addTag = () => {
    if (tagInput.trim() === "") return;
    setTags([...tags, tagInput.toLowerCase().trim()]);
    setTagInput("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a New Post</Text>

      <TextInput style={styles.input} placeholder="Post Type" value={type} onChangeText={setType} />
      <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />

      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
            <TouchableOpacity onPress={() => setTags(tags.filter((_, i) => i !== index))}>
              <Text style={styles.removeButton}>x</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TextInput
          style={styles.input}
          placeholder="Add a tag"
          value={tagInput}
          onChangeText={setTagInput}
          onSubmitEditing={addTag}
        />
      </View>

      <Button title="Pick an Image" onPress={handleImagePick} />
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.imagePreview} /> : null}

      <Button title="Create Post" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, color: "black" },
  tagsContainer: { flexDirection: "row", flexWrap: "wrap", alignItems: "center" },
  tag: { flexDirection: "row", backgroundColor: "#e0e0e0", padding: 4, margin: 4 },
  tagText: { marginRight: 8 },
  removeButton: { color: "red" },
  imagePreview: { width: 100, height: 100, marginVertical: 10, resizeMode: "cover" },
});

export default PostModal;
