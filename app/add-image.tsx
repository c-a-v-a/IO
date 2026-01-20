import { NordDark } from "@/constants/theme";
import showAlert from "@/lib/AlertCustom";
import Database from "@/lib/Database";
import Element from "@/lib/Element";
import { pickImage, saveImage } from "@/lib/ImageHandler";
import { globalStyles } from "@/styles/globalStyles";
import { ImagePickerAsset } from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function AddImageScreen() {
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<ImagePickerAsset | null>(null);

  const toHome = () => {
    router.push("/");
  }

  const handlePickImage = async () => {
    const image = await pickImage();
    
    if (image) {
      setImage(image);
    }
  }

  const handleSave = async () => {
    if (name.trim().length === 0) {
      showAlert("Validation error", "Name is required.");
      return;
    }

    if (image === null) {
      showAlert("Validation error", "Please select an image.");
      return;
    }

    try {
      const savedUri = await saveImage(image);
      const element = new Element(
        null,
        name,
        Date.now(),
        0,
        tags.split(",").map(tag => tag.trim()),
        savedUri
      );
      const db = await Database.getInstance();
      
      await db.insertElement(element);

      showAlert("Success", "Image saved.", toHome);
    } catch(_) {
      showAlert("Error", "Unable to save the image");
    }
  }

  return (
    <View style={[globalStyles.screen, globalStyles.center]}>
      <Text style={[globalStyles.title, globalStyles.marginsBig]}>Add image</Text>

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
          style={globalStyles.button}
          onPress={handlePickImage}
        >
          <Text style={globalStyles.buttonText}>{ image ? "Change Image" : "Select Image" }</Text>
        </Pressable>

        <Pressable
          style={{...globalStyles.button, borderColor: NordDark.success}}
          onPress={handleSave}
        >
          <Text style={{...globalStyles.buttonText, color: NordDark.success}}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}