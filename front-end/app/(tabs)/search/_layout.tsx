import { View, Text } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'

const SearchLayout = () => {
  return (
    <Stack screenOptions={{
      headerShadowVisible: false,
    }}>
      <Stack.Screen
        name="index"
        
options={{
  headerShadowVisible: false,
        title: "Search",
        headerTransparent: true,
        headerBlurEffect: "systemChromeMaterial",
        headerLargeTitleShadowVisible: false,

        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerSearchBarOptions: {
          placeholder: "fits, inspirations",
          onChangeText: (event) => {
            router.setParams({ query: event.nativeEvent.text });
          },
        },
    
}}
       
      />
    </Stack>
         
  )
}

export default SearchLayout