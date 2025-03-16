import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Animated from "react-native-reanimated";


interface DynamicHeightsProps {
  imageUri: string;
  id: string;
}

const DynamicHeights = ({ imageUri, id }: DynamicHeightsProps) => {
  const [ratio, setRatio] = useState(1);


  useEffect(() => {
    if (imageUri) {
      Image.getSize(
        imageUri,
        (width, height) => setRatio(width / height),
        () => setRatio(1) // Fallback in case of an error
      );
    }
  }, [imageUri]);

  if (!imageUri) {
    return <ActivityIndicator />;
  }

  return (



    <Image
      source={{ uri: imageUri }}
      style={[styles.image, { aspectRatio: ratio }]}
    />

  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 15,
  },
});

export default DynamicHeights;
