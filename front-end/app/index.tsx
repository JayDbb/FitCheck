import { View, Text, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import HeadText from "@/components/ui/welcome-text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PressableScale } from "@/components/ui/utils/pressable-scale";
import { router } from "expo-router";
import * as Colors from "@bacons/apple-colors";


const Welcome = () => {
  const { top, bottom } = useSafeAreaInsets();

  const theme = useColorScheme();
  return (
    <View
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <View style={{ gap: 10 }}>
        <HeadText
          text="Your"
          side="right"
          image={require("../assets/images/alexandra-gorn-WF0LSThlRmw-unsplash.jpg")}
        />
        <HeadText
          text="All-In-One"
          side="right"
          image={require("../assets/images/clem-onojeghuo-HpEDSZukJqk-unsplash.jpg")}
        />
        <HeadText
          text="Fashion"
          side="left"
          image={require("../assets/images/priscilla-du-preez-dlxLGIy-2VU-unsplash.jpg")}
        />
        <HeadText text="Central Hub" />
        <HeadText
          side="right"
          image={require("../assets/images/valna-studio-mU88MlEFcoU-unsplash.jpg")}
        />
      </View>

      <View style={{}}>
        <PressableScale
          onPress={() => router.push("/signup")}
          style={{
            height: 50,
            display: "flex",
            flexDirection: "row",
            gap: 6,
            backgroundColor: theme ==  "light" ? "#000" : "#fff",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            marginVertical: 16,
            marginHorizontal: "auto",
            width: "95%",
            borderRadius: 50,
            borderCurve: "continuous",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: theme ==  "light" ? "#fff" : "#000",
            }}
          >
            Get started
          </Text>
          {/* <SymbolView
                  name="play.circle.fill"
                  name="monochrome"
                  tintColor="black"
                  size={20}
                /> */}
        </PressableScale>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.systemBackground,
    justifyContent: "center",
  },
});

export default Welcome;
