import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          title: "Profile",
          headerTransparent: true,
          headerBlurEffect: "systemChromeMaterial",
          headerLargeTitleShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "transparent",
          },
          headerRight: () => <Text style={styles.editText}>Edit</Text>,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.profileText}>User Profile</Text>
        <Text style={styles.detailsText}>Username: JohnDoe</Text>
        <Text style={styles.detailsText}>Name: John Doe</Text>
        <Text style={styles.detailsText}>Bio: Software Engineer</Text>
      </View>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  profileText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  editText: {
    fontSize: 16,
    color: "#0095f6",
    marginRight: 20,
  },
});

export default ProfileLayout;
