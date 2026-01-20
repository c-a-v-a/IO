import { File, Paths } from 'expo-file-system';
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import showAlert from "./AlertCustom";

export async function pickImage() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    showAlert("Permission error", "Permission to access images is required.");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    quality: 1,
    base64: true
  });

  return result.canceled ? null : result.assets[0];
}

export async function saveImage(image: ImagePicker.ImagePickerAsset) {
  if (Platform.OS === "web") {
    console.log(image.base64);
    return `data:${image.mimeType};base64,${image.base64}`;
  }

  const extension = image.uri.split(".").pop() || "jpg";
  const filename = `${Date.now()}.${extension}`;

  const source = new File(image.uri);
  const destination = new File(Paths.document, filename);

  source.copy(destination);

  return destination.uri;
}