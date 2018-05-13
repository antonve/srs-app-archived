interface ColorPalette {
  lighter: string
  light: string
  dark: string
  darker: string
  accent: string
}

export interface Fonts {
  body: string
  title: string
}

export interface Theme {
  colors: ColorPalette
  fonts: Fonts
}

export const theme: Theme = {
  colors: {
    lighter: '#fff',
    light: '#f1f2f6',
    dark: '#2f3542',
    darker: '#1e272e',
    accent: '#ff6348',
  },

  fonts: {
    body: 'Helvetica, sans-serif',
    title: 'Helvetica, sans-serif',
  },
}
