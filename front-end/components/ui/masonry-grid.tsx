import {
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  RefreshControl,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import { useState } from "react";
import DynamicHeights from "./utils/dynamic-heights";
import { useBottomTabOverflow } from "./utils/tab-bar-background";
import { router } from "expo-router";


interface Post {
  id: string;
  image: string;
  title: string;
}


interface MasonryGrid {
  posts: Post[];
  refreshing?: boolean;
  onRefresh?: () => void;
}



const MasonryGrid = ({
  posts,
  refreshing = false,
  onRefresh = () => {},
}: MasonryGrid) => {
  const width = useWindowDimensions().width;

  const numColumns = Math.ceil(width / 350);

  const paddingBottom = useBottomTabOverflow();

  // console.log(paddingBottom)

  const postHandler = (item: Post) => {
    // Serialize the details to pass as query parameters (you can pass specific fields)
    console.log("Navigating to details with id:", item.id, "title:", item.title, "image:", item.image);

    router.push(`/home/details/${item.id}?title=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.image)}`);
  };
  

  return (
    <ScrollView
      contentContainerStyle={{ width: "100%" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }

    >
      <View  className = "flex-row" style={{paddingBottom: paddingBottom + 30}}>
        {Array.from(Array(numColumns)).map((_, colIndex) => (
          <View style={styles.column} key={`column_${colIndex}`}>
            {posts
              .filter((_, index) => index % numColumns === colIndex)
              .map((post) => (
                <Pressable style={styles.pinContainer} key={post.id} onPress={() => postHandler(post)} className="rounded-lg">
                  <DynamicHeights imageUri={post.image} id={post.id}/>
                  
                  {/* <Text >{post.title}</Text> */}
                </Pressable>
              ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   padding: 10,
  //   flexDirection: "row",
  //   // paddingBottom: paddingBottom,
  // },
  column: {
    flex: 1,
  },
  pinContainer: {
    width: "100%",
    padding: 4,
  },
});

export default MasonryGrid;
