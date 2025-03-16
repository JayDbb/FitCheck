import { Image, ImageSourcePropType, StyleSheet, useColorScheme, View } from "react-native";
import React, { useState } from "react";
import Animated, {
  FadeIn,
  LinearTransition,
  SlideInLeft,
  SlideInRight,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const gap = 10;

interface HeadTextProps {
  text?: string;
  side?: "left" | "right";
  image?: ImageSourcePropType;
}

const HeadText = (props: HeadTextProps) => {
  const { text, side, image } = props;
  const [totalWidth, setTotalWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const width = totalWidth - textWidth - gap;
  const theme = useColorScheme();

  const Transition = LinearTransition.delay(1650)
    .springify()
    .damping(18)
    .stiffness(50);
  const LeftSlide = SlideInLeft.delay(1500)
    .springify()
    .damping(18)
    .stiffness(50);
  const RightSlide = SlideInRight.delay(1500)
    .springify()
    .damping(18)
    .stiffness(50);

  return (
    <Animated.View
      entering={FadeIn.delay(1000).springify().damping(18).stiffness(50)}
      layout={Transition}
      onLayout={(event) => {
        setTotalWidth(event.nativeEvent.layout.width);
      }}
      style={styles.headerContainer}
    >
      {Boolean(width > 0) && side === "left" && (
        <Animated.View
          entering={LeftSlide}
          style={[styles.embedImage, { width }]}
        >
          <Image source={image} style={styles.image} />
        </Animated.View>
      )}
      {Boolean(text) && (
        <Animated.Text
          layout={Transition}
          onLayout={(event) => {
            setTextWidth(event.nativeEvent.layout.width);
          }}
          style={{fontSize: 70, fontWeight: 700, color: theme ==  "light" ? "#000" : "#fff"}}
        >
          {text}
        </Animated.Text>
      )}
      {Boolean(width > 0) && side === "right" && (
        <Animated.View
          entering={RightSlide}
          style={[styles.embedImage, { width }]}
        >
          <Image source={image} style={styles.image} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default HeadText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    justifyContent: "center",
    gap: gap,
    height: 80,
  },
  embedImage: {
    height: 80,
    borderRadius: 22,
    overflow: "hidden",
  },
  headText: {
    fontSize: 70,
    fontWeight: "700",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});