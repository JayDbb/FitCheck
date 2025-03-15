import {
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  RefreshControl,
  View,
  Text,
  Image,
} from "react-native";
import { useState } from "react";
import DynamicHeights from "./utils/dynamic-heights";

interface IMasonryList {
  posts: {
    id: string;
    image: string;
    title: string;
  }[];
  refreshing?: boolean;
  onRefresh?: () => void;
}

const MasonryList = ({
  posts,
  refreshing = false,
  onRefresh = () => {},
}: IMasonryList) => {
  const width = useWindowDimensions().width;

  const numColumns = Math.ceil(width / 350);

  return (
    <ScrollView
      contentContainerStyle={{ width: "100%" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        {Array.from(Array(numColumns)).map((_, colIndex) => (
          <View style={styles.column} key={`column_${colIndex}`}>
            {posts
              .filter((_, index) => index % numColumns === colIndex)
              .map((post) => (
                <View style={styles.pinContainer} key={post.id}  className="bg-red-500 p-2 rounded-lg">
                  <DynamicHeights imageUri={post.image}/>
                  
                  <Text >{post.title}</Text>
                </View>
              ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
  column: {
    flex: 1,
  },
  pinContainer: {
    width: "100%",
    padding: 4,
  },
});

export default MasonryList;
