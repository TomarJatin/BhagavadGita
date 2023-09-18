import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

/* fonts */
export const FontFamily = {
  Inter: 'Inter'
};

/* font sizes */
export const FontSize = {
  rehular10pxRegular_size: RFValue(10),
  regular12px: RFValue(12),
  regular14px: RFValue(14),
  regular16px: RFValue(16)
};

/* Colors */
export const color = (theme) => ({
  backgroundColor: theme === 'light' ? "#fff": '#181818',
  topbarColor: theme === 'light' ? '#5D2EC0': '#5D2EC0',
  fontWhite: '#fff',

})

/* Paddings */
export const Padding = {
  
};

/* border radiuses */
export const Border = {
 
};