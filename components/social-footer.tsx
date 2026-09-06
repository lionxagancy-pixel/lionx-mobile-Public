import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

const styles = StyleSheet.create({
  icon: { width: 32, height: 32 },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "rgba(212,175,55,0.72)",
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",
  },
});

const footerLinks = [
  { label: "الخصوصية", path: "/privacy" },
  { label: "الشروط", path: "/terms" },
  { label: "المدونة", path: "/blog" },
  { label: "الكورسات", path: "/courses" },
] as const;

const sectionLinks = [
  { label: "PLAY · الألعاب", path: "/sector/play" },
  { label: "PAY · الدفع", path: "/sector/pay" },
  { label: "GROW · النمو", path: "/sector/grow" },
  { label: "DIGITAL · الاشتراكات", path: "/sector/digital" },
  { label: "VIP · الخاصة", path: "/sector/vip" },
] as const;

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
    <View className="mt-10 items-center border-t border-[#D4AF37]/20 pt-7">
      <Text className="text-xs font-black tracking-widest text-[#E6C65C]">LIONX COMMUNITY</Text>
      <Text className="mt-2 text-center text-xs leading-5 text-muted">تابع أخبار LIONX وتواصل معنا عبر القنوات الرسمية.</Text>
      <View className="mt-5 flex-row flex-wrap justify-center gap-3">
        {socialLinks.map((social) => (
          <Pressable key={social.name} accessibilityRole="link" accessibilityLabel={social.name} onPress={() => void openSocial(social.url)} style={({ pressed }) => [styles.socialButton, { opacity: pressed ? 0.55 : 1 }]}>
            <Image source={social.image} resizeMode="contain" style={styles.icon} />
          </Pressable>
        ))}
      </View>
      <View className="mt-7 w-full rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-4">
        <Text className="text-center text-[10px] font-black tracking-widest text-[#E6C65C]">اكتشف عوالم LIONX</Text>
        <View className="mt-3 flex-row flex-wrap justify-center gap-2">
          {sectionLinks.map((link) => (
            <Link key={link.path} href={link.path} asChild>
              <Pressable accessibilityRole="link" style={({ pressed }) => [{ opacity: pressed ? 0.62 : 1 }]}>
                <View className="rounded-full border border-[#D4AF37]/35 bg-[#1A1A1D] px-3 py-2"><Text className="text-[10px] font-black text-foreground">{link.label}</Text></View>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>
      <View className="mt-5 flex-row flex-wrap justify-center gap-4">
        {footerLinks.map((link) => (
          <Link key={link.path} href={link.path} asChild><Pressable accessibilityRole="link"><Text className="text-[11px] font-bold text-[#E6C65C]">{link.label}</Text></Pressable></Link>
        ))}
      </View>
      <Text className="mt-4 text-center text-[11px] text-muted">الدعم عبر واتساب: 01279332563</Text>
    </View>
  );
}
