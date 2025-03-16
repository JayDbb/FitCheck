import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Pressable, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import MasonryList from "@/components/ui/masonry-grid";
import axios from "axios";

const ProfileScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchPosts = async (username: string) => {
      axios.get(`http://localhost:3000/posts/get-posts?username=${username}`).then((response) => {
        console.log(response.data,"results");
        const fetchedPosts = response.data.map((post: any) => ({
          id: post._id,
          image: post.imageURL,
        }));
        setPosts(fetchedPosts);


      }).catch((error) => {
        console.error(error);
      });
    };
    fetchPosts("JamariTheGreat");
  }, []);

  return (
    <ScrollView>
      <View style={styles.profileContainer}>
        <View style={styles.names}>
          <Text style={styles.largeName}>@JamarTG</Text>
          <Text style={styles.smallName}>{"@jamarTG".toLocaleLowerCase()}</Text>
          <Pressable style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </Pressable>
        </View>
        <Image
          style={styles.profilePicture}
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106" }}
        />
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>Fashion enthusiast. Love to share my daily outfits and style tips!</Text>
      </View>
      <View>

        <Text style={styles.galleryTitle}>Latest Post of JamarTG</Text>

          <SafeAreaView className="flex-1">
          <MasonryList
            posts={posts}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
          </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
  },
  names: {
    flex: 1,
  },
  largeName: {
    fontWeight: "bold",
    fontSize: 23,
    color: "#333",
  },
  smallName: {
    fontSize: 16,
    color: "#666",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 50,
  },
  bioContainer: {
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D3D3D3",
  },
  bioText: {
    fontSize: 16,
    color: "#333",
  },
 
  galleryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  galleryImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  followButton: {
    backgroundColor: "grey",

    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  followButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
