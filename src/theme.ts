export type ThemeMode = 'light' | 'dark';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

interface ButtonColors {
  background: string;
  hover: string;
  text: string;
  border: string;
}

export interface AppTheme {
  mode: ThemeMode;
  colors: {
    page: string;
    surface: string;
    mutedSurface: string;
    hero: string;
    text: string;
    mutedText: string;
    border: string;
    accent: string;
    focus: string;
    badgeBackground: string;
    badgeText: string;
    shadow: string;
    transparent: string;
  };
  buttons: Record<ButtonVariant, ButtonColors>;
}

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    page: '#f6f7fb',
    surface: '#ffffff',
    mutedSurface: '#f0f2f8',
    hero: '#e7eaff',
    text: '#1d2440',
    mutedText: '#6e7691',
    border: '#dfe3ef',
    accent: '#5555db',
    focus: '#8e8bff',
    badgeBackground: '#e4f7eb',
    badgeText: '#28764c',
    shadow: '0 8px 24px rgba(38, 42, 83, 0.06)',
    transparent: 'transparent',
  },
  buttons: {
    primary: { background: '#5555db', hover: '#4444c6', text: '#ffffff', border: '#5555db' },
    secondary: { background: '#e8eafa', hover: '#d8dcf3', text: '#353b7d', border: '#e8eafa' },
    outline: { background: 'transparent', hover: '#f0f2fa', text: '#353b7d', border: '#cbd0e5' },
    danger: { background: '#e45768', hover: '#cd4052', text: '#ffffff', border: '#e45768' },
  },
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    page: '#121622',
    surface: '#1d2333',
    mutedSurface: '#282f43',
    hero: '#2c315d',
    text: '#f0f2ff',
    mutedText: '#a9b1cd',
    border: '#394159',
    accent: '#aaaaff',
    focus: '#aaaaff',
    badgeBackground: '#213e37',
    badgeText: '#9ce0b7',
    shadow: '0 8px 24px rgba(0, 0, 0, 0.18)',
    transparent: 'transparent',
  },
  buttons: {
    primary: { background: '#7777ed', hover: '#9292ff', text: '#111427', border: '#7777ed' },
    secondary: { background: '#353c58', hover: '#464f70', text: '#e7eaff', border: '#353c58' },
    outline: { background: 'transparent', hover: '#2f3850', text: '#e7eaff', border: '#555e7a' },
    danger: { background: '#e06a7d', hover: '#f08092', text: '#171923', border: '#e06a7d' },
  },
};
