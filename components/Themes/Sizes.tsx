import { Easing } from "react-native";

const sizes = {
  spacingXs: 4, // 4px (equivalent to 0.25rem in web)
  spacingSm: 8, // 8px (0.5rem)
  spacingMd: 16, // 16px (1rem)
  spacingLg: 24, // 24px (1.5rem)
  spacingXl: 32, // 32px (2rem)

  fontSizeXs: 12, // 0.7rem = ~12px
  fontSizeSm: 14, // 0.875rem = ~14px
  fontSizeMd: 16, // 1rem = 16px
  fontSizeLg: 18, // 1.125rem = ~18px
  fontSizeXl: 30, // 1.875rem = ~30px

  borderRadiusSm: 4, // 0.3rem = ~4px
  borderRadiusMd: 8, // 0.5rem = ~8px
  borderRadiusLg: 16, // 1rem = ~16px

  easing: Easing.bezier(0.35, 0, 0.65, 1), // Custom cubic-bezier easing

  linear: Easing.bezier(0.1, 0, 0.9, 1), // Custom cubic-bezier easing (linear)

  bounce: Easing.bezier(0.175, 0.885, 0.32, 1.275), // Custom bounce easing

  Shadows: {
    shadowXS: {
      shadowColor: "rgba(104, 112, 118, 0.07)", // Adjust opacity for React Native
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      shadowOpacity: 0.07,
      elevation: 2, // for Android
    },
    shadowSM: {
      shadowColor: "rgba(104, 112, 118, 0.07)",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      shadowOpacity: 0.07,
      elevation: 3, // for Android
    },
    shadowMD: {
      shadowColor: "rgba(104, 112, 118, 0.08)",
      shadowOffset: { width: 0, height: 12 },
      shadowRadius: 20,
      shadowOpacity: 0.08,
      elevation: 10, // for Android
    },
    shadowLG: {
      shadowColor: "rgba(104, 112, 118, 0.18)",
      shadowOffset: { width: 0, height: 12 },
      shadowRadius: 34,
      shadowOpacity: 0.18,
      elevation: 15, // for Android
    },
    shadowBottomMD: {
      shadowColor: "rgba(104, 112, 118, 0.08)",
      shadowOffset: { width: 0, height: 12 },
      shadowRadius: 8,
      shadowOpacity: 0.08,
      elevation: 12, // for Android
    },
  },
};

export default sizes;
