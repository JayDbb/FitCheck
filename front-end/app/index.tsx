import { View, Text, TextInput, TouchableOpacity, Alert, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { apiUrl } from "@/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {

    setLoading(true);
    try {

      const response = await axios.post(`${apiUrl}/auth/register`, {
        username,
        password
      });

      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.token);
      Alert.alert("Success", "User registered successfully!");
      // router.push("/(tabs)/home");

    } catch (error) {
      console.error("Error registering user:", error);
      Alert.alert("Error", "There was an error registering your user.");
    } finally {
      setLoading(false);
    }

  };
  return (
    <SafeAreaView className="h-full w-full bg-white">
      {/* Top Section */}

      {/* Centered Content */}
      <View className="flex-1 justify-center px-4">
        <View className="pb-12">
          <Text className="text-lg font-semibold text-primary-200">Welcome !</Text>
          <View className="mt-8">
            <Text className="text-4xl font-bold text-primary-200">
              Sign up to create your Account
            </Text>
            <Text className="text-secondary-400 mt-4 font-medium font-base">
              Enter your email and password to log in to your account
            </Text>
          </View>
        </View>




        {/* Input Fields */}
        <View>
          

          <View className="mb-8">
            <Text className = "text-secondary-400 font-medium ">Username</Text>
            <TextInput
               className=" rounded-xl px-4 py-3 mt-2 h-[44px] bg-secondary-100"
              placeholder="Username"
              autoCapitalize="none"
              autoComplete="username"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View>
            <Text className = "text-secondary-400 font-medium ">Password</Text>
            <TextInput
                className=" rounded-xl px-4 py-3 mt-2 h-[44px] bg-secondary-100"
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        {/* Submit Button */}
        <View className="mt-8">
          <TouchableOpacity onPress={onSubmit} className="bg-primary-200 rounded-xl h-[50px] w-full items-center justify-center  px-2">
            <Text className="text-white text-lg font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8">
          <TouchableOpacity onPress={() => router.push("/(tabs)/home")} className="bg-red-500 rounded-xl h-[50px] w-full items-center justify-center  px-2">
            <Text className="text-white text-lg font-bold">Go to main</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Signup;
