import { NordDark } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: NordDark.background,
    padding: 24,
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 48,
    color: NordDark.textPrimary,
    marginBottom: 16,
    fontWeight: "600",
  },

  text: {
    fontSize: 16,
    color: NordDark.textSecondary,
  },

  button: {
    backgroundColor: NordDark.surface,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: NordDark.border,
    alignItems: "center",
  },

  buttonText: {
    color: NordDark.accent,
    fontSize: 16,
    fontWeight: "600",
  },

  buttonGroup: {
    alignSelf: "stretch",
    gap: 24,
    paddingHorizontal: 12
  },

  margins: {
    margin: 16
  },

  marginsBig: {
    marginBottom: 32
  },

  input: {
    backgroundColor: NordDark.surface,
    borderRadius: 10,
    padding: 12,
    color: NordDark.textPrimary,
    fontSize: 16
  },

  card: {
    flex: 1,
    backgroundColor: NordDark.surface,
    borderWidth: 2,
    borderColor: NordDark.border,
    borderRadius: 12,
    padding: 10,
    margin: 8
  },

  cardImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: NordDark.background
  },
});