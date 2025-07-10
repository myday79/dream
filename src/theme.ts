import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#f5e9ff',
      100: '#dbc1ff',
      200: '#c198ff',
      300: '#a770ff',
      400: '#8d48ff',
      500: '#742fff',
      600: '#5a24cc',
      700: '#411a99',
      800: '#291066',
      900: '#110633',
    },
  },
  fonts: {
    heading: 'var(--font-family-sans)',
    body: 'var(--font-family-sans)',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
});

export default theme;