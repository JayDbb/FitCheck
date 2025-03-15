import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const PostModal = () => {
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageUri, setImageUri] = useState('');


  const handleImagePick = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
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

        // Convert the selected image to base64
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setImageBase64(base64);  // Set the base64 string
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
        imageBase64,
      });

      Alert.alert('Success', 'Post created successfully!');
      console.log(response.data); 
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was an error creating your post.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a New Post</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Post Type"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      {/* Image Selection Button */}
      <Button title="Pick an Image" onPress={handleImagePick} />
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      ) : null}

      <Button title="Create Post" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
    resizeMode: 'cover',
  },
});

export default PostModal;
