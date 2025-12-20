import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

const customPalette = {
  primary: {
    50: '#f0ebff',
    100: '#e1d6ff',
    200: '#c3abff',
    300: '#a57fff',
    400: '#8752ff',
    500: '#6C5CE7',
    600: '#5E4DCB',
    700: '#4F3FB0',
    800: '#403295',
    900: '#32257A',
    950: '#261A5F',
  },
  success: {
    500: '#66BB6A',
  },
  warning: {
    500: '#FFA726',
  },
};

export const Theme = definePreset(Aura, {
  semantic: {
    primary: customPalette.primary,
    success: {
      500: customPalette.success[500],
    },
    warning: {
      500: customPalette.warning[500],
    },
    colorScheme: {
      light: {
        primary: {
          color: customPalette.primary[500],
          inverseColor: '#ffffff',
          hoverColor: customPalette.primary[600],
          activeColor: customPalette.primary[700],
        },
        highlight: {
          background: customPalette.primary[100],
          focusBackground: customPalette.primary[200],
          color: customPalette.primary[900],
          focusColor: customPalette.primary[950],
        },
      },
      dark: {
        primary: {
          color: customPalette.primary[300],
          inverseColor: customPalette.primary[950],
          hoverColor: customPalette.primary[200],
          activeColor: customPalette.primary[100],
        },
        highlight: {
          background: 'rgba(108, 92, 231, 0.2)',
          focusBackground: 'rgba(108, 92, 231, 0.3)',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
    },
  },
});
