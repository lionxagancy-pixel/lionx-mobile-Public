import type { ImageSourcePropType } from "react-native";
import { Platform } from "react-native";

type CatalogImageAsset = {
  native: ImageSourcePropType;
  web: string;
};

const webAsset = (filename: string) => {
  const prefix = typeof window === "undefined"
    ? "/lionx-mobile-Public"
    : window.location.pathname.startsWith("/lionx-mobile-Public")
      ? "/lionx-mobile-Public"
      : "";
  return `${prefix}/assets/catalog/${filename}`;
};

const asset = (filename: string, native: ImageSourcePropType): CatalogImageAsset => ({
  native,
  web: webAsset(filename),
});

export const localCatalogImages: Record<string, CatalogImageAsset> = {
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg": asset("netflix_2015_logo-d600574875f7.png", require("@/public/assets/catalog/netflix_2015_logo-d600574875f7.png")),
  "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg": asset("spotify_logo_with_text-ed9cc8ca31d7.png", require("@/public/assets/catalog/spotify_logo_with_text-ed9cc8ca31d7.png")),
  "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png": asset("youtube_logo-c2a409683bee.png", require("@/public/assets/catalog/youtube_logo-c2a409683bee.png")),
  "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg": asset("chatgpt_logo-65ab8a288fe1.png", require("@/public/assets/catalog/chatgpt_logo-65ab8a288fe1.png")),
  "https://upload.wikimedia.org/wikipedia/commons/2/25/Microsoft_icon.svg": asset("microsoft_icon-234f0ee6305c.png", require("@/public/assets/catalog/microsoft_icon-234f0ee6305c.png")),
  "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg": asset("disney-2b_logo-1e954063e96f.png", require("@/public/assets/catalog/disney-2b_logo-1e954063e96f.png")),
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Mbc_Shahid.svg/1280px-Mbc_Shahid.svg.png": asset("1280px-mbc_shahid-svg-86ef07391593.png", require("@/public/assets/catalog/1280px-mbc_shahid-svg-86ef07391593.png")),
  "https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg": asset("apple_music_icon-48f9aeeac58b.png", require("@/public/assets/catalog/apple_music_icon-48f9aeeac58b.png")),
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PUBG_Mobile_simple_logo_black.svg/1280px-PUBG_Mobile_simple_logo_black.svg.png": asset("1280px-pubg_mobile_simple_logo_black-svg-53b0f3a2dba4.png", require("@/public/assets/catalog/1280px-pubg_mobile_simple_logo_black-svg-53b0f3a2dba4.png")),
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Valorant_logo_-_black_color_version.svg/1280px-Valorant_logo_-_black_color_version.svg.png": asset("1280px-valorant_logo_-_black_color_version-svg-f4c4268a4db5.png", require("@/public/assets/catalog/1280px-valorant_logo_-_black_color_version-svg-f4c4268a4db5.png")),
  "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg": asset("steam_icon_logo-51b8be18e1d5.png", require("@/public/assets/catalog/steam_icon_logo-51b8be18e1d5.png")),
  "https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg": asset("playstation_logo-7bf5389224cc.png", require("@/public/assets/catalog/playstation_logo-7bf5389224cc.png")),
  "https://upload.wikimedia.org/wikipedia/commons/3/3a/Xbox_app_logo.svg": asset("xbox_app_logo-99341a707d32.png", require("@/public/assets/catalog/xbox_app_logo-99341a707d32.png")),
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png": asset("fortnite_f_lettermark_logo-bf8f885dfaae.png", require("@/public/assets/catalog/fortnite_f_lettermark_logo-bf8f885dfaae.png")),
  "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg": asset("paypal-41c1b94d716b.png", require("@/public/assets/catalog/paypal-41c1b94d716b.png")),
  "https://cryptologos.cc/logos/tether-usdt-logo.png": asset("tether-usdt-logo-3c49df1db38f.png", require("@/public/assets/catalog/tether-usdt-logo-3c49df1db38f.png")),
  "https://upload.wikimedia.org/wikipedia/commons/e/e8/Binance_Logo.svg": asset("binance_logo-6f74348994cb.png", require("@/public/assets/catalog/binance_logo-6f74348994cb.png")),
  "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg": asset("instagram_logo_2016-ac4f32073568.png", require("@/public/assets/catalog/instagram_logo_2016-ac4f32073568.png")),
  "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg": asset("youtube_full-color_icon_-282017-29-e8a28069209a.png", require("@/public/assets/catalog/youtube_full-color_icon_-282017-29-e8a28069209a.png")),
  "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg": asset("facebook_f_logo_-282019-29-06d16a16e562.png", require("@/public/assets/catalog/facebook_f_logo_-282019-29-06d16a16e562.png")),
  "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg": asset("telegram_logo-c0c3b68546e9.png", require("@/public/assets/catalog/telegram_logo-c0c3b68546e9.png")),
  "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg": asset("x_logo_2023-10b53cbce6c0.png", require("@/public/assets/catalog/x_logo_2023-10b53cbce6c0.png")),
};

export const getCatalogImageSource = (sourceUrl: string): ImageSourcePropType | undefined => {
  const local = localCatalogImages[sourceUrl];
  if (!local) return undefined;
  return Platform.OS === "web" ? { uri: local.web } : local.native;
};
