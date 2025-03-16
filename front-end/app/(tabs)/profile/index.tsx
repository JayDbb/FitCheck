import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import MasonryList from "@/components/ui/masonry-grid";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RatingSlider from "@/components/ui/rating-slider";
import { apiUrl } from "@/config";

const ProfileScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);

  const theme = useColorScheme();

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


  const getUsername = async () => {
    try {

      const tokens = await token();
      
        const response = await axios.get(
          `${apiUrl}/users/get`,
          {
            headers: { Authorization: `Bearer ${tokens}` },
          }
        );

        console.log(response.data);
        return response.data.username;

      
    } catch (error) {
      console.error("Failed to fetch username", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const userToken = await token();
      if (!userToken) return;

      const username = await getUsername();

      if (!username) return;

      await axios
        .get(
          `https://fitcheck-server-c4dshjg7dthhcrea.eastus2-01.azurewebsites.net/posts/get-posts?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((response) => {
          const fetchedPosts = response.data.map((post: any) => ({
            id: post._id,
            image: post.imageURL,
          }));
          console.log(fetchedPosts);
          setPosts(fetchedPosts);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchPosts();
  }, []);




  return (
    <SafeAreaView className="px-4 pt-2">
      <ScrollView>
        {/* Header */}
        <View className="h-[44px] flex-row justify-between items-center"></View>

        {/* Profile Section */}
        <View className="flex-row items-center mt-4">
          <View className="flex-1">
            <Text
              className="text-3xl font-bold "
              style={{ color: theme === "light" ? "#000" : "#fff" }}
            >
              cajaun
            </Text>
            <Text
              className="text-base text-secondary-400 mt-2"
              style={{ color: theme === "light" ? "#000" : "#fff" }}
            >
              @cajaun
            </Text>
          </View>
          <Image
            source={{ uri: "https://picsum.photos/seed/696/3000/2000" }}
            style={{
              height: 70,
              width: 70,
              borderRadius: 35,
            }}
          />
        </View>

        <View className="mt-4">
          <Text className="text-base text-secondary-400">113k followers</Text>
        </View>

        {/* Buttons */}
        <View className="flex-row justify-between mt-4 w-full gap-4">
          <Pressable className=" border border-secondary-300 rounded-xl h-[35px] flex-1 items-center justify-center px-2" style={{backgroundColor: theme === "light" ? "#000" : "#fff" }} >
            <Text
              className=" font-bold"
              style={{ color: theme === "light" ? "#fff" : "#000" }}
            >
              Edit Profile
            </Text>
          </Pressable>

          <Pressable className=" border border-secondary-300 rounded-xl h-[35px] flex-1 items-center justify-center px-2" style={{backgroundColor: theme === "light" ? "#000" : "#fff" }}>
            <Text
              className=" font-bold"
              style={{ color: theme === "light" ? "#fff" : "#000" }}
            >
              Share Profile
            </Text>
          </Pressable>
        </View>

        <View>
          <MasonryList posts={posts} />
        </View>

     
      </ScrollView>
    </SafeAreaView>
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
