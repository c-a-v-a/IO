import { NordDark } from "@/constants/theme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor={NordDark.background} />
      <Stack 
        screenOptions={{
          headerStyle: {
            backgroundColor: NordDark.background
          },
          headerTintColor: NordDark.textPrimary,
          contentStyle: {
            backgroundColor: NordDark.background
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
            color: NordDark.accent
          }
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="add-image" options={{ title: "Add Image" }} />
        <Stack.Screen name="search-images" options={{ title: "Search" }} />
        <Stack.Screen name="edit-element" options={{ title: "Edit Element" }} />
      </Stack>
      <Toast />
    </>
  );
}
