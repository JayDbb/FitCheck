import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import MasonryList from "@/components/ui/masonry-grid";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiUrl } from "@/config";
import { Post } from "@/types/posts";
import io from 'socket.io-client';



const HomeScreen = () => {

  const socket = io(apiUrl); // Replace with your server URL

  

  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);


  useEffect(() => {
    // Listen for the 'ratingUpdated' event in socket
    socket.on('ratingUpdated', (updatedPost) => {
      console.log('Rating updated:', updatedPost);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      ); // Update post data with the new rating
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const token = async () => {
    const user = await AsyncStorage.getItem("token");
    return JSON.parse(user as string)?.token;
  };



  useEffect(() => {
    const fetchPosts = async () => {
      try {
  
        token().then(token => {
          axios.get(`${apiUrl}/users/get`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => {

            const username = response.data.username;

            axios.get(
              `${apiUrl}/posts/load-feed?username=${username}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            ).then((response: { data: Post[] }) => {
              setPosts(response.data);
            }).catch((error) => {
              console.error("Error fetching posts:", error);
            });
          
          })
        })
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
    
  }, []);


  return (
    <SafeAreaView className="flex-1">
      <MasonryList
        posts={posts}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
