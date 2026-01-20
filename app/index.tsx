import { globalStyles } from "@/styles/globalStyles";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const toAddImage = () => router.push("/add-image");
  const toSearchImages = () => router.push("/search-images");

  return (
    <View style={[globalStyles.screen, globalStyles.center]}>
      <Text style={[globalStyles.title, globalStyles.marginsBig]}>MemSearcher</Text>

      <View style={globalStyles.buttonGroup}>
        <Pressable 
          style={globalStyles.button}
          onPress={toAddImage}
        >
          <Text style={globalStyles.buttonText}>Add Image</Text>
        </Pressable>

        <Pressable 
          style={globalStyles.button}
          onPress={toSearchImages}
        >
          <Text style={globalStyles.buttonText}>Search Images</Text>
        </Pressable>
      </View>
    </View>
  );
}