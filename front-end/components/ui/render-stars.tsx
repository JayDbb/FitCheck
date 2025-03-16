import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';


interface RenderStarColorsProps {
  rating: number;
  rankedRating?: number;
}

const RenderStarColors: React.FC<RenderStarColorsProps> = ({ rating }) => {

  // convert ratings to a five star scale 
  const effectiveRating = (rating / 10) * 5;
  const maxStars = 5;
  const filledStars = Math.floor(effectiveRating);
  const hasHalfStar = effectiveRating % 1 !== 0;


  const starColor = "#0084ff";

  const starSize = 20;

  const StarIcon = ({ color }: { color: string }) => (
    <Svg width={starSize} height={starSize} viewBox="0 0 22 20" fill={color}>
      <Path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1L8.7 8.2 4 8.7h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6z" />
    </Svg>
  );

  const HalfStarIcon = ({ color }: { color: string }) => (
    <Svg width={starSize} height={starSize} viewBox="0 0 22 20" fill={color}>
      <Path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1L8.7 8.2 4 8.7h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6zm8.9 5V5.8l1.7 3.8c.1.3.5.5.8.6l4.2.5-3.1 2.8c-.3.2-.4.6-.3 1 0 .2.5 2.2.8 4.1l-3.6-2.1c-.2-.2-.3-.2-.5-.2z" />
    </Svg>
  );

  const EmptyStarIcon = () => (
    <Svg width={starSize} height={starSize} viewBox="0 0 22 20" fill="#B2BDCD">
      <Path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1L8.7 8.2 4 8.7h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6z" />
    </Svg>
  );

  const starElements = [];

  for (let i = 0; i < maxStars; i++) {
    if (i < filledStars) {
      starElements.push(<StarIcon key={`star-filled-${i}`} color={starColor} />);
    } else if (i === filledStars && hasHalfStar) {
      starElements.push(<HalfStarIcon key={`star-half`} color={starColor} />);
    } else {
      starElements.push(<EmptyStarIcon key={`star-empty-${i}`} />);
    }
  }

  return <View style={{ flexDirection: 'row', gap: 4 }}>{starElements}</View>;
};

export default RenderStarColors;
