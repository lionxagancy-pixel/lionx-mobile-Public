import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  icon: { width: 28, height: 28 },
});

const socialLinks = [
  { name: "فيسبوك", image: require("@/assets/images/social/facebook.png"), url: "https://www.facebook.com/" },
  { name: "إنستجرام", image: require("@/assets/images/social/instagram.png"), url: "https://www.instagram.com/" },
  { name: "تيك توك", image: require("@/assets/images/social/tiktok.png"), url: "https://www.tiktok.com/" },
  { name: "Threads", image: require("@/assets/images/social/threads.png"), url: "https://www.threads.net/" },
  { name: "تليجرام", image: require("@/assets/images/social/telegram.png"), url: "https://t.me/" },
  { name: "لينكدان", image: require("@/assets/images/social/linkedin.png"), url: "https://www.linkedin.com/" },
  { name: "واتساب", image: require("@/assets/images/social/whatsapp.png"), url: "https://wa.me/201279332563" },
];

export function SocialFooter() {
  const openSocial = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      // The platform may not have a handler; the link remains available on web.
    }
  };

  return (
    <View className="mt-8 items-center border-t border-border pt-6">
      <Text className="text-xs font-black tracking-widest text-primary">LIONX COMMUNITY</Text>
      <Text className="mt-2 text-center text-xs leading-5 text-muted">تابع أخبار LIONX وتواصل معنا عبر القنوات الرسمية.</Text>
      <View className="mt-4 flex-row flex-wrap justify-center gap-3">
        {socialLinks.map((social) => (
          <Pressable
            key={social.name}
            accessibilityRole="link"
            accessibilityLabel={social.name}
            onPress={() => void openSocial(social.url)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.55 : 1,
                alignItems: "center",
                justifyContent: "center",
                width: 46,
                height: 46,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#3B3325",
                backgroundColor: "#17130F",
              },
            ]}
          >
            <Image source={social.image} resizeMode="contain" style={styles.icon} />
          </Pressable>
        ))}
      </View>
      <Text className="mt-5 text-center text-[11px] text-muted">الدعم عبر واتساب: 01279332563</Text>
    </View>
  );
}
