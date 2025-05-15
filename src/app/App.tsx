import { ChakraProvider, extendTheme, theme as baseTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router';

import AppRouter from '~/router/AppRoter';

const customBreakpoints = {
    ...baseTheme.breakpoints,
    bp189: '1891px',
    bp160: '1601px',
    bp115: '1151px',
    bp95: '951px',
    bp76: '761px',
    bp55: '551px',
};

const alphaColors = {
    50: 'rgba(0, 0, 0, 0.04)',
    100: 'rgba(0, 0, 0, 0.06)',
    200: 'rgba(0, 0, 0, 0.08)',
    300: 'rgba(0, 0, 0, 0.16)',
    400: 'rgba(0, 0, 0, 0.24)',
    600: 'rgba(0, 0, 0, 0.48)',
    700: 'rgba(0, 0, 0, 0.64)',
    800: 'rgba(0, 0, 0, 0.8)',
    900: 'rgba(0, 0, 0, 0.92)',
};

const limeColors = {
    50: '#c4ff61',
    100: '#eaffc7',
    150: '#d7ff94',
    200: '#c4ff61',
    300: '#c4ff61',
    400: '#b1ff2e',
    500: '#c4ff61',
    600: '#2db100',
    700: '#207e00',
    800: '#134b00',
    900: '#c4ff61',
};

const customTheme = extendTheme({
    styles: {
        global: {
            body: {
                color: 'black',
            },
        },
    },
    breakpoints: customBreakpoints,
    components: {
        Heading: {
            baseStyle: {
                color: 'black',
            },
        },
        Text: {
            baseStyle: {
                color: 'black',
            },
        },
    },
    colors: {
        alpha: alphaColors,
        lime: limeColors,
    },
});

const App = () => (
    <ChakraProvider theme={customTheme}>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </ChakraProvider>
);

export default App;
