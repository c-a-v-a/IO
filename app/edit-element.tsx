import { NordDark } from "@/constants/theme";
import showAlert from "@/lib/AlertCustom";
import Database from "@/lib/Database";
import Element from "@/lib/Element";
import { useElements } from "@/store/ElementContext";
import { globalStyles } from "@/styles/globalStyles";
import * as Clipboard from 'expo-clipboard';
import { File } from "expo-file-system";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Platform, Pressable, Text, TextInput, View } from "react-native";
import Toast from 'react-native-toast-message';

export default function EditElementScreen() {
  const { state, dispatch } = useElements();

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [element, setElement] = useState<Element | null>(null);
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const db = await Database.getInstance();
        
        // @ts-ignore
        const newElement = await db.getElement(id);
        
        setElement(newElement);
        setName(newElement.getName());
        setTags(newElement.getTags().join(", "));
      } catch (_) {
        showAlert("Error", "Unable to load the data");
      }
    })();
  }, [id])

  const handleUpdate = async () => {
    try {
      if (!element) {
        return;
      }

      element.setName(name);
      element.setTags(tags.split(",").map(tag => tag.trim()));
      
      const db = await Database.getInstance();
      await db.updateElement(element);

      dispatch({
        type: "update",
        payload: element
      });
      
      showAlert("Updated", "Element was updated", () => router.back());
    } catch (_) {
      showAlert("Error", "Could not update element", () => router.back());
    }
  }

  const handleDelete = async () => {
    try {
      if (!element || element.getId() === null) {
        return;
      }
      
      const db = await Database.getInstance();

      await db.deleteElement(element.getId()!);

      dispatch({
        type: "set",
        payload: state.elements.filter(e => e.getId() === element.getId())
      });
      
      showAlert("Updated", "Element was deleted", () => router.back());
    } catch (_) {
      showAlert("Error", "Could not delete element", () => router.back());
    }
  }

  const copyToClipboard = async () => {
    if (!element) {
      return;
    }

    element.use();

    try {
      const db = await Database.getInstance();
      await db.updateElement(element);
    } catch (_) {}

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

  if (!element) {
    return null;
  }

  return (
    <View style={[globalStyles.screen, globalStyles.center, { maxHeight: Dimensions.get("window").height * 0.9 }]}>
      <Pressable onLongPress={copyToClipboard}>
        <Image 
          source={{ uri: element.getUri() }}
          style={globalStyles.cardImage}
          contentFit="contain"
          transition={200}
          cachePolicy="disk"
        />
      </Pressable>

      <View style={globalStyles.buttonGroup}>
        <View>
          <Text style={globalStyles.text}>Name</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Image name"
            placeholderTextColor={NordDark.border}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View>  
          <Text style={globalStyles.text}>Tags</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="funny, pepe, cringe"
            placeholderTextColor={NordDark.border}
            value={tags}
            onChangeText={setTags}
          />
        </View>

        <Pressable
          style={{...globalStyles.button, borderColor: NordDark.success}}
          onPress={handleUpdate}
        >
          <Text style={{...globalStyles.buttonText, color: NordDark.success}}>Update</Text>
        </Pressable>
        <Pressable
          style={{...globalStyles.button, borderColor: NordDark.error}}
          onPress={handleDelete}
        >
          <Text style={{...globalStyles.buttonText, color: NordDark.error}}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}