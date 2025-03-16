import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostModal = () => {
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageUri, setImageUri] = useState('');

  const userID = async () => {
    const user = await AsyncStorage.getItem('user');
    return JSON.parse(user as string)?.id;
  };


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
      const response = await axios.post('http://localhost:3000/posts/create-post', {
        type,
        category,
        tags,
        imageBase64,
        caption : "",
        "taggedShirt":"",
        "taggedPants": "",
        "taggedShoes": "",
        "AIrating": 4.0,
        userID
        
      });

      Alert.alert('Success', 'Post created successfully!');
      console.log(response.data); 
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was an error creating your post.');
    }
  };

  const addTag = () => {
    if (tagInput.trim() == '') return;

    setTags([...tags, tagInput.toLocaleLowerCase().trim()]);
    setTagInput('');
    
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a New Post</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Post Type"
          value={type}
          onChangeText={setType}
        />
        {type ? (
          <TouchableOpacity onPress={() => setType('')}>
            <Text>X</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        {category ? (
          <TouchableOpacity onPress={() => setCategory('')}>
            <Text>x</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.tagsInput}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
              <TouchableOpacity onPress={() => removeTag(index)}>
                <Text style={styles.removeButton}>x</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TextInput
            style={styles.tagInput}
            placeholder="Add a tag"
            value={tagInput}
            onChangeText={setTagInput}
            onSubmitEditing={addTag}
          />
        </View>
      </View>

    
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
  inputContainer: { 
    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
  },
  
  tagsInput: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
  
  },
  tagInput: {
    flex: 1,
    height: 40,
    color: 'black',
    borderWidth: 0
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 4,
    margin: 4,
    
  },
  tagText: {
    marginRight: 8,
  },
  removeButton: {
    color: 'red',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
    resizeMode: 'cover',
  },
});

export default PostModal;