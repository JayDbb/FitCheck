import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNTheme,
} from "@react-navigation/native";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme(); 

  return (
    <RNTheme value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {children}
    </RNTheme>
  );
}
