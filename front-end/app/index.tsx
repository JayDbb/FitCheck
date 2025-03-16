import { router } from "expo-router";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import app from "@/firebase/init";
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from "react";
import { 
  getAuth, 
  GoogleAuthProvider,
  initializeAuth, 
  getReactNativePersistence, 
  signInWithCredential, 
  User 
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Ensure Firebase Auth is initialized globally with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage) 
});

export default function Index() {
  const [user, setUser] = useState<User | null>(null);

  // Initialize Google Sign-In request
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
    webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
  });
  

  useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      const credential = GoogleAuthProvider.credential(null, response.authentication.accessToken);
      
      signInWithCredential(auth, credential).then(userCredential => {
        setUser(userCredential.user);
        router.push("/(tabs)/home");
      }).catch(error => {
        console.error("Sign-in Error", error);
      });
    }
  }, [response]);

  const handleLoginGoogle = async () => {
    await promptAsync();
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      <TouchableOpacity 
        onPress={handleLoginGoogle}
        style={{ 
          backgroundColor: '#4285F4', 
          padding: 15, 
          borderRadius: 8,
          minWidth: 200,
          alignItems: 'center' 
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Login with Google</Text>
      </TouchableOpacity>
      
      <Pressable 
        onPress={() => router.push("/(tabs)/home")}
        style={{ padding: 10 }}
      >
        <Text>Skip to main</Text>
      </Pressable>
    </View>
  );
}
