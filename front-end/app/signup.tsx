import {
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { apiUrl } from "@/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Colors from "@bacons/apple-colors";
import { PressableScale } from "@/components/ui/utils/pressable-scale";
import Lists from "@/components/ui/utils/lists";


const Signup = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useColorScheme();

  const submitReq = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    setLoading(true);
    try {
      console.log("Making request to:", `${apiUrl}/auth/getToken`);
      const response = await axios.post(`${apiUrl}/auth/getToken`, {
        username,
        password,
      });

      console.log("Response:", response.data);
      await AsyncStorage.setItem("token", JSON.stringify(response.data));
      Alert.alert("Success", "User registered successfully!");
      router.push("/(tabs)/home");
    } catch (error: any) {
      console.error("Error registering user:", error.response?.data || error.message);
      Alert.alert("Error", "There was an error registering your user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full w-full" style={{ backgroundColor: Colors.systemBackground }}>
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
      />
      {/* KeyboardAvoidingView and ScrollView to handle keyboard appearance */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 justify-center px-4">
              <View className="pb-12">
                <Text className="text-lg font-semibold" style={{ color: theme === "light" ? "#000" : "#fff", fontSize: 24,
                fontWeight: "600", }}>
                  Welcome
                </Text>
                <View className="mt-8">
                  <Text className="text-4xl font-bold" style={{ color: theme === "light" ? "#000" : "#fff" }}>
                    Sign up to create your Account
                  </Text>
                  <Text className="mt-4 font-medium font-base" style={{ color: theme === "light" ? "#000" : "#fff" }}>
                    Enter your username and password to create your account
                  </Text>
                </View>
              </View>

              <View>
                <View className="mb-8">
                  <Text className="font-medium" style={{ color: theme === "light" ? "#000" : "#fff" }}>
                    Username
                  </Text>
                  
                  <TextInput
                    className="rounded-xl px-4 py-3 mt-2 h-[44px]"
                    style={{ color: theme === "light" ? "#000" : "#fff" }}
                    placeholder="Username"
                    autoCapitalize="none"
                    autoComplete="username"
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>

                <View>
                  <Text className="text-secondary-400 font-medium" style={{ color: theme === "light" ? "#000" : "#fff" }}>
                    Password
                  </Text>
                  <TextInput
                    className="rounded-xl px-4 py-3 mt-2 h-[44px]"
                    style={{ color: theme === "light" ? "#000" : "#fff" }}
                    placeholder="Password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password"
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>

              <View>
                <PressableScale
                  onPress={submitReq}
                  style={{
                    height: 50,
                    display: "flex",
                    flexDirection: "row",
                    gap: 6,
                    backgroundColor: theme === "light" ? "#000" : "#fff",
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
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: theme === "light" ? "#fff" : "#000",
                      }}
                    >
                      Get started
                    </Text>
                  )}
                </PressableScale>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
