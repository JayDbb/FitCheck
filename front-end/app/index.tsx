import { router } from "expo-router";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import app from "@/firebase/init";
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from "react";
import { 
  getAuth, 
  GoogleAuthProvider,
  initializeAuth, 
  // @ts-ignore
  // getReactNativePersistence,
  signInWithCredential, 
  User 
} from 'firebase/auth';


export default function Index() {
  const [user, setUser] = useState<User | null>(null);

  // Initialize Google Sign-In request
  const [request, response, promptAsync] = Google.useAuthRequest({
    // androidClientId: "616664580407-g18m9psaahv38me89an1pdcrq0n0fm8p.apps.googleusercontent.com",
    iosClientId: "616664580407-easin3n0t8atk8hp3f9ktrulfg2n2qo5.apps.googleusercontent.com",
    webClientId: "616664580407-g18m9psaahv38me89an1pdcrq0n0fm8p.apps.googleusercontent.com",
  });
  

  // useEffect(() => {
  //   if (response?.type === "success" && response.authentication) {
  //     const credential = GoogleAuthProvider.credential(null, response.authentication.accessToken);
      
  //     signInWithCredential(auth, credential).then(userCredential => {
  //       setUser(userCredential.user);
  //       router.push("/(tabs)/home");
  //     }).catch(error => {
  //       console.error("Sign-in Error", error);
  //     });
  //   }
  // }, [response]);

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
