import Database from "@/lib/Database";
import Element from "@/lib/Element";
import { globalStyles } from "@/styles/globalStyles";
import * as Clipboard from "expo-clipboard";
import { File } from "expo-file-system";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Platform, Pressable, Text } from "react-native";
import Toast from "react-native-toast-message";

type Props = {
  element: Element;
}

export default function ElementCard({ element }: Props) {
  const copyToClipboard = async () => {
    element.use();

    const db = await Database.getInstance();
    
    await db.updateElement(element);

    if (Platform.OS !== "web") { 
      const image = new File(element.getUri())

      await Clipboard.setImageAsync(await image.base64());

      Toast.show({
        type: "success",
        text1: "Copied!",
        position: "bottom",
        visibilityTime: 1500
      });
    }
  }

  const toEdit = async () => {
    router.push({ pathname: "/edit-element", params: { id: element.getId()?.toString() } });
  }

  return (
    <Pressable 
      style={globalStyles.card}
      onLongPress={copyToClipboard}
      onPress={toEdit}
    >
      <Image 
        source={{ uri: element.getUri() }}
        style={globalStyles.cardImage}
        contentFit="contain"
        transition={200}
        cachePolicy="disk"
      />

      <Text style={globalStyles.text}>{ element.getName() }</Text>
    </Pressable>
  );
}