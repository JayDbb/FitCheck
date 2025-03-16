
import { View, Text, TextInput, TouchableOpacity, Alert, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { apiUrl } from "@/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        password
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
    <SafeAreaView className="h-full w-full bg-white">
      <View className="flex-1 justify-center px-4">
        <View className="pb-12">
          <Text className="text-lg font-semibold text-primary-200">Welcome!</Text>
          <View className="mt-8">
            <Text className="text-4xl font-bold text-primary-200">
              Sign up to create your Account
            </Text>
            <Text className="text-secondary-400 mt-4 font-medium font-base">
              Enter your username and password to create your account
            </Text>
          </View>
        </View>

        <View>
          <View className="mb-8">
            <Text className="text-secondary-400 font-medium">Username</Text>
            <TextInput
              className="rounded-xl px-4 py-3 mt-2 h-[44px] bg-secondary-100"
              placeholder="Username"
              autoCapitalize="none"
              autoComplete="username"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View>
            <Text className="text-secondary-400 font-medium">Password</Text>
            <TextInput
              className="rounded-xl px-4 py-3 mt-2 h-[44px] bg-secondary-100"
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <TouchableOpacity 
          onPress={submitReq}
          disabled={loading}
          className={`mt-8 rounded-xl h-[50px] w-full items-center justify-center px-2 ${loading ? 'bg-gray-400' : 'bg-primary-200'}`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-bold">Sign up</Text>
          )}
        </TouchableOpacity>

        <View className="mt-8">
          <TouchableOpacity 
            onPress={() => router.push("/(tabs)/home")} 
            className="bg-red-500 rounded-xl h-[50px] w-full items-center justify-center px-2"
          >
            <Text className="text-white text-lg font-bold">Go to main</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
