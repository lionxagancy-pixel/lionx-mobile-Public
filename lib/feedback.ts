import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

export async function tapFeedback() {
  if (Platform.OS !== "web") await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

export async function successFeedback() {
  if (Platform.OS !== "web") await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}
