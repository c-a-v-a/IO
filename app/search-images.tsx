import ElementCard from "@/components/ElementCard";
import { NordDark } from "@/constants/theme";
import showAlert from "@/lib/AlertCustom";
import Database from "@/lib/Database";
import Element from "@/lib/Element";
import { OrderingEnum, OrderingLabels } from "@/lib/OrderingEnum";
import QueryParams from "@/lib/QueryParams";
import { globalStyles } from "@/styles/globalStyles";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";

export default function AddImageScreen() {
  const [elements, setElements] = useState<Element[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [order, setOrder] = useState(OrderingEnum.CREATED_AT_DESC);

  useEffect(() => {
    loadElements();
  }, [nameFilter, order, tagFilter]);

  useFocusEffect(() => {
    loadElements();
  });

  const loadElements = async () => {
    try {

      const params: QueryParams = { order: order };
      
      if (nameFilter && nameFilter.trim().length > 0) {
        params.name = nameFilter;
      }
      
      const db = await Database.getInstance();
      const data = await db.getElements(params);
      
      setElements(filterElements(data));
    } catch (_) {
      showAlert("Error", "Unable to show elements");
    }
  }

  const filterElements = (data: Element[]) => {
    if (tagFilter.trim().length === 0) {
      return data;
    }

    return data.filter(element => {
      for (const tag of tagFilter.split(",").map(tag => tag.trim())) {
        if (!element.getTags().includes(tag) && tag.length > 0) {
          return false;
        }
      }

      return true;
    });
  }

  return (
    <View style={[globalStyles.screen]}>
      <TextInput
        style={{...globalStyles.input, marginVertical: 8}}
        placeholder="Name filter"
        placeholderTextColor={NordDark.border}
        value={nameFilter}
        onChangeText={setNameFilter}
      />
      <TextInput
        style={{...globalStyles.input, marginVertical: 8}}
        placeholder="Tag filter"
        placeholderTextColor={NordDark.border}
        value={tagFilter}
        onChangeText={setTagFilter}
      />

      <Picker
        selectedValue={order}
        onValueChange={(value) => setOrder(value)}
      >
        {Object.values(OrderingEnum).map((o) => (
          <Picker.Item
            key={o}
            label={OrderingLabels[o as OrderingEnum]}
            value={o}
          />
        ))}
      </Picker>

      <FlatList 
        data={elements}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => <ElementCard element={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}