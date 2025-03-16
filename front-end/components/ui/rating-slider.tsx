import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Path, Svg } from "react-native-svg";


const colors = {
  primary: "#DA373C",
  grey: "#B2BDCD",
  orange: "#ea580c",
  yellow: "#facc15",
  green: "#86efac",
  darkGreen: "#22c55e",
};

interface RatingSliderProps {
  rating: number;
  onRatingChange: (value: number) => void;
}


const starSize = 30;


const StarIcon = ({ color }: { color: string }) => (
  <Svg width={starSize} height={starSize} viewBox="0 0 22 20" fill={color}>
    <Path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1L8.7 8.2 4 8.7h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6z" />
  </Svg>
);

const getRangeText = (value: number) => {
  switch (value) {
    case 1:
      return "1 - Very Bad";
    case 2:
      return "2 - Bad";
    case 3:
      return "3 - Good";
    case 4:
      return "4 - Very Good";
    case 5:
      return "5 - Excellent";
    default:
      return "";
  }
};

const RatingSlider: React.FC<RatingSliderProps> = ({ rating, onRatingChange }) => {
  const [currentValue, setCurrentValue] = useState<number>(rating);
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value: number) => {
    setCurrentValue(value);
    onRatingChange(value);
  };

  const getStarColor = (starValue: number): string => {
    const effectiveValue = hoverValue !== undefined ? hoverValue : currentValue;
    if (starValue <= effectiveValue) {
      switch (effectiveValue) {
        case 1:
          return colors.primary;
        case 2:
          return colors.orange;
        case 3:
          return colors.yellow;
        case 4:
          return colors.green;
        case 5:
          return colors.darkGreen;
        default:
          return colors.grey;
      }
    }
    return colors.grey;
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {stars.map((_, index) => {
          const starValue = index + 1;
          return (
            <TouchableOpacity key={index} onPress={() => handleClick(starValue)}>
              <StarIcon  color={getStarColor(starValue)} />
            </TouchableOpacity>
          );
        })}
      </View>
      {/* {currentValue > 0 && (
        <Text style={styles.text}>{getRangeText(currentValue)}</Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    scaleX: 2,
    scaleY: 2,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default RatingSlider;
